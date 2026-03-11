import { LoginPage } from '../../pages/LoginPage';

/**
 * Suite: Validações de Login (Cenários Negativos e Complementares)
 *
 * PRINCÍPIO DE DESIGN:
 * O spec descreve a 'Intenção' do teste.
 * As interações são abstraídas no POM LoginPage.
 *
 * Cobre:
 * - Campos vazios (validação de obrigatoriedade)
 * - Credenciais inválidas (usuário/senha incorretos)
 * - Navegação para "Abrir Conta"
 */
describe('SuitPay - Validações de Login', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    // Suprime exceções não capturadas da aplicação (ex: splash screen, animações)
    cy.on('uncaught:exception', () => false);
    loginPage.acessarPagina();
  });

  context('Campos Obrigatórios', () => {
    it('deve exibir validação ao submeter formulário com campos vazios', () => {
      loginPage.submeterLogin();

      // Asserções: campos inválidos devem receber classe CSS de erro
      cy.get('input[placeholder="E-mail ou Usuário"]').should('have.class', 'is-invalid');
      cy.get('input[placeholder="Senha"]').should('have.class', 'is-invalid');
    });

    it('deve exibir validação ao submeter apenas com usuário preenchido', () => {
      cy.get('input[placeholder="E-mail ou Usuário"]').type('alguem');
      loginPage.submeterLogin();

      // Apenas o campo senha deve ser inválido
      cy.get('input[placeholder="Senha"]').should('have.class', 'is-invalid');
    });

    it('deve exibir validação ao submeter apenas com senha preenchida', () => {
      cy.get('input[placeholder="Senha"]').type('algumasenha');
      loginPage.submeterLogin();

      // Apenas o campo usuário deve ser inválido
      cy.get('input[placeholder="E-mail ou Usuário"]').should('have.class', 'is-invalid');
    });
  });

  context('Credenciais Inválidas', () => {
    it('deve exibir mensagem de erro ao usar credenciais incorretas', () => {
      loginPage.preencherCredenciais('usuario_invalido', 'senha_invalida');
      loginPage.submeterLogin();

      // Aguarda a tentativa de autenticação ser processada
      cy.intercept('POST', '**/api/v1/auth/signin').as('tentativaLogin');
      cy.wait('@tentativaLogin');

      // Deve permanecer na tela de login após falha
      cy.location('pathname').should('eq', '/login');
    });
  });

  context('Navegação', () => {
    it('deve redirecionar para a página de cadastro ao clicar em "Abrir Conta"', () => {
      loginPage.clicarAbrirConta();
      cy.location('pathname').should('include', '/register');
    });

    it('deve redirecionar para a página de recuperação de senha ao clicar em "Esqueci minha senha"', () => {
      cy.get('a[href="/forgot"]').should('be.visible').click();
      cy.location('pathname').should('eq', '/forgot');
    });
  });
});
