# AWS: promote-docker-artifact-image

## Behavior

Promote Docker artifact/cached image

- Restore cached image
- load into Docker
- re-tag it and push it to ECR
- Save image_uri (docker tag) as artifact
- outputs artifact name and filename.

## Usage

```yaml
jobs:
  promote:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "Promote docker"
        uses: "meero-com/github-actions-shared-workflows/actions/aws/promote-docker-artifact-image@main"
        with:
          version: github-commit-sha
          artifact_name: image-uri
          artifact_file_name: path/to/image-uri.txt
          target_artifact_name: new-image-uri
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY_NAME }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
```

will output
```yaml
artifact_name: new-image-uri
artifact_file_name: new-image-uri.txt
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.


## Promote example

- pull image from staging environment
- promote image to preprod environment

```yaml
jobs:
  pull-source:
    runs-on: ubuntu-latest
    environment: staging
    outputs:
      artifact_name: ${{ steps.pull.outputs.artifact_name }}
      artifact_filename: ${{ steps.pull.outputs.artifact_file_name }}
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "Pull docker"
        id: pull
        uses: "meero-com/github-actions-shared-workflows/actions/aws/pull-docker-image@main"
        with:
          version: github-commit-sha
          artifact_name: image-uri
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY_NAME }}
          AWS_REGION: ${{ secrets.AWS_REGION }}

  promote:
    needs:
      - pull-source
    runs-on: ubuntu-latest
    environment: preprod
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "Promote docker"
        uses: "meero-com/github-actions-shared-workflows/actions/aws/promote-docker-artifact-image@main"
        with:
          version: github-commit-sha
          artifact_name: ${{ needs.pull-source.outputs.artifact_name }}
          artifact_file_name: ${{ needs.pull-source.outputs.artifact_filename }}
          target_artifact_name: new-image-uri
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY_NAME }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
```
