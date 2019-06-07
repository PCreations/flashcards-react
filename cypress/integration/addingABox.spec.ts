describe('adding a box', () => {
  it('should fill the form and see the new box in the list after submitting it', () => {
    const boxes = [
      {
        id: 'box1',
        boxName: 'Capitals of the World',
        totalFlashcards: 50,
        archivedFlashcards: 20,
      },
      {
        id: 'box2',
        boxName: 'Some other box',
        totalFlashcards: 40,
        archivedFlashcards: 0,
      },
      {
        id: 'box3',
        boxName: 'Some other box 2',
        totalFlashcards: 75,
        archivedFlashcards: 50,
      },
    ];
    const expectedNewBox = {
      id: 'box4',
      boxName: 'My New Awesome Box',
      totalFlashcards: 1,
      archivedFlashcards: 0,
    };
    cy.server();
    cy.route({
      method: 'GET',
      url: '/boxes/',
      response: boxes,
    });
    cy.route({
      method: 'PUT',
      url: '/boxes/addFlashcardInBox/',
      status: 201,
    }).as('putAddFlashcardInBox');

    cy.visit('/newBox');
    cy.login();
    cy.getByText(/create a new box/i).click();
    cy.getByLabelText(/name of the box/i).type('My New Awesome Box');
    cy.getByText(/add a first flashcard in the box/i).should('be.visible');
    cy.getByLabelText(/flashcard's question/i).type('some question');
    cy.getByLabelText(/flashcard's answer/i).type('some answer');
    cy.getByText(/create this box/i).click();
    cy.wait('@putAddFlashcardInBox')
      .its('requestBody')
      .should('deep.equal', {
        boxName: 'My New Awesome Box',
        flashcard: {
          question: 'some question',
          answer: 'some answer',
        },
      });
    cy.getByLabelText(/name of the box/i).should('not.be.visible');
    cy.getByText(/add a first flashcard in the box/i).should('not.be.visible');
    cy.getByLabelText(/flashcard's question/i).should('not.be.visible');
    cy.getByLabelText(/flashcard's answer/i).should('not.be.visible');
    cy.getByText(/create this box/i).should('not.be.visible');

    cy.route({
      method: 'GET',
      url: '/boxes/',
      response: boxes.concat(expectedNewBox),
    });
    cy.getAllByTestId('boxName')
      .first()
      .should('have.text', 'My New Awesome Box');
    cy.getAllByTestId('boxFlashcardsTotal')
      .first()
      .should('have.text', '1');
  });
});
