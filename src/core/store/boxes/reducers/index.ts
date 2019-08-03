import { dataReducer, HandledActions as DataHandledActions } from './data';
import { sessionsReducer, HandledActions as SessionsHandledActions } from './sessions';
import {
  sessionsPreviewRequestsReducer,
  HandledActions as SessionsPreviewRequestsHandledActions,
} from './sessionsPreviewRequests';
import {
  boxesRequestStatusReducer,
  HandledActions as BoxesRequestStatusHandledActions,
} from './boxesRequestStatus';
import {
  addBoxRequestStatusReducer,
  HandledActions as AddBoxRequestStatusHandledActions,
} from './addBoxRequestStatus';
import { Record } from 'immutable';

type BoxesStateProps = {
  data: ReturnType<typeof dataReducer>;
  sessions: ReturnType<typeof sessionsReducer>;
  sessionsPreviewRequests: ReturnType<typeof sessionsPreviewRequestsReducer>;
  boxesRequestStatus: ReturnType<typeof boxesRequestStatusReducer>;
  addBoxRequestStatus: ReturnType<typeof addBoxRequestStatusReducer>;
};

export const BoxesState = Record<BoxesStateProps>({
  data: dataReducer(),
  sessions: sessionsReducer(),
  sessionsPreviewRequests: sessionsPreviewRequestsReducer(),
  boxesRequestStatus: boxesRequestStatusReducer(),
  addBoxRequestStatus: addBoxRequestStatusReducer(),
});

type HandledActions = DataHandledActions &
  SessionsHandledActions &
  SessionsPreviewRequestsHandledActions &
  BoxesRequestStatusHandledActions &
  AddBoxRequestStatusHandledActions;

export const reducer = (state = BoxesState(), action?: HandledActions) =>
  BoxesState({
    data: dataReducer(state.data, action),
    sessions: sessionsReducer(state.sessions, action),
    sessionsPreviewRequests: sessionsPreviewRequestsReducer(state.sessionsPreviewRequests, action),
    boxesRequestStatus: boxesRequestStatusReducer(state.boxesRequestStatus, action),
    addBoxRequestStatus: addBoxRequestStatusReducer(state.addBoxRequestStatus, action),
  });

export {
  BoxSessionPreviewRequestStatus,
  BoxSessionPreviewRequestStatusEnum,
} from './sessionsPreviewRequests';
export { BoxesRequestStatusEnum } from './boxesRequestStatus';
export { AddBoxRequestStatusEnum } from './addBoxRequestStatus';
