import { Map } from 'immutable';
import { Box, Session } from '../types';
import { boxSessionPreviewRequestSucceeded, BoxesActionTypes } from '../actions';

type Sessions = Map<Box['boxName'], Session>;

const Sessions = (sessions?: Sessions) => sessions || Map<Box['boxName'], Session>();

export type HandledActions = ReturnType<typeof boxSessionPreviewRequestSucceeded>;

export const sessionsReducer = (sessions = Sessions(), action?: HandledActions): Sessions => {
  if (!action) return sessions;
  switch (action.type) {
    case BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_SUCCEEDED:
      return sessions.set(
        action.payload.sessionPreview.boxName,
        Session({
          boxName: action.payload.sessionPreview.boxName,
          flashcardsToReview: action.payload.sessionPreview.flashcardsToReview,
        }),
      );
  }
  return sessions;
};
