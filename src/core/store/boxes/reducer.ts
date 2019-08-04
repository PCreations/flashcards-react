import { Record } from 'immutable';
import * as data from './data';
import * as sessions from './sessions';
import * as sessionsPreviewRequests from './sessionsPreviewRequests';
import * as boxesRequestStatus from './boxesRequestStatus';
import * as addBoxRequestStatus from './addBoxRequestStatus';

type BoxesStateProps = {
  data: ReturnType<typeof data.reducer>;
  sessions: ReturnType<typeof sessions.reducer>;
  sessionsPreviewRequests: ReturnType<typeof sessionsPreviewRequests.reducer>;
  boxesRequestStatus: ReturnType<typeof boxesRequestStatus.reducer>;
  addBoxRequestStatus: ReturnType<typeof addBoxRequestStatus.reducer>;
};

export const BoxesState = Record<BoxesStateProps>({
  data: data.reducer(),
  sessions: sessions.reducer(),
  sessionsPreviewRequests: sessionsPreviewRequests.reducer(),
  boxesRequestStatus: boxesRequestStatus.reducer(),
  addBoxRequestStatus: addBoxRequestStatus.reducer(),
});

export type BoxesState = ReturnType<typeof BoxesState>;

type HandledActions = data.HandledActions &
  sessions.HandledActions &
  sessionsPreviewRequests.HandledActions &
  boxesRequestStatus.HandledActions &
  addBoxRequestStatus.HandledActions;

export const reducer = (state = BoxesState(), action?: HandledActions) =>
  BoxesState({
    data: data.reducer(state.data, action),
    sessions: sessions.reducer(state.sessions, action),
    sessionsPreviewRequests: sessionsPreviewRequests.reducer(state.sessionsPreviewRequests, action),
    boxesRequestStatus: boxesRequestStatus.reducer(state.boxesRequestStatus, action),
    addBoxRequestStatus: addBoxRequestStatus.reducer(state.addBoxRequestStatus, action),
  });

export { Box } from './data';
