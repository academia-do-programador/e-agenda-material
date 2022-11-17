import tarefasSetup from "./util/tarefas.setup";

describe('InserirTarefaComponent', () => {
  const form = tarefasSetup.obterFormRegistro();

  beforeEach(() => {
    cy.limparDados();
    cy.registrar();

    cy.contains('a', 'Tarefas')
      .click();

    cy.get('[data-cy=btnAdicionar]').click();
  });

  it('Deve carregar a página corretamente', () => {
    cy.url().should('contain', '/tarefas/inserir');
  });

  it('Deve inserir tarefa básica', () => {
    form.titulo()
      .type('Lavar o cachorro automatizado');

    form.prioridade()
      .click()
      .contains('Baixa')
      .click();

    form.btnGravar()
      .click();

    cy.contains('Tarefa "Lavar o cachorro automatizado" cadastrada com sucesso!');
  });

  it('Deve inserir tarefa com itens', () => {
    form.titulo()
      .type('Lavar o cachorro automatizado');

    form.prioridade()
      .click()
      .contains('Baixa')
      .click();

    form.tituloItem()
      .type('Pegar o shampoo');

    form.btnAdicionarItem()
      .click();

    cy.get('[data-cy=itensTarefa]')
      .should('have.length', 1);

    form.btnGravar()
      .click();

    cy.contains('Tarefa "Lavar o cachorro automatizado" cadastrada com sucesso!');
  });

  it('Deve notificar sobre formulário inválido', () => {
    form.prioridade()
      .click()
      .contains('Baixa')
      .click();

    form.btnGravar()
      .click();

    cy.contains('Por favor, preencha o formulário corretamente.');
  })
})
