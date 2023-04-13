# Post-deployment tags

## Behavior

- extract version number from current github reference (`v3.0.42`, `ANY-v3.0.42`)
- add a new prefixed version tag (`PREF-v3.0.42`)
- add or move the prefixed latest tag (`PREF-latest`)

**WARNING** first step will fail if reference don't match rule

## Usage

Deploy semver tag to DEV:

- from `v2.3.4` tag
- create `DEV-v2.3.4` tag
- create or move `DEV-latest` tag

```yaml
name: Main Workflow

on:
  push: # Update me!

jobs:
  post-deploy-tags:
    uses: meero-com/github-actions-shared-workflows/.github/workflows/post-deploy-tags.yml@main
    with:
      source_prefix: 'v'
      target_prefix: 'DEV'    
    secrets:
      gh_token: ${{ secrets.API_TOKEN_GITHUB }}
```

Deploy DEV-version tag to PP

- from `DEV-v2.3.4` tag
- create `PREPROD-v2.3.4` tag
- create or move `PREPROD-latest` tag

```yaml
name: Main Workflow

on:
  push: # Update me!

jobs:
  post-deploy-tags:
    uses: meero-com/github-actions-shared-workflows/.github/workflows/post-deploy-tags.yml@main
    with:
      source_prefix: 'DEV-v'
      target_prefix: 'PREPROD'
    secrets:
      gh_token: ${{ secrets.API_TOKEN_GITHUB }}
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
