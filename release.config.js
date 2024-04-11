module.exports = {
    ci: true,
    debug: false,
    dryRun: false,
    // eslint-disable-next-line no-template-curly-in-string
    tagFormat: "v${version}",
    branches: [
      // stable
      { name: 'main' },
    ],
    plugins: [
      /**
       * analyze commits with conventional-changelog
       * ref: https://github.com/semantic-release/commit-analyzer#readme
       */
      [
        "@semantic-release/commit-analyzer",
        {
          preset: "conventionalcommits",
          releaseRules: [
            { type: "ci", release: "patch" },
            { type: "build", release: "patch" },
          ],
        },
      ],
      /**
       * generate changelog content with conventional-changelog
       * ref: https://github.com/semantic-release/release-notes-generator#readme
       */
      [
        "@semantic-release/release-notes-generator",
        {
          preset: "conventionalcommits",
          presetConfig: {
            types: [
              { type: 'feat', section: 'Features' },
              { type: 'feature', section: 'Features' },
              { type: 'fix', section: 'Bug Fixes' },
              { type: 'perf', section: 'Performance Improvements' },
              { type: 'revert', section: 'Reverts' },
              { type: 'chore', section: 'Miscellaneous Chores' },
              { type: 'refactor', section: 'Code Refactoring' },
              // hidden CHANGELOG sections
              { type: 'docs', section: 'Documentation', hidden: true },
              { type: 'style', section: 'Styles', hidden: true },
              { type: 'test', section: 'Tests', hidden: true },
              { type: 'build', section: 'Build System', hidden: true },
              { type: 'ci', section: 'Continuous Integration', hidden: true },
            ],
          },
        },
      ],
      /**
       * create or update a changelog file
       * ref: https://github.com/semantic-release/changelog#readme
       */
      [
        "@semantic-release/changelog",
        {
          changelogFile: "CHANGELOG.md",
        },
      ],
      /**
       * Export version on a file
       */
      [
        "@semantic-release/exec",
        {
          verifyReleaseCmd: "echo \"${nextRelease.version}\" > version"
        },
      ],
      /**
       * publish a GitHub release and comment on released PR/Issues
       * ref: https://github.com/semantic-release/github#readme
       */
      [
        "@semantic-release/github",
        {
          assets: [
            { path: "CHANGELOG.md", label: "CHANGELOG.md" },
            { path: "package.json", label: "package.json" },
          ],
          successComment: false,
        },
      ],
    ],
  };