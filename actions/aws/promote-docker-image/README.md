# AWS: promote-docker-image

## Behavior

Pull a Docker image, re-tag it and push it in another ECR
Save image as artifact and outputs artifact name and filename.

## Usage

```yaml
jobs:
  promote:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "Promote docker"
        uses: "meero-com/github-actions-shared-workflows/actions/aws/promote-docker-image@main"
        with:
          version: github-commit-sha
          artifact_name: image-uri
          SOURCE_AWS_ACCESS_KEY_ID: ${{ secrets.SRC_AWS_ACCESS_KEY_ID }}
          SOURCE_AWS_SECRET_ACCESS_KEY: ${{ secrets.SRC_AWS_SECRET_ACCESS_KEY }}
          SOURCE_ECR_REPOSITORY: ${{ secrets.SRC_ECR_REPOSITORY_NAME }}
          TARGET_AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          TARGET_AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          TARGET_ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY_NAME }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
```

will output
```yaml
artifact_name: image-uri
artifact_file_name: image-uri.txt
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
