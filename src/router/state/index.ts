import { HandledActions as ReducerHandledActions } from './reducers';
export { Routes } from './routes';
export { routerReducer, RouterState } from './reducers';
export { changeRoute, RouterActionTypes } from './actions';
export { getCurrentRoute } from './selectors';

export type HandledActions = ReducerHandledActions;
