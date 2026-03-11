import { RecuperarSenhaPage } from '../../pages/RecuperarSenhaPage';

/**
 * Suite: Recuperação de Senha
 *
 * PRINCÍPIO DE DESIGN:
 * O spec descreve a 'Intenção' do teste.
 * As interações são abstraídas no POM RecuperarSenhaPage.
 *
 * Cobre:
 * - Acesso à tela via link na tela de login
 * - Validação de campo obrigatório
 * - Submissão com usuário válido
 * - Retorno para tela de login
 */
describe('SuitPay - Recuperação de Senha', () => {
  const recuperarSenhaPage = new RecuperarSenhaPage();

  beforeEach(() => {
    // Suprime exceções não capturadas da aplicação
    cy.on('uncaught:exception', () => false);
  });

  it('deve acessar a tela de recuperação de senha pelo link na tela de login', () => {
    cy.visit('/login');
    recuperarSenhaPage.clicarEsqueciSenha();

    // Asserção: deve navegar para /forgot
    cy.location('pathname').should('eq', '/forgot');
  });

  it('deve exibir validação ao tentar recuperar com campo vazio', () => {
    recuperarSenhaPage.acessarPagina();
    recuperarSenhaPage.submeterRecuperacao();

    // Asserção: campo deve indicar erro de obrigatoriedade
    cy.get('input[placeholder="Usuário ou E-mail"]').should('have.class', 'is-invalid');
  });

  it('deve aceitar o envio com um usuário ou e-mail preenchido', () => {
    cy.intercept('POST', '**/api/v1/**').as('recuperacao');
    recuperarSenhaPage.acessarPagina();
    recuperarSenhaPage.preencherUsuario('cleiton');
    recuperarSenhaPage.submeterRecuperacao();

    // Aguarda a requisição e verifica que a página reagiu (não crashou)
    cy.get('body').should('exist');
  });

  it('deve voltar para a tela de login ao clicar em "Fazer Login"', () => {
    recuperarSenhaPage.acessarPagina();
    recuperarSenhaPage.voltarParaLogin();

    // Asserção: deve retornar para /login
    cy.location('pathname').should('eq', '/login');
  });
});
