import { boxFetchingStarted, boxesReceived } from './events';
import { BoxesEventTypes } from './types';
import { ThunkAction } from 'redux-thunk';
import { FlashcardsAppState, FlashcardsAppDependencies } from '..';

export const fetchBoxes = (): ThunkAction<
  Promise<void>,
  FlashcardsAppState,
  FlashcardsAppDependencies,
  BoxesEventTypes
> => async (dispatch, _, deps) => {
  console.log('toto');
  dispatch(boxFetchingStarted());
  const boxes = await deps.fetchBoxes();
  console.log('boxes', boxes);
  dispatch(boxesReceived({ boxes }));
};
