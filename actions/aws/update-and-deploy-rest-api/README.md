# AWS: update-and-deploy-rest-api

## Behavior

- Push new openapi definition
- Deploy ApiGw on specified stage
- export deployed api as openapi (yml) file

## Usage

```yaml
jobs:
  advanceTag:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "Update & Deploy Rest API"
        id: deploy_rest_apigw
        uses: "meero-com/github-actions-shared-workflows/actions/aws/update-and-deploy-rest-api@main"
        with:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
          ARTIFACT_NAME: artifact_name_to_upload
          ARTIFACT_FILE_NAME: artifact_file.ext
          APIGW_REST_API_ID: ${{ secrets.APIGW_ID }}
          APIGW_STAGE_NAME: stage_v1
          APIGW_VERSION: api_version_to_deploy
          apigw_put_mode: merge # default value
```

will output
```yaml
openapi_artifact_name: openapi-export
openapi_artifact_filename: ${{ secrets.APIGW_ID }}-stage_v1-api_version_to_deploy.yml
```
use `action/download-artifact` to use them

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
