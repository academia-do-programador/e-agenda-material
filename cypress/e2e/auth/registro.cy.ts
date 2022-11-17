import authSetup from "./util/auth.setup";

describe('Processo de Registro do Usuário', () => {
  const form = authSetup.obterFormRegistro();

  beforeEach(() => {
    cy.limparDados();
    cy.visit('conta/registrar');
  });

  it('Deve carregar a página', () => {
    cy.title().should('contain', 'Registro - e-Agenda');
  });

  it('Deve notificar sobre formulário inválido', () => {
    form.nome().type('Testes Cypress');
    form.email().type('testador@cypress.com');
    form.senha().type('Teste');
    form.confirmarSenha().type('Teste');
    form.btnRegistrar().click();

    cy.wait(300);

    cy.contains('Por favor, preencha o formulário corretamente antes de prosseguir.');
  });

  it('Deve registrar e redirecionar novo usuário', () => {
    form.nome().type('Testes Cypress 2');
    form.email().type('testador2@cypress.com');
    form.senha().type('Teste@123');
    form.confirmarSenha().type('Teste@123');
    form.btnRegistrar().click();

    cy.wait(1000);
    cy.url().should('contain', 'dashboard');
  });

  it('Deve notificar sobre usuário repetido', () => {
    cy.registrar('Teste', 'teste@cypress.com', 'Teste@123', false);
    cy.registrar('Teste', 'teste@cypress.com', 'Teste@123');

    cy.contains("Login 'teste@cypress.com' já está sendo utilizado.");
  });

  // it('Deve notificar sobre senhas diferentes', () => {
  //   form.nome().type('Testes Cypress 3');
  //   form.email().type('testador3@cypress.com');
  //   form.senha().type('Testes@123');
  //   form.confirmarSenha().type('Teste@123');
  //   form.btnRegistrar().click();

  //   cy.wait(300);
  //   cy.contains('As senhas não conferem');
  // });

  it('Deve validar nome vazio', () => {
    form.nome().focus();
    form.email().focus();

    cy.contains('O nome precisa ser preenchido.');
  });

  it('Deve validar nome curto', () => {
    form.nome().type('12');
    form.email().focus();

    cy.contains('O nome deve ter no mínimo 3 caracteres.');
  });

  it('Deve validar email vazio', () => {
    form.email().focus();
    form.senha().focus();

    cy.contains('O email precisa ser preenchido.');
  });

  it('Deve validar email em formato inválido', () => {
    form.email().type('teste');
    form.senha().focus();

    cy.contains('O email precisa seguir o formato "usuario@dominio.com".');
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
})
