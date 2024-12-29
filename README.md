# rust-web3-react

**rust-web3-react** is a basic voting platform that integrates a Rust-based smart contract with a React frontend, utilizing the MultiversX SDK.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#1-clone-the-repository)
  - [Build and Deploy the Smart Contract](#3-build-and-deploy-the-smart-contract)
  - [Set Up the Frontend](#4-set-up-the-frontend)
  - [Access the Application](#5-access-the-application)


---

## Features

- **Smart Contract**: Developed in Rust, the smart contract manages the voting logic and ensures secure and transparent vote handling.
- **Frontend**: Built with React, providing a user-friendly interface for interacting with the voting system.
- **MultiversX SDK**: Utilized for seamless interaction between the frontend and the smart contract.

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/)
- [MultiversX SDK](https://docs.multiversx.com/sdk-and-tools/erdpy/installing-erdpy/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Emmrylmz/rust-web3-react.git
cd rust-web3-react
cd Frontend-Multiversx
```

### 2. Build and Deploy Smart Contract

```bash
sc-meta all build
sc-meta all snippets
cd interactor
cargo run Deploy
```

### 3. Set Up the Frontend
```bash
yarn build:devnet
```
### 4. Access the Application
```bash
yarn start:devnet
```





