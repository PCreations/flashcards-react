import { getTestBoxesData } from '../../src/__tests__/data/boxes';

describe('adding a box', () => {
  it('should fill the form and see the new box in the list after submitting it when everything goes right on the server', () => {
    const boxes = getTestBoxesData();
    const expectedNewBox = {
      boxName: 'My New Awesome Box',
      totalFlashcards: 1,
      archivedFlashcards: 0,
    };
    cy.server();
    cy.stubBoxesRequest(boxes, 'boxesRequest');
    cy.route({
      method: 'PUT',
      url: '/boxes/addFlashcardInBox/',
      status: 201,
      response: [],
    }).as('putAddFlashcardInBox');
    cy.visit('/');
    cy.login();
    cy.wait('@boxesRequest');
    cy.getByText(/^create a new box$/i).click();
    cy.assertCurrentUrlIsNewBoxUrl();
    cy.submitNewBoxFormWithValues({
      boxName: 'My New Awesome Box',
      question: 'some question',
      answer: 'some answer',
    });
    cy.assertNewBoxFormIsNotVisible();
    cy.assertCurrentUrlIsHomeUrl();
    cy.wait('@putAddFlashcardInBox')
      .its('requestBody')
      .should('deep.equal', {
        boxName: 'My New Awesome Box',
        flashcard: {
          question: 'some question',
          answer: 'some answer',
        },
      });
    cy.stubBoxesRequest(boxes.concat(expectedNewBox));
    cy.getAllByTestId('boxName')
      .last()
      .should('have.text', 'My New Awesome Box');
    cy.getAllByTestId('boxFlashcardsTotal')
      .last()
      .should('have.text', '1');
  });
  it('should show an error message when the server sends an error', () => {
    const boxes = getTestBoxesData();
    cy.server();
    cy.stubBoxesRequest(boxes, 'boxesRequest');
    cy.route({
      method: 'PUT',
      url: '/boxes/addFlashcardInBox/',
      status: 500,
      response: '',
    }).as('putAddFlashcardInBox');
    cy.visit('/');
    cy.login();
    cy.wait('@boxesRequest');
    cy.getByText(/^create a new box$/i).click();
    cy.assertCurrentUrlIsNewBoxUrl();
    cy.submitNewBoxFormWithValues({
      boxName: 'My New Awesome Box',
      question: 'some question',
      answer: 'some answer',
    });
    cy.assertNewBoxFormIsNotVisible();
    cy.assertCurrentUrlIsHomeUrl();
    cy.wait('@putAddFlashcardInBox');
    cy.getAllByTestId('boxName')
      .last()
      .should('have.text', 'My New Awesome Box');
    cy.getAllByTestId('boxFlashcardsTotal')
      .last()
      .should('have.text', '1');
    cy.getByRole('addBoxError').should(
      'have.text',
      `An error occured while creating the "My New Awesome Box" box. Please retry later`,
    );
  });
});
