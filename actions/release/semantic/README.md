# Release: Semantic

## Behavior

Apply semantic relase n specified commit.

## Usage

```yaml
jobs:
  sem-ver:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"
        with:
          persist-credentials: false

      - name: "Semantic release"
        uses: "meero-com/github-actions-shared-workflows/actions/release/semantic@main"
        with:
          github-token: ${{ secrets.API_TOKEN_GITHUB }}
          npm-token: ${{ secrets.NPM_TOKEN }}
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.

## Protected repositories/branches

To operate on protected branches you must pass a github Personal Access Token as github-token.
AND
Avoid persisting credentials as part of actions/checkout@v3 by setting the parameter persist-credentials: false.

```yaml
      - name: "Checkout Code"
        uses: "actions/checkout@v3"
        with:
          persist-credentials: false
```
