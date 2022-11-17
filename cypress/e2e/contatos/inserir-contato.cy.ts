import contatosSetup from "./util/contatos.setup";

describe('InserirContatoComponent', () => {
  const form = contatosSetup.obterFormRegistro();

  beforeEach(() => {
    cy.limparDados();
    cy.registrar();

    cy.contains('a', 'Contatos')
      .click();

    cy.get('[data-cy=btnAdicionar]').click();
  });

  it('Deve carregar a página corretamente', () => {
    cy.url().should('contain', '/contatos/inserir');
  });

  it('Deve inserir contato', () => {
    contatosSetup.inserirContato();

    cy.contains('Contato "Contato Teste" cadastrado com sucesso!');
  });


  it('Deve notificar sobre formulário inválido', () => {
    form.btnGravar()
      .click();

    cy.contains('Por favor, preencha o formulário corretamente.');
  })
})
