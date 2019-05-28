import { authReducer } from './auth/reducers';
import { combineReducers, createStore as createReduxStore } from 'redux';

export const rootReducer = combineReducers({
  auth: authReducer,
});

export type FlashcardsAppState = ReturnType<typeof rootReducer>;

export const createStore = () => createReduxStore(rootReducer);

export type FlashcardsAppStore = ReturnType<typeof createStore>;
