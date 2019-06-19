import { createStore, FlashcardsAppDependencies, FlashcardsAppState } from '../core/store';

const defaultDeps: FlashcardsAppDependencies = {
  signIn: jest.fn(),
  fetchBoxes: jest.fn(),
  saveAuthData: jest.fn(),
  getAuthData: jest.fn(),
  addFlashcardToBox: jest.fn(),
};

export const createTestStore = (
  deps?: Partial<FlashcardsAppDependencies>,
  initialState?: FlashcardsAppState,
) =>
  createStore(
    deps ? Object.assign(defaultDeps, deps) : defaultDeps,
    initialState ? initialState : FlashcardsAppState(),
  );
