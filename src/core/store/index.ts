import { authReducer } from './auth/reducers';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  auth: authReducer,
});

export type FlashcardsAppState = ReturnType<typeof rootReducer>;
