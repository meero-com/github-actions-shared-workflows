# AWS: lambda-deploy

## Behavior

Download specified artifact.
Connect to AWS.
Update the lambda code and publish a new version

## Usage

```yaml
jobs:
  deploy-lambda:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "Deploy"
        uses: "meero-com/github-actions-shared-workflows/actions/aws/lambda-deploy@main"
        with:
          artifact_name: image-uri
          artifact_filename: image-uri.txt
          AWS_ACCESS_KEY_ID: ${{ secrets.NP_AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.NP_AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
          LAMBDA_FUNCTION_NAME: my-wonderful-lambda
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
