# PreCommit: bom-compliance

## Behavior

Use pre-commit manual rules and BOM manifests to validate communications contracts with related components.
Everything is checked in a target environment

## Usage

Run before PR merge (preflight to ensure mergeability):

- specify a fake version (version-name)
- will use ENV-latest tags in remote dependencies
- DON'T use on self declared constraints (restriction contract type)

```yaml
jobs:
  bom-compliance:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: BOM compliance
        uses: "meero-com/github-actions-shared-workflows/actions/precommit/bom-compliance@main"
        with:
          gh_token: ${{ secrets.API_TOKEN_GITHUB }}
          target_env: dev
          version_name: fake_local_version
```

Run before deployment on specified env

- try to extract current version from current git-reference
- will use ENV-latest tags in remote dependencies

```yaml
jobs:
  bom-compliance:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout Code"
        uses: "actions/checkout@v3"

      - name: BOM compliance
        uses: ./.github/action/bom-compliance
        with:
          gh_token: ${{ secrets.API_TOKEN_GITHUB }}
          target_env: dev
          semver_tag_prefix: v
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
    rev: v1.8.1
    hooks:
      - id: bom-env-compliance
        args:
          - --current-repository=meero-com/meero-billing-lambda-licence-update-python
          - --target-env-var=CURRENT_TARGET_ENV

```
