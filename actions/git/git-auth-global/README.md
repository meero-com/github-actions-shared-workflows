# Git: git-auth-global

## Behavior

Modify git global config:
  - authenticate requests to github.com with Github token

Global config is cleared in post run

_useful to use private pre-commit sources in CI_

## Usage

```yaml
jobs:
  advanceTag:
    runs-on: ubuntu-latest
    steps:
      - uses: "actions/checkout@v4"

      - name: "Git Auth Global"
        uses: "meero-com/github-actions-shared-workflows/actions/git/git-auth-global@main"
        with:
          github-token: ${{ secrets.API_TOKEN_GITHUB }}
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
