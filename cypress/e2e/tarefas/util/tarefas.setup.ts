class TarefasSetup {
  obterFormRegistro() {
    return {
      titulo: () => cy.get('[data-cy=txtTitulo]'),
      prioridade: () => cy.get('[data-cy=rdbPrioridade]'),
      tituloItem: () => cy.get('[data-cy=txtTituloItem]'),
      btnAdicionarItem: () => cy.get('[data-cy=btnAdicionarItem]'),
      btnRemoverItem: () => cy.get('[data-cy=btnRemoverItem]'),
      btnGravar: () => cy.get('[data-cy=btnConfirmar]'),
    }
  }

  inserirTarefa(
    titulo: string = 'Teste Automizado',
    prioridade: string = 'Alta'
  ) {
    const form = this.obterFormRegistro();

    cy.visit('/tarefas/listar');

    cy.get('[data-cy=btnAdicionar]')
      .click();

    form.titulo()
      .type(titulo);

    form.prioridade()
      .click()
      .contains(prioridade)
      .click();

    form.btnGravar()
      .click();
  }
}

export default new TarefasSetup();
