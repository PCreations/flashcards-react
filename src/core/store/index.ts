import { Record } from 'immutable';
import { authReducer } from './auth/reducers';
import { AuthState } from './auth/reducers';
import { compose, createStore as createReduxStore, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk';
import { boxesReducer, BoxesState } from './boxes/reducers';

declare global {
  interface Window {
    FlashcardsAppStore: FlashcardsAppStore;
    __REDUX_DEVTOOLS_EXTENSION__?: Function;
  }
}

export const FlashcardsAppState = Record({
  auth: AuthState(),
  boxes: BoxesState(),
});

export type FlashcardsAppState = ReturnType<typeof FlashcardsAppState>;

export const rootReducer = (state = FlashcardsAppState(), action?: any) =>
  FlashcardsAppState({
    auth: authReducer(state.auth, action),
    boxes: boxesReducer(state.boxes, action),
  });

type FetchedBoxData = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
};

export type FlashcardsAppDependencies = {
  fetchBoxes: () => Promise<FetchedBoxData[]>;
  signIn: () => Promise<{ userId: string }>;
  saveAuthData: ({ userId }: { userId: string }) => Promise<boolean>;
  getAuthData: () => Promise<{ userId: string }>;
  addFlashcardToBox: ({
    boxName,
    flashcard,
  }: {
    boxName: string;
    flashcard: {
      question: string;
      answer: string;
    };
  }) => Promise<void>;
};

export type FlashcardsThunkMiddleware = ThunkMiddleware<
  FlashcardsAppState,
  AnyAction,
  FlashcardsAppDependencies
>;

export type FlashcardsThunkAction = ThunkAction<
  void,
  FlashcardsAppState,
  FlashcardsAppDependencies,
  AnyAction
>;

const devtools: any = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f: any) => f;

export const createStore = (
  { fetchBoxes, signIn, saveAuthData, getAuthData, addFlashcardToBox }: FlashcardsAppDependencies,
  initialState: FlashcardsAppState = FlashcardsAppState(),
) =>
  createReduxStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk.withExtraArgument({
        fetchBoxes,
        signIn,
        saveAuthData,
        getAuthData,
        addFlashcardToBox,
      }) as FlashcardsThunkMiddleware),
      devtools,
    ),
  );

export type FlashcardsAppStore = ReturnType<typeof createStore>;
