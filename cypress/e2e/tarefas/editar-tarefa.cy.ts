import tarefasSetup from "./util/tarefas.setup";

describe('EditarTarefaComponent', () => {
  const form = tarefasSetup.obterFormRegistro();

  beforeEach(() => {
    cy.limparDados();
    cy.registrar();

    cy.contains('a', 'Tarefas')
      .click();
  });

  it('Deve selecionar tarefa corretamente', () => {
    tarefasSetup.inserirTarefa('Teste de Edição', 'Normal');

    cy.get('[data-cy=btnEditar]')
      .click();

    form.titulo().should('contain.value', 'Teste de Edição');
    form.prioridade().should('contain.text', 'Normal');
  });

  it('Deve editar tarefa corretamente', () => {
    tarefasSetup.inserirTarefa('Teste de Edição', 'Normal');

    cy.get('[data-cy=btnEditar]')
      .click();

    form.titulo()
      .type(' Editado');

    form.prioridade()
      .click()
      .contains('Alta')
      .click();

    form.btnGravar()
      .click();

    cy.contains('Teste de Edição Editado');
    cy.contains('Altíssima');

    cy.contains('Tarefa "Teste de Edição Editado" editada com sucesso!');
  })
})
