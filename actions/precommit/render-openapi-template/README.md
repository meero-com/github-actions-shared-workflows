# PreCommit: render-openapi-template

## Behavior

Use pre-commit manual rules to render openapi file and validate it.
Outputs the generated artifact

## Usage

```yaml
jobs:
  openapi-render:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "Render OpenAPI ApiGateway file"
        uses: "meero-com/github-actions-shared-workflows/actions/precommit/render-openapi-template@main"
        with:
          OPENAPI_API_NAME: myapi
          version_identifier: uniq_identifer_such_commit_sha
```

will output
```yaml
apigw_version: uniq_identifer_such_commit_sha
artifact_name: apigateway-file
artifact_file_name: openapi-myapi-uniq_identifer_such_commit_sha.json
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.

## Requirements

### PreCommit
This action use pre-commit manual hooks.
PreCommit must be configured with following hooks

```yaml
---
repos:
  - repo: https://github.com/meero-com/pre-commit-hooks
    rev: v1.3.0
    hooks:
      - id: render-jinja-template
        args:
          - --env-var-prefix=TMPL_APIGW_
          - --templates-dir=apigw/templates
          - --template-name=openapi.json.j2
          - --output-filename-prefix=apigw/openapi
          - --output-filename=myapi
          - --output-filename-extension=json
          - -e=body_schema
          - -e=path_parameters
          - -e=parameters
          - -e=header_parameters
          - -e=cors_methods
          - -e=model
          - -e=query_parameters
          - -e=param_location

  - repo: https://github.com/APIDevTools/swagger-cli
    rev: v4.0.4
    hooks:
      - id: swagger-validation
        stages: [manual]
        files: apigw\/(openapi|swagger).*\.(json|ya?ml)$

```

### env vars

If your template use _prefixecd_ env vars, don't forget to set them up before action execution.