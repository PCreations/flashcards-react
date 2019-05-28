describe('When the user is not logged in', () => {
  it('should see the name of the app and a button to sign in with github', () => {
    cy.visit('/');
    cy.contains('Flashcard');
    cy.getAllByLabelText(/sign in with github/i).should('be.visible');
  });
});
