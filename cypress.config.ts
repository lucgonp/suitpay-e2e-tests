import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Configuração do Cypress v15
 *
 * DECISÃO DE DESIGN: Usamos 'dotenv' para carregar variáveis de ambiente localmente.
 * Em CI/CD, as variáveis (CYPRESS_USER, CYPRESS_PASS) devem ser injetadas
 * como variáveis de sistema. O 'dotenv' ignora graciosamente se o .env não existir.
 */
export default defineConfig({
  e2e: {
    baseUrl: 'https://web.sandbox.suitpay.app',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: false, // Arquivo de suporte desabilitado para simplificar o bootstrap
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    // Timeouts razoáveis para CI — se passar de 60s, o ambiente provavelmente está fora
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,   // CI: até 3 tentativas (1 + 2 retries) para absorver instabilidade do sandbox
      openMode: 0,  // Local: sem retry para feedback imediato
    },
    setupNodeEvents(on, config) {
      // Injeção segura das variáveis de ambiente
      config.env.USER = process.env.CYPRESS_USER;
      config.env.PASS = process.env.CYPRESS_PASS;

      return config;
    },
  },
  env: {
    // Não hardcode dados sensíveis aqui
  },
  allowCypressEnv: false,
});
