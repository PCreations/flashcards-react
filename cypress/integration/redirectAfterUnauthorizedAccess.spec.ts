describe('home redirection', () => {
  it('should redirect to home page if user try to directly access a page under authorization', () => {
    cy.visit('/newBox');
    cy.window()
      .its('location')
      .its('pathname')
      .should('eq', '/');
  });
});
