import { authEvents } from '../../src/core/events/authEvents';
import { FlashcardsApp } from '../../src/core/FlashcardsApp';
export {};
declare global {
  namespace Cypress {
    interface Chainable {
      login: ({ userId }: { userId: string }) => void;
    }
  }
  interface Window {
    FlashcardsApp: FlashcardsApp;
  }
}
Cypress.Commands.add('login', ({ userId }) => {
  cy.window().then(window => {
    window.FlashcardsApp.dispatch(authEvents.authenticated({ userId }));
  });
});
