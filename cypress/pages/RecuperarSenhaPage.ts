/**
 * RecuperarSenhaPage - Page Object Model
 *
 * SEPARAÇÃO DE RESPONSABILIDADES:
 * Esta classe contém apenas os seletores e métodos de interação da tela de recuperação de senha.
 * As asserções ficam nos arquivos de Spec.
 */
export class RecuperarSenhaPage {
  // Seletores
  private readonly linkEsqueciSenha = 'a[href="/forgot"]';
  private readonly inputUsuarioForgot = 'input[placeholder="Usuário ou E-mail"]';
  private readonly buttonRecuperar = 'button.card-forgot__button';
  private readonly linkVoltarLogin = 'a[href="/login"]';

  /**
   * Clica no link "Esqueci minha senha" na tela de login
   */
  public clicarEsqueciSenha(): this {
    cy.get(this.linkEsqueciSenha).should('be.visible').click();
    return this;
  }

  /**
   * Navega diretamente para a página de recuperação de senha
   */
  public acessarPagina(): this {
    cy.visit('/forgot');
    return this;
  }

  /**
   * Preenche o campo de usuário ou e-mail
   * @param usuarioOuEmail - usuário ou e-mail para recuperação
   */
  public preencherUsuario(usuarioOuEmail: string): this {
    cy.get(this.inputUsuarioForgot).should('be.visible').type(usuarioOuEmail);
    return this;
  }

  /**
   * Clica no botão de recuperar senha
   */
  public submeterRecuperacao(): void {
    cy.get(this.buttonRecuperar).click();
  }

  /**
   * Clica no link para voltar ao login
   */
  public voltarParaLogin(): void {
    cy.get(this.linkVoltarLogin).click();
  }
}
