import { getTestBoxesData } from '../../src/__tests__/data/boxes';

it('should see a box session preview when clicking on a box in the boxes screen', () => {
  const boxes = getTestBoxesData();
  const expectedNumberOfFlashcardsToReviewToday = 7;
  cy.server();
  cy.stubBoxesRequest(boxes, 'boxesRequest');
  cy.route({
    method: 'GET',
    url: `/boxes/sessionPreview?boxName=${boxes[0].boxName}`,
    status: 200,
    response: {
      ...boxes[0],
      numberOfFlashcardsToReviewRoday: expectedNumberOfFlashcardsToReviewToday,
    },
  }).as('boxSessionPreviewRequest');
  cy.visit('/');
  cy.login();
  cy.wait('@boxesRequest');
  cy.getByText(boxes[0].boxName).click();
  cy.assertCurrentUrlIsBoxSessionPreviewUrl(boxes[0].boxName);
  cy.wait('@boxSessionPreviewRequest');
  cy.getByTestId('boxName').should('have.text', boxes[0].boxName);
  cy.getByTestId('totalFlashcards').should('have.text', boxes[0].totalFlashcards);
  cy.getByTestId('archivedFlashcards').should('have.text', boxes[0].archivedFlashcards);
  cy.getByTestId('numberOfFlashcardsToReviewRoday').should(
    'have.text',
    expectedNumberOfFlashcardsToReviewToday,
  );
  cy.getByLabelText('startTheSession').should('exist');
  cy.getByLabelText('addFlashcard').should('exist');
});
