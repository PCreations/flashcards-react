import { getTestBoxesData } from '../../src/__tests__/data/boxes';

describe('When the user is logged in', () => {
  context('the user has no boxes yet', () => {
    it('should see the empty state screen and a button to add a new box', () => {
      cy.server();
      cy.stubBoxesRequest([], 'getBoxes');
      cy.visit('/');
      cy.login();
      cy.wait('@getBoxes');
      cy.contains('No flashcards box yet');
      cy.contains('Create a new box and it will show up here.');
      cy.getByLabelText(/create a new box/i).should('be.visible');
    });
  });
  context('the user has some boxes', () => {
    it('should see the list of its boxes with their respective number of flashcards and archived flashcards and a button to add a new box', () => {
      const boxes = getTestBoxesData();
      cy.server();
      cy.stubBoxesRequest(boxes, 'getBoxes');
      cy.visit('/');
      cy.login();
      cy.contains('loading');
      cy.wait('@getBoxes');
      cy.contains('Select a box');
      cy.assertAllBoxesAreInList(boxes);
      cy.getByLabelText(/create a new box/i).should('be.visible');
    });
  });
});
