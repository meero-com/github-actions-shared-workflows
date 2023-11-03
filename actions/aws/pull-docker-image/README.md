# AWS: pull-docker-image

## Behavior

Pull a Docker image from ECR
Save image in cache and outputs cache key and path.

## Usage

```yaml
jobs:
  pull-docker:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "Promote docker"
        uses: "meero-com/github-actions-shared-workflows/actions/aws/pull-docker-image@main"
        with:
          version: github-commit-sha
          artifact_name: image-uri
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY_NAME }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
```

will output
```yaml
artifact_name: image-uri-345678-6
artifact_file_name: /tmp/docker/image-uri.txt
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
