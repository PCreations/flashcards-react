import { FlashcardsAppState } from '..';

export const isUserAuthenticated = (state: FlashcardsAppState) => state.auth.isUserAuthenticated;

export const getAuthenticatedUserId = (state: FlashcardsAppState) => state.auth.userId;
