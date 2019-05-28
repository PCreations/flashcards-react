describe('When the user is not logged in', () => {
  it('should see the name of the app and a button to sign in with github', () => {
    cy.visit('/');
    cy.contains('Flashcard');
    cy.get('button[data-testid=signInWithGithub]').contains('Sign in with Github');
  });
});
