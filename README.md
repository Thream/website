<h1 align="center"><a href="https://thream.divlo.fr/">Thream/website</a></h1>

<p align="center">
  <strong>Thream's website to stay close with your friends and communities.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ts-standard"><img alt="TypeScript Standard Style" src="https://camo.githubusercontent.com/f87caadb70f384c0361ec72ccf07714ef69a5c0a/68747470733a2f2f62616467656e2e6e65742f62616467652f636f64652532307374796c652f74732d7374616e646172642f626c75653f69636f6e3d74797065736372697074"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a>
  <a href="https://github.com/Thream/Thream/blob/master/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="Contributor Covenant" /></a>
</p>

## 📜 About

Thream's website to stay close with your friends and communities. It relies on [Thream/api](https://github.com/Thream/api/).

This project was bootstrapped with [create-fullstack-app](https://github.com/Divlo/create-fullstack-app).

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 16
- [npm](https://www.npmjs.com/) >= 7

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
docker-compose up --build
```

#### Services started

- website : `http://localhost:3000`

## 💡 Contributing

Anyone can help to improve the project, submit a Feature Request, a bug report or
even correct a simple spelling mistake.

The steps to contribute can be found in [CONTRIBUTING.md](./CONTRIBUTING.md).

## 📄 License

[MIT](./LICENSE)
