# GitHub Actions Shared Workflows

Shared workflows for Meero GitHub Actions runs.

See [how to reuse workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows) in GitHub Actions.

## Usage

You can call workflows stored in this repository as follows:

```yaml
jobs:
  build-documentation:
    uses: meero-com/github-actions-shared-workflows/.github/workflows/build-documentation.yml@main
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.

## Local Development

This repository use pre-commit

- [install pre-commit](https://pre-commit.com/index.html#install)
- run once `pre-commit install` to automatically execute pre-commit hooks at commit
- run `pre-commit run -a` whenever you want to run hooks on the complete repository
