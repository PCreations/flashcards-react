import { List } from 'immutable';
import { FlashcardsThunkAction } from '..';
import { Box } from './types';

export enum BoxesActionTypes {
  BOXES_REQUEST_STARTED = '[boxes] the boxes request has started',
  BOXES_REQUEST_SUCCEEDED = '[boxes] the boxes request has succeeded',
  BOXES_REQUEST_FAILED = '[boxes] the boxes request has failed',
}

export const boxesRequestStarted = () => ({
  type: BoxesActionTypes.BOXES_REQUEST_STARTED as BoxesActionTypes.BOXES_REQUEST_STARTED,
});

export const boxesRequestSucceeded = ({ boxes }: { boxes: List<Box> }) => ({
  type: BoxesActionTypes.BOXES_REQUEST_SUCCEEDED as BoxesActionTypes.BOXES_REQUEST_SUCCEEDED,
  payload: {
    boxes,
  },
});

export const boxesRequestFailed = ({ error }: { error: string }) => ({
  type: BoxesActionTypes.BOXES_REQUEST_FAILED as BoxesActionTypes.BOXES_REQUEST_FAILED,
  payload: {
    error,
  },
});

export const fetchBoxes = (): FlashcardsThunkAction => async (dispatch, _, deps) => {
  dispatch(boxesRequestStarted());
  try {
    const boxes = await deps.fetchBoxes();
    dispatch(boxesRequestSucceeded({ boxes: List(boxes.map(Box)) }));
  } catch (err) {
    dispatch(boxesRequestFailed({ error: err.message }));
  }
};
