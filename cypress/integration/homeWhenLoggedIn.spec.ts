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
  context('the user has some boxes', () => {
    it('should see the list of its boxes with their respective number of flashcards and archived flashcards', () => {
      const boxes = [
        {
          boxName: 'Capitals of the World',
          totalFlashcards: 50,
          archivedFlashcards: 20,
        },
        {
          boxName: 'Some other box',
          totalFlashcards: 40,
          archivedFlashcards: 0,
        },
        {
          boxName: 'Some other box 2',
          totalFlashcards: 75,
          archivedFlashcards: 50,
        },
      ];
      cy.server();
      cy.route({
        method: 'GET',
        url: '/boxes/',
        response: boxes,
      });
      cy.visit('/');
      cy.login();
      cy.contains('Select a box');
      cy.getAllByTestId('boxName').should('equal', boxes.map(b => b.boxName));
      cy.getAllByTestId('boxFlashcardsTotal').should('equal', boxes.map(b => b.totalFlashcards));
      cy.getAllByTestId('boxArchivedFlashcards').should('equal', boxes.map(b => b.archivedFlashcards));
    });
  });
});
