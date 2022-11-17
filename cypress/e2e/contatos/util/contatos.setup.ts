class ContatosSetup {
  obterFormRegistro() {
    return {
      nome: () => cy.get('[data-cy=txtNome]'),
      telefone: () => cy.get('[data-cy=txtTelefone]'),
      email: () => cy.get('[data-cy=txtEmail]'),
      empresa: () => cy.get('[data-cy=txtEmpresa]'),
      cargo: () => cy.get('[data-cy=txtCargo]'),
      btnGravar: () => cy.get('[data-cy=btnConfirmar]'),
    }
  }

  public inserirContato(
  ) {
    const form = this.obterFormRegistro();

    cy.visit('/contatos/listar');

    cy.get('[data-cy=btnAdicionar]')
      .click();

    form.nome()
      .type('Contato Teste');

    form.telefone()
      .type('49 99805-2235');

    form.email()
      .type('testador@cypress.com');

    form.empresa()
      .type('Academia do Programador');

    form.cargo()
      .type('Testador');

    form.btnGravar()
      .click();
  }
}

export default new ContatosSetup();
