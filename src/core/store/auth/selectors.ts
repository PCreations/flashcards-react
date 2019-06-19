import { FlashcardsAppState } from '..';

export const isUserAuthenticated = (state: FlashcardsAppState) => state.auth.isUserAuthenticated;

export const getAuthenticatedUserId = (state: FlashcardsAppState) => state.auth.userId;

export const getAuthenticationProcessStatus = (state: FlashcardsAppState) => state.auth.processStatus;
