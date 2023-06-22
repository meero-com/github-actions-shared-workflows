# Release: publish-apidoc

## Behavior

Upload an artifact file (swagger/openapi) to ApiDoc S3 bucket with conventionnal naming
`[PROJECT-NAME]-[ENV]-[API-NAME]-[VERSION].[EXTENSION]` as `billing-pp-api-v0.yml`

## Usage

```yaml
jobs:
  publish_apidoc:
    runs-on: "ubuntu-latest"
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "Upload OpenAPI file to ApiDoc"
        uses: "meero-com/github-actions-shared-workflows/actions/release/publish-apidoc@main"
        with:
          API_PROJECT_NAME: billing
          API_ENVIRONMENT: pp
          API_NAME: api
          API_VERSION: v1
          API_EXTENSION: yml
          AWS_ACCESS_KEY_ID: ${{ secrets.APIDOC_AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.APIDOC_AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
          ARTIFACT_NAME: artifact_name_to_upload
          ARTIFACT_FILE_NAME: artifact_file.ext
          S3_BUCKET_NAME: ${{ secrets.S3_BUCKET_NAME }}
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
