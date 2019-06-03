import { authReducer } from './auth/reducers';
import { combineReducers, createStore as createReduxStore, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk';
import { boxesReducer } from './boxes/reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  boxes: boxesReducer,
});

export type FlashcardsAppState = ReturnType<typeof rootReducer>;

type FetchedBoxData = {
  id: string;
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
};

export type FlashcardsAppDependencies = {
  fetchBoxes: () => Promise<FetchedBoxData[]>;
  signIn: () => Promise<{ userId: string }>;
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

export const createStore = ({ fetchBoxes, signIn }: FlashcardsAppDependencies) =>
  createReduxStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument({ fetchBoxes, signIn }) as FlashcardsThunkMiddleware),
  );

export type FlashcardsAppStore = ReturnType<typeof createStore>;
