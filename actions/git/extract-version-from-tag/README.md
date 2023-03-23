# Git: extract-version-from-tag

## Behavior

Extract version number from semver tag. 
WARNING: Must be run on tag reference.

## Usage

```yaml
jobs:
  extract-version:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: "extract version"
        uses: "meero-com/github-actions-shared-workflows/actions/git/extract-version-from-tag@main"
        with:
          PREFIX: "DEV-v"
```

Will outputs

```yaml
version_number: 1.2.3 # if ran on tag DEV-v1.2.3
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
