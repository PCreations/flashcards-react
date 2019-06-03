import 'cypress-testing-library/add-commands';
import { FlashcardsAppStore } from '../../src/core/store';
import { userAuthenticated } from '../../src/core/store/auth/actions';
declare global {
  namespace Cypress {
    interface Chainable {
      login: () => void;
    }
  }
  interface Window {
    FlashcardsAppStore: FlashcardsAppStore;
  }
}
Cypress.Commands.add('login', () => {
  cy.window()
    .its('FlashcardsAppStore')
    .then(store => {
      store.subscribe(() => console.log({ state: store.getState() }));
      store.dispatch(userAuthenticated({ userId: '42' }));
    });
});
