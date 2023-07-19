# AWS: ecr-public-login

## Behavior

Login on the public AWS ECR registry.

## Usage

```yaml
jobs:
  ecrPublicLogin:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "ECR public login"
        uses: "meero-com/github-actions-shared-workflows/actions/aws/ecr-public-login@main"
        with:
          AWS_ACCESS_KEY_ID: ${{ secrets.NP_AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.NP_AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
