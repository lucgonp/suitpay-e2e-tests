/**
 * LoginPage - Page Object Model
 *
 * SEPARAÇÃO DE RESPONSABILIDADES:
 * Esta classe contém apenas os seletores e métodos de interação.
 * As asserções ficam nos arquivos de Spec.
 */
export class LoginPage {
  // Seletores
  private readonly inputUser = 'input[placeholder="E-mail ou Usuário"]';
  private readonly inputPass = 'input[placeholder="Senha"]';
  private readonly buttonLogin = 'button.card-login__button';
  private readonly buttonRegister = 'div.card-login__button--outlined';

  /**
   * Navega para a página de login
   */
  public acessarPagina(): this {
    cy.visit('/login');
    return this;
  }

  /**
   * Preenche as credenciais de login
   * @param user - usuário ou e-mail
   * @param pass - senha
   */
  public preencherCredenciais(user: string, pass: string): this {
    cy.get(this.inputUser).should('be.visible').type(user, { log: false });
    cy.get(this.inputPass).should('be.visible').type(pass, { log: false });
    return this;
  }

  /**
   * Clica no botão de login
   */
  public submeterLogin(): void {
    cy.get(this.buttonLogin).click();
  }

  /**
   * Clica no botão "Abrir Conta"
   */
  public clicarAbrirConta(): void {
    cy.get(this.buttonRegister).should('be.visible').click();
  }

  /**
   * Método auxiliar para realizar o fluxo completo de login
   */
  public realizarLogin(user: string, pass: string): void {
    this.acessarPagina();
    this.preencherCredenciais(user, pass);
    this.submeterLogin();
  }
}
