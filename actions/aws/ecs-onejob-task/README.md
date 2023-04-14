# AWS: ecs-onejob-task

## Behavior

Fetch specified docker image artifact
Download ECS task definition, modify an redeploy it.
Run the onejob command with AWS ECS.

## Usage

```yaml
jobs:
  run-migrations:
    name: "Run onejob DB migrations"
    runs-on: "ubuntu-latest"
    steps:
      - uses: actions/checkout@v3

      - uses: "meero-com/github-actions-shared-workflows/actions/aws/rds-run-migrations@main"
        with:
          artifact_name: artifact_name
          artifact_filename: artifact_name.ext
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
          ECS_TASK_DEFINITION: ${{ secrets.ECS_TASK_DEFINITION }}
          ECS_TASK_CLUSTER: ${{ secrets.ECS_TASK_CLUSTER }}
          ecs_container_name: ${{ secrets.ECS_CONTAINER_NAME }}
          network_env_name: ${{ secrets.ENV_SHORT_NAME }}
          network_product_name: ${{ secrets.PROJECT_NAME }}
          task_command: "alembic upgrade head" #Update me!
```

Beware of using a `@ref` (`@main` in the example above) which suits your stability requirements in your workflow:

* Use `@main` if you always want to use the latest version of the workflow.
* Use `@<tag>` if you wan to use a specific frozen version of the workflow.
