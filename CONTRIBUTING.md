# 💡 Contributing

Thanks a lot for your interest in contributing to **Thream/website**! 🎉

## Code of Conduct

**Thream** has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Open Development

All work on **Thream/website** happens directly on [GitHub](https://github.com/Thream). Both core team members and external contributors send pull requests which go through the same review process.

## Types of contributions

- Reporting a bug.
- Suggest a new feature idea.
- Correct spelling errors, improvements or additions to documentation files.
- Improve structure/format/performance/refactor/tests of the code.
- [Add translations](#add-a-translation).

## Pull Requests

- **Please first discuss** the change you wish to make via issues.

- Ensure your code respect linting.

- Make sure your **code passes the tests**.

If you're adding new features to **Thream/website**, please include tests.

## Commits

The commit message guidelines adheres to [Conventional Commits](https://www.conventionalcommits.org/) and [Semantic Versioning](https://semver.org/) for releases.

### Examples

```sh
git commit -m "feat(components): add Button"
git commit -m "docs(readme): update installation process"
```

## Add a translation

[Reference issue](https://github.com/Thream/website/issues/24)

Feel free to contribute to **Thream** and add new languages, we would appreciate your help!

To add a new language:

- `npm install`
- `npm run generate`
- Start editing JSON files with the translation in `locales/{{locale}}` (e.g: `locales/en`)
