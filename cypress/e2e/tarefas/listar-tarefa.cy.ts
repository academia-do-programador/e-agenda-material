import tarefasSetup from "./util/tarefas.setup";

describe('ListarTarefaComponent', () => {
  beforeEach(() => {
    cy.limparDados();
    cy.registrar();

    cy.contains('a', 'Tarefas')
      .click();
  });

  it('Deve carregar a página corretamente', () => {
    cy.url().should('contain', '/tarefas/listar');
  })

  it('Deve listar tarefa adicionada', () => {
    tarefasSetup.inserirTarefa();

    cy.wait(300);

    cy.get('table')
      .find('tbody > tr')
      .should('have.length', 1);
  })
})
