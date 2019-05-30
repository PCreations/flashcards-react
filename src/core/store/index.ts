import { authReducer } from './auth/reducers';
import { combineReducers, createStore as createReduxStore, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
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
};

export const createStore = ({ fetchBoxes }: FlashcardsAppDependencies) =>
  createReduxStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument({ fetchBoxes }) as ThunkMiddleware<
      FlashcardsAppState,
      AnyAction,
      FlashcardsAppDependencies
    >),
  );

export type FlashcardsAppStore = ReturnType<typeof createStore>;
