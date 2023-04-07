# AWS: build-and-push-lambda-docker-image

## Behavior

Build a docker image.
Push image to ECR.
Save image as artifact and outputs artifact name and filename.

## Usage

```yaml
jobs:
  advanceTag:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "Move tag"
        uses: "meero-com/github-actions-shared-workflows/actions/aws/build-and-push-lambda-docker-image@main"
        with:
          version: github-commit-sha
          dockerfile: docker/lambda/Dockerfile
          artifact_name: image-uri
          AWS_ACCESS_KEY_ID: ${{ secrets.NP_AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.NP_AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
          ECR_REPOSITORY_NAME: ${{ secrets.ECR_DEV_REPOSITORY_NAME }}
```

will output
```yaml
artifact_name: image-uri
artifact_file_name: image-uri.txt
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
