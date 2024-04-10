# Git: advance-tag

## Behavior

Upload an artifact file to S3 bucket

## Usage

```yaml
jobs:
  upload_to_s3:
    runs-on: "ubuntu-latest"
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v4"

      - name: "Upload OpenAPI file to S3"
        uses: "meero-com/github-actions-shared-workflows/actions/aws/s3-upload-artifact@main"
        with:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
          ARTIFACT_NAME: artifact_name_to_upload
          ARTIFACT_FILE_NAME: artifact_file.ext
          S3_BUCKET_NAME: ${{ secrets.S3_BUCKET_NAME }}
          S3_OBJECT_FILENAME: destination_filename.ext
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
