import { FlashcardsAppState } from '..';

export const readCurrentUser = (state: FlashcardsAppState) => state.auth.currentUser;
