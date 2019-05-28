describe('When the user is logged in', () => {
  context('the user has no boxes yet', () => {
    it('should see the empty state screen and a button to add a new box', () => {
      cy.visit('/');
      cy.login();
      cy.contains('No flashcards box yet');
      cy.contains('Create a new box and it will show up here.');
      cy.getByLabelText(/create a new box/i).should('be.visible');
    });
  });
});
