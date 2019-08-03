import { List, Record } from 'immutable';
import { FlashcardsThunkAction } from '..';
import { Box, FetchedSessionPreviewData } from './types';

export enum BoxesActionTypes {
  BOXES_REQUEST_STARTED = '[boxes] the boxes request has started',
  BOXES_REQUEST_SUCCEEDED = '[boxes] the boxes request has succeeded',
  BOXES_REQUEST_FAILED = '[boxes] the boxes request has failed',
  ADD_BOX_REQUEST_STARTED = '[boxes] an add box request has started',
  ADD_BOX_REQUEST_SUCCEEDED = '[boxes] an add box request has succeeded',
  ADD_BOX_REQUEST_FAILED = '[boxes] an add box request has failed',
  BOX_SESSION_PREVIEW_REQUEST_STARTED = '[boxes] a box session preview request has started',
  BOX_SESSION_PREVIEW_REQUEST_SUCCEEDED = '[boxes] a box session preview request has succeeded',
  BOX_SESSION_PREVIEW_REQUEST_FAILED = '[boxes] a box session preview request has failed',
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

export const addBoxRequestFailed = ({ error }: { error: string }) => ({
  type: BoxesActionTypes.ADD_BOX_REQUEST_FAILED as BoxesActionTypes.ADD_BOX_REQUEST_FAILED,
  error,
});

type BoxSessionProps = {
  boxName: string;
  flashcardsToReview: number;
};

export const BoxSession = Record<BoxSessionProps>({
  boxName: '',
  flashcardsToReview: 0,
});

export type BoxSession = ReturnType<typeof BoxSession>;

export const boxSessionPreviewRequestStarted = ({ boxName }: { boxName: string }) => ({
  type: BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_STARTED as BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_STARTED,
  payload: {
    boxName,
  },
});

export const boxSessionPreviewRequestSucceeded = ({
  sessionPreview,
}: {
  sessionPreview: FetchedSessionPreviewData;
}) => ({
  type: BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_SUCCEEDED as BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_SUCCEEDED,
  payload: {
    sessionPreview,
  },
});

export const boxSessionPreviewRequestFailed = ({ boxName, error }: { boxName: string; error: string }) => ({
  type: BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_FAILED as BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_FAILED,
  payload: {
    boxName,
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
  } catch (err) {
    dispatch(
      addBoxRequestFailed({
        error: `An error occured while creating the "${boxName}" box. Please retry later`,
      }),
    );
  }
};

export const fetchSessionPreview = ({ boxName }: { boxName: string }): FlashcardsThunkAction => async (
  dispatch,
  _,
  deps,
) => {
  dispatch(boxSessionPreviewRequestStarted({ boxName }));
  try {
    const sessionPreview = await deps.fetchSessionPreview({ boxName });
    dispatch(boxSessionPreviewRequestSucceeded({ sessionPreview }));
  } catch (err) {
    dispatch(boxSessionPreviewRequestFailed({ boxName, error: err.message }));
  }
};
