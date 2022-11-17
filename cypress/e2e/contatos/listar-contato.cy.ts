import contatosSetup from "./util/contatos.setup";

describe('ListarContato', () => {
  beforeEach(() => {
    cy.limparDados();
    cy.registrar();

    cy.contains('a', 'Contatos')
      .click();
  });

  it('Deve carregar a página corretamente', () => {
    cy.url().should('contain', '/contatos/listar');
  })

  it('Deve listar contato adicionado', () => {
    contatosSetup.inserirContato();

    cy.wait(300);

    cy.get('table')
      .find('tbody > tr')
      .should('have.length', 1);
  })
})
