import contatosSetup from "./util/contatos.setup";

describe('EditarContatoComponent', () => {
  const form = contatosSetup.obterFormRegistro();

  beforeEach(() => {
    cy.limparDados();
    cy.registrar();

    cy.contains('a', 'Contatos')
      .click();
  });

  it('Deve selecionar contato corretamente', () => {
    contatosSetup.inserirContato();

    cy.get('[data-cy=btnEditar]')
      .click();

    form.nome().should('contain.value', 'Contato Teste');
  });

  it('Deve editar tarefa corretamente', () => {
    contatosSetup.inserirContato();

    cy.get('[data-cy=btnEditar]')
      .click();

    form.nome()
      .type(' Editado');

    form.btnGravar()
      .click();

    cy.contains('Contato Teste Editado');
  })
})
