import contatosSetup from "./util/contatos.setup";

describe('ExcluirContatoComponent', () => {
  beforeEach(() => {
    cy.limparDados();
    cy.registrar();

    cy.contains('a', 'Contatos')
      .click();
  });

  it('Deve selecionar contato corretamente', () => {
    contatosSetup.inserirContato();

    cy.get('[data-cy=btnExcluir]')
      .click();

    cy.contains('Excluir Contato');
    cy.contains('Contato Teste');
  });

  it('Deve excluir tarefa corretamente', () => {
    contatosSetup.inserirContato();

    cy.get('[data-cy=btnExcluir]')
      .click(); 

    cy.get('[data-cy=btnConfirmar]')
      .click();

    cy.wait(300);

    cy.contains('Nenhum contato cadastrado.');
  });
})
