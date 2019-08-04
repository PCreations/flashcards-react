import { Map, Record } from 'immutable';
import { boxSessionPreviewRequestSucceeded, BoxesActionTypes } from '../actions';

type SessionProps = {
  boxName: string;
  flashcardsToReview: number;
};

export const Session = Record<SessionProps>({
  boxName: '',
  flashcardsToReview: 0,
});

export type Session = {
  boxName: string;
  flashcardsToReview: number;
};

export type Sessions = Map<string, Session>;

const Sessions = (sessions?: Sessions) => sessions || Map<string, Session>();

export type HandledActions = ReturnType<typeof boxSessionPreviewRequestSucceeded>;

export const reducer = (sessions = Sessions(), action?: HandledActions): Sessions => {
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
