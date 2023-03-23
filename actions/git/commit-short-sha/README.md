# Git: Commit short sha

## Behavior

Output the current commit short sha.

## Usage

```yaml
jobs:
  commit-short-sha:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v2"

      - name: "get commit sha"
        id: commit-short-sha
        uses: "meero-com/github-actions-shared-workflows/actions/git/commit-short-sha@main"

      - name: Print
        run: echo "${{ steps.commit-short-sha.outputs.commit_short_sha }}"
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
