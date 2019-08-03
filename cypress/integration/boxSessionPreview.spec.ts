import { getTestBoxesData } from '../../src/__tests__/data/boxes';

it('should see a box session preview when clicking on a box in the boxes screen', () => {
  const boxes = getTestBoxesData();
  const expectedNumberOfFlashcardsToReviewToday = 7;
  cy.server();
  cy.stubBoxesRequest(boxes, 'boxesRequest');
  cy.route({
    method: 'GET',
    url: `/boxes/sessionPreview?boxName=${boxes[0].boxName.replace(/\s/g, '+')}`,
    status: 200,
    response: {
      ...boxes[0],
      flashcardsToReview: expectedNumberOfFlashcardsToReviewToday,
    },
  }).as('boxSessionPreviewRequest');
  cy.visit('/');
  cy.login();
  cy.wait('@boxesRequest');
  cy.getByText(boxes[0].boxName).click();
  cy.assertCurrentUrlIsBoxSessionPreviewUrl(boxes[0].boxName);
  cy.wait('@boxSessionPreviewRequest');
  cy.getByText(boxes[0].boxName).should('exist');
  cy.getByText(`${boxes[0].totalFlashcards} flashcards`).should('exist');
  cy.getByText(`${boxes[0].archivedFlashcards} archived`).should('exist');
  cy.getByText(`${expectedNumberOfFlashcardsToReviewToday} flashcards to review today`).should('exist');
  cy.getByText(/start the session/i).should('exist');
  cy.getByText(/add a new flashcard in this box/i).should('exist');
});
