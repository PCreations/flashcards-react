import { List } from 'immutable';
import { FlashcardsThunkAction } from '..';
import { Box } from './types';

export enum BoxesActionTypes {
  BOXES_REQUEST_STARTED = '[boxes] the boxes request has started',
  BOXES_REQUEST_SUCCEEDED = '[boxes] the boxes request has succeeded',
  BOXES_REQUEST_FAILED = '[boxes] the boxes request has failed',
  ADD_BOX_REQUEST_STARTED = '[boxes] an add box request has started',
  ADD_BOX_REQUEST_SUCCEEDED = '[boxes] an add box request has succeeded',
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

export const addBoxRequestStarted = ({ boxName }: { boxName: string }) => ({
  type: BoxesActionTypes.ADD_BOX_REQUEST_STARTED as BoxesActionTypes.ADD_BOX_REQUEST_STARTED,
  payload: {
    boxName,
  },
});

export const addBoxRequestSucceeded = ({ boxName }: { boxName: string }) => ({
  type: BoxesActionTypes.ADD_BOX_REQUEST_SUCCEEDED as BoxesActionTypes.ADD_BOX_REQUEST_SUCCEEDED,
  payload: {
    boxName,
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

export const addBox = ({
  boxName,
  flashcardQuestion,
  flashcardAnswer,
}: {
  boxName: string;
  flashcardQuestion: string;
  flashcardAnswer: string;
}): FlashcardsThunkAction => async (dispatch, _, deps) => {
  dispatch(addBoxRequestStarted({ boxName }));
  try {
    await deps.addFlashcardToBox({
      boxName,
      flashcard: {
        question: flashcardQuestion,
        answer: flashcardAnswer,
      },
    });
    dispatch(addBoxRequestSucceeded({ boxName }));
  } catch (err) {}
};
