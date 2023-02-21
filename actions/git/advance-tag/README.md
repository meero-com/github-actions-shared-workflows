# Git: advance-tag

## Behavior

Move a named tag to current commit. Recreates the tag if it's absent.

## Usage

```yaml
jobs:
  advanceTag:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v2"

      - name: "Move tag"
        uses: "meero-com/github-actions-shared-workflows/actions/git/advance-tag@main"
        with:
          TAG_NAME: "DEV"
          github-token: ${{ secrets.API_TOKEN_GITHUB }}
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
