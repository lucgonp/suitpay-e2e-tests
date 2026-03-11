import { LoginPage } from '../pages/LoginPage';

/**
 * Suite: Fluxo de Login
 *
 * PRINCÍPIO DE DESIGN:
 * O spec descreve a 'Intenção' do teste.
 * As interações são abstraídas no POM LoginPage.
 */
describe('SuitPay - Login Happy Path', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    // Suprime exceções não capturadas da aplicação (ex: splash screen, animações)
    // que não são relacionadas ao fluxo do teste
    cy.on('uncaught:exception', () => false);
  });

  it('deve realizar login com sucesso usando credenciais válidas', () => {
    // Intercepta as rotas críticas do dashboard que confirmam o login bem-sucedido
    // O cy.intercept() precisa ser declarado ANTES da ação que dispara a requisição
    cy.intercept('POST', '**/api/v1/acc/get-account').as('getDadosDaConta');
    cy.intercept('POST', '**/api/v1/transaction/transactions-by-period').as('getTransacoes');

    // Cypress v15: cy.env() com array de chaves retorna um objeto com os valores
    // Apenas loginPage.realizarLogin() fica dentro do .then() para ter acesso às credenciais
    cy.env(['USER', 'PASS']).then((envs) => {
      const { USER: user, PASS: pass } = envs as { USER: string; PASS: string };

      if (!user || !pass) {
        throw new Error('Variáveis de ambiente CYPRESS_USER ou CYPRESS_PASS não encontradas.');
      }

      loginPage.realizarLogin(user, pass);
    });

    // cy.wait() e asserções ficam FORA do .then() para entrar corretamente
    // na fila de execução do Cypress após a navegação da SPA se estabilizar
    cy.wait('@getDadosDaConta');
    cy.wait('@getTransacoes');

    // Asserções: camada de intenção
    // cy.location() é mais estável que cy.url() em navegações client-side (SPA)
    cy.location('pathname').should('eq', '/overview');
    cy.get('body').should('contain', 'Saldo Total');
  });
});
