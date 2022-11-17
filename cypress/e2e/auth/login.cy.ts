import authSetup from "./util/auth.setup";

describe('Processo de Login do Usuário', () => {
  const form = authSetup.obterFormLogin();

  beforeEach(() => {
    cy.limparDados();
    cy.visit('/');
  });

  it('Deve acessar a página', () => {
    cy.title().should('contain', 'Login');
  });

  it('Deve autenticar usuário valido', () => {
    cy.registrar('Teste Login', 'teste.login@cypress.com', 'Teste@123', false);

    form.email().type('teste.login@cypress.com');
    form.senha().type('Teste@123');
    form.btnEntrar().click();

    cy.wait(500);

    cy.url().should('contain', 'dashboard');
  });

  it('Deve notificar sobre formulário inválido', () => {

    form.email().type('tiago');
    form.senha().type('Teste@123');

    form.btnEntrar().click();

    cy.wait(300);

    cy.contains('Por favor, preencha o formulário corretamente antes de prosseguir.');
  });

  it('Deve notificar credenciais inválidas', () => {
    form.email().type('tiago4@gmail.com');
    form.senha().type('Teste@123');
    form.btnEntrar().click();

    cy.wait(300);

    cy.contains('Usuário ou senha incorretos');
  });

  it('Deve validar email vazio', () => {
    form.email().focus();
    form.senha().focus();

    cy.contains('O email precisa ser preenchido.');
  });

  it('Deve validar email em formato inválido', () => {
    form.email().type('teste');
    form.senha().focus();

    cy.contains('O email precisa seguir o formato "usuario@dominio.com".')
  });

  it('Deve validar senha vazia', () => {
    form.senha().focus();
    form.email().focus();

    cy.contains('A senha precisa ser preenchida.');
  });

  it('Deve validar senha curta', () => {
    form.senha().type('123');
    form.email().focus();

    cy.contains('A senha deve conter no mínimo 6 caracteres.');
  });
});
