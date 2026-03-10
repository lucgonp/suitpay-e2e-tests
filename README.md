# SuitPay - E2E Test Automation 🚀

Professional E2E automation project for the SuitPay platform, built with focus on **scalability**, **maintainability**, and **security**.

## 🛠 Tech Stack

- **Framework**: [Cypress v15](https://www.cypress.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Design Pattern**: Page Object Model (POM)
- **Environment Management**: Dotenv for secure credential handling

## 🏗 Project Architecture

The project follows a rigorous separation of concerns:

- **Pages (`cypress/pages/`)**: Encapsulates selectors and low-level interactions.
- **E2E Specs (`cypress/e2e/`)**: Contains the test scenarios focusing on business intent and assertions.
- **Configuration (`cypress.config.ts`)**: Secure injection of environment variables.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone this repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Configuration (Secrets 🔐)

This project uses environment variables to manage sensitive data. **Never commit your `.env` file.**

1.  Copy the example file:
    ```bash
    cp .env.example .env
    ```
2.  Open the `.env` file and fill in your credentials:
    ```env
    CYPRESS_USER=your_user
    CYPRESS_PASS=your_password
    ```

## 🧪 Running Tests

| Command | Description |
| :--- | :--- |
| `npm run test:headless` | Runs all tests in headless mode (Chrome). |
| `npm run test:ui` | Opens the Cypress Runner for visual execution. |
| `npm run lint` | Runs ESLint to check for code quality issues. |
| `npm run format` | Automatically formats code using Prettier. |

## 🔑 Security Features

- **Sensitive Logs**: The `LoginPage` interaction methods use `{ log: false }` when typing credentials to prevent secrets from appearing in the Cypress command log or screenshots.
- **Config Injection**: Environment variables are injected via `setupNodeEvents` in `cypress.config.ts`, adhering to Cypress v15 security standards.

---
*Developed by Principal SDET - 2026*
