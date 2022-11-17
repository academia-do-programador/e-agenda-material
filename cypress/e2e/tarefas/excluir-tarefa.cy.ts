import tarefasSetup from "./util/tarefas.setup";

describe('ExcluirTarefaComponent', () => {
  beforeEach(() => {
    cy.limparDados();
    cy.registrar();

    cy.contains('a', 'Tarefas')
      .click();
  });

  it('Deve selecionar tarefa corretamente', () => {
    const tituloTarefa = 'Teste de Exclusão';

    tarefasSetup.inserirTarefa(tituloTarefa);

    cy.get('[data-cy=btnExcluir]')
      .click();

    cy.contains('Excluir Tarefa');
    cy.contains(tituloTarefa);
  });

  it('Deve excluir tarefa corretamente', () => {
    const tituloTarefa = 'Teste de Exclusão';

    tarefasSetup.inserirTarefa(tituloTarefa);

    cy.get('[data-cy=btnExcluir]')
      .click();

    cy.get('[data-cy=btnConfirmar]')
      .click();

    cy.wait(300);

    cy.contains('Nenhuma tarefa cadastrada');
  });
})
