describe('When the user is logged in', () => {
  context('the user has no boxes yet', () => {
    it('should see the empty state screen and a button to add a new box', () => {
      const userId = `user-${Math.random()}`;
      cy.login({ userId });
      cy.visit('/');
      cy.contains('No flashcards box yet !');
      cy.get('button[data-testid=createBox]').should('be.visible');
    });
  });
});
