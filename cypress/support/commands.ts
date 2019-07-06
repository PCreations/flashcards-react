import 'cypress-testing-library/add-commands';
import { FlashcardsAppStore } from '../../src/core/store';
import { userAuthenticated } from '../../src/core/store/auth/actions';
import { RoutePath, buildUrl } from '../../src/router/state';

type BoxData = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
};

declare global {
  namespace Cypress {
    interface Chainable {
      login: () => void;
      stubBoxesRequest: (boxes: BoxData[], alias?: string) => void;
      submitNewBoxFormWithValues: (fields: { boxName: string; question: string; answer: string }) => void;
      assertCurrentUrlIsNewBoxUrl: () => void;
      assertCurrentUrlIsHomeUrl: () => void;
      assertNewBoxFormIsNotVisible: () => void;
      assertAllBoxesAreInList: (boxes: BoxData[]) => void;
      assertCurrentUrlIsBoxSessionPreviewUrl: (boxName: string) => void;
    }
  }
  interface Window {
    FlashcardsAppStore: FlashcardsAppStore;
  }
}
Cypress.Commands.add('login', () => {
  cy.window()
    .its('localStorage')
    .then(localStorage => localStorage.setItem('auth', JSON.stringify(null)));
  cy.window()
    .its('FlashcardsAppStore')
    .then(async store => {
      store.subscribe(() => console.log({ state: store.getState() }));
      await store.dispatch(userAuthenticated({ userId: '42' }));
    });
});

Cypress.Commands.add('stubBoxesRequest', (boxes: BoxData[], alias?: string) => {
  const route = {
    method: 'GET',
    url: '/boxes/',
    response: boxes,
    delay: 100,
  };
  if (alias) {
    cy.route(route).as(alias);
  } else {
    cy.route(route);
  }
});

Cypress.Commands.add('submitNewBoxFormWithValues', fields => {
  cy.getByLabelText(/name of the box/i).type(fields.boxName);
  cy.getByLabelText(/flashcard's question/i).type(fields.question);
  cy.getByLabelText(/flashcard's answer/i).type(fields.answer);
  cy.getByText(/submit the box/i).click();
});

Cypress.Commands.add('assertCurrentUrlIsNewBoxUrl', () => {
  cy.window()
    .its('location')
    .its('pathname')
    .should('eq', RoutePath.NEW_BOX);
});

Cypress.Commands.add('assertCurrentUrlIsHomeUrl', () => {
  cy.window()
    .its('location')
    .its('pathname')
    .should('eq', RoutePath.HOME);
});

Cypress.Commands.add('assertCurrentUrlIsBoxSessionPreviewUrl', boxName => {
  cy.window()
    .its('location')
    .its('pathname')
    .should('eq', buildUrl(RoutePath.SESSION_PREVIEW, { boxName }));
});

Cypress.Commands.add('assertNewBoxFormIsNotVisible', () => {
  cy.contains(/name of the box/i).should('not.exist');
  cy.contains(/flashcard's question/i).should('not.exist');
  cy.contains(/flashcard's answer/i).should('not.exist');
  cy.contains(/submit the box/i).should('not.exist');
});

Cypress.Commands.add('assertAllBoxesAreInList', (boxes: BoxData[]) => {
  cy.getAllByTestId('boxName').each((el, index) => {
    expect(el.text()).equal(boxes[index].boxName);
  });
  cy.getAllByTestId('boxFlashcardsTotal').each((el, index) => {
    expect(el.text()).equal(`${boxes[index].totalFlashcards}`);
  });
  cy.getAllByTestId('boxArchivedFlashcards').each((el, index) => {
    if (boxes[index].archivedFlashcards > 0) {
      expect(el.text()).equal(`${boxes[index].archivedFlashcards}`);
    }
  });
});
