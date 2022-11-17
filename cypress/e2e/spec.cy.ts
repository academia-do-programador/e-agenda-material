describe('Primeiro Acesso do Usuário', () => {

  it('Deve redirecionar para autenticação', () => {
    // Arrange
    cy.visit('/');
    // Act
    cy.wait(100);
    // Assert
    cy.url().should('contain', 'conta/autenticar');
  });
})
