# SuitPay - Automação de Testes E2E 🚀

Projeto de automação E2E profissional para a plataforma SuitPay, desenvolvido com foco em **escalabilidade**, **manutenibilidade** e **segurança**.

## 🛠 Tecnologias

- **Framework**: [Cypress v15](https://www.cypress.io/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/) (Modo Strict)
- **Padrão de Projeto**: Page Object Model (POM)
- **Gerenciamento de Ambiente**: Dotenv para manipulação segura de credenciais

## 🏗 Arquitetura do Projeto

O projeto segue uma separação rigorosa de responsabilidades:

- **Pages (`cypress/pages/`)**: Encapsula seletores e interações de baixo nível.
- **E2E Specs (`cypress/e2e/`)**: Contém os cenários de teste com foco em intenção de negócio e asserções.
- **Configuração (`cypress.config.ts`)**: Injeção segura de variáveis de ambiente.

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v20 ou superior recomendado)
- [npm](https://www.npmjs.com/)

### Instalação

1. Clone este repositório.
2. Instale as dependências:
    ```bash
    npm install
    ```

### Configuração (Segredos 🔐)

Este projeto usa variáveis de ambiente para gerenciar dados sensíveis. **Nunca commite seu arquivo `.env`.**

1. Copie o arquivo de exemplo:
    ```bash
    cp .env.example .env
    ```
2. Abra o arquivo `.env` e preencha com suas credenciais:
    ```env
    CYPRESS_USER=seu_usuario
    CYPRESS_PASS=sua_senha
    ```

## 🧪 Rodando os Testes

| Comando | Descrição |
| :--- | :--- |
| `npm run test:headless` | Roda todos os testes em modo headless. |
| `npm run test:ui` | Abre o Cypress Runner para execução visual. |
| `npm run lint` | Executa o ESLint para verificar a qualidade do código. |
| `npm run format` | Formata o código automaticamente com o Prettier. |

## 🔑 Funcionalidades de Segurança

- **Logs Sensíveis**: Os métodos de interação do `LoginPage` usam `{ log: false }` ao digitar credenciais para evitar que segredos apareçam nos logs ou capturas de tela do Cypress.
- **Injeção via Config**: Variáveis de ambiente são injetadas via `setupNodeEvents` no `cypress.config.ts`, seguindo os padrões de segurança do Cypress v15.

---
*Desenvolvido por Lucas Gontijo*
