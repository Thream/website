<h1 align="center"><a href="https://thream.divlo.fr/">Thream/website</a></h1>

<p align="center">
  <a href="./CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="./CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="Contributor Covenant" /></a>
  <br />
  <a href="https://github.com/Thream/website/actions/workflows/analyze.yml"><img src="https://github.com/Thream/website/actions/workflows/analyze.yml/badge.svg?branch=develop" /></a>
  <a href="https://github.com/Thream/website/actions/workflows/build.yml"><img src="https://github.com/Thream/website/actions/workflows/build.yml/badge.svg?branch=develop" /></a>
  <a href="https://github.com/Thream/website/actions/workflows/lint.yml"><img src="https://github.com/Thream/website/actions/workflows/lint.yml/badge.svg?branch=develop" /></a>
  <a href="https://github.com/Thream/website/actions/workflows/test.yml"><img src="https://github.com/Thream/website/actions/workflows/test.yml/badge.svg?branch=develop" /></a>
  <br />
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a>
  <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release" /></a>
</p>

## 📜 About

Thream's website to stay close with your friends and communities.

It uses [Thream/api](https://github.com/Thream/api) [v1.2.0](https://github.com/Thream/api/releases/tag/v1.2.0).

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 16.0.0
- [npm](https://www.npmjs.com/) >= 8.0.0

### Installation

```sh
# Clone the repository
git clone https://github.com/Thream/website.git

# Go to the project root
cd website

# Configure environment variables
cp .env.example .env

# Install
npm install
```

You will need to configure the environment variables by creating an `.env` file at
the root of the project (see `.env.example`).

### Local Development environment

```sh
npm run dev
```

### Production environment with [Docker](https://www.docker.com/)

```sh
# Setup and run all the services for you
docker compose up --build
```

#### Services started

- website : `http://localhost:3000`

## 💡 Contributing

Anyone can help to improve the project, submit a Feature Request, a bug report or
even correct a simple spelling mistake.

The steps to contribute can be found in [CONTRIBUTING.md](./CONTRIBUTING.md).

## 📄 License

[MIT](./LICENSE)
