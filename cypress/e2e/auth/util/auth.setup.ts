class AuthSetup {
  obterFormRegistro() {
    return {
      nome: () => cy.get('[data-cy=txtNome]'),
      email: () => cy.get('[data-cy=txtEmail]'),
      senha: () => cy.get('[data-cy=txtSenha]'),
      confirmarSenha: () => cy.get('[data-cy=txtConfirmarSenha]'),
      btnRegistrar: () => cy.get('[data-cy=btnRegistrar]'),
    }
  }

  obterFormLogin() {
    return {
      email: () => cy.get('[data-cy=txtEmail]'),
      senha: () => cy.get('[data-cy=txtSenha]'),
      btnEntrar: () => cy.get('[data-cy=btnEntrar]')
    }
  }
}

export default new AuthSetup();
