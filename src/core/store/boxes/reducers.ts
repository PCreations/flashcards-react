import { Record, Map } from 'immutable';
import {
  BoxesActionTypes,
  boxesRequestStarted,
  boxesRequestSucceeded,
  boxesRequestFailed,
  addBoxRequestStarted,
  addBoxRequestFailed,
  addBoxRequestSucceeded,
  boxSessionPreviewRequestStarted,
  boxSessionPreviewRequestSucceeded,
  boxSessionPreviewRequestFailed,
} from './actions';
import { Box, Session } from './types';

export enum BoxesRequestStatusEnum {
  NEVER_STARTED,
  PENDING,
  SUCCEEDED,
  FAILED,
}

type BoxesRequestStatusProps = {
  status: BoxesRequestStatusEnum;
  error?: string;
};

const BoxesRequestStatus = Record<BoxesRequestStatusProps>({
  status: BoxesRequestStatusEnum.NEVER_STARTED,
  error: undefined,
});

type BoxesRequestStatus = ReturnType<typeof BoxesRequestStatus>;

export enum AddBoxRequestStatusEnum {
  NEVER_STARTED,
  SUCCEEDED,
  FAILED_WITH_UNKNOWN_ERROR,
}

type AddBoxRequestStatusProps = {
  status: AddBoxRequestStatusEnum;
  error?: string;
};

const AddBoxRequestStatus = Record<AddBoxRequestStatusProps>({
  status: AddBoxRequestStatusEnum.NEVER_STARTED,
  error: undefined,
});

type AddBoxRequestStatus = ReturnType<typeof AddBoxRequestStatus>;

export enum BoxSessionPreviewRequestStatusEnum {
  NEVER_STARTED,
  PENDING,
  SUCCEEDED,
  FAILED,
}

type BoxSessionPreviewRequestStatusProps = {
  status: BoxSessionPreviewRequestStatusEnum;
  error?: string;
};

export const BoxSessionPreviewRequestStatus = Record<BoxSessionPreviewRequestStatusProps>({
  status: BoxSessionPreviewRequestStatusEnum.NEVER_STARTED,
  error: undefined,
});

export type BoxSessionPreviewRequestStatus = ReturnType<typeof BoxSessionPreviewRequestStatus>;

type BoxesStateProps = {
  data: Map<Box['boxName'], Box>;
  sessions: Map<Box['boxName'], Session>;
  sessionsPreviewRequests: Map<Box['boxName'], BoxSessionPreviewRequestStatus>;
  boxesRequestStatus: BoxesRequestStatus;
  addBoxRequestStatus: AddBoxRequestStatus;
};

export const BoxesState = Record<BoxesStateProps>({
  data: Map(),
  sessions: Map(),
  sessionsPreviewRequests: Map(),
  boxesRequestStatus: BoxesRequestStatus(),
  addBoxRequestStatus: AddBoxRequestStatus(),
});

export type BoxesState = ReturnType<typeof BoxesState>;

type HandledActions =
  | ReturnType<typeof boxesRequestStarted>
  | ReturnType<typeof boxesRequestSucceeded>
  | ReturnType<typeof boxesRequestFailed>
  | ReturnType<typeof addBoxRequestStarted>
  | ReturnType<typeof addBoxRequestFailed>
  | ReturnType<typeof addBoxRequestSucceeded>
  | ReturnType<typeof boxSessionPreviewRequestStarted>
  | ReturnType<typeof boxSessionPreviewRequestSucceeded>
  | ReturnType<typeof boxSessionPreviewRequestFailed>;

const dataReducer = (data: BoxesState['data'], action?: HandledActions): BoxesState['data'] => {
  if (!action) return data;
  switch (action.type) {
    case BoxesActionTypes.BOXES_REQUEST_SUCCEEDED:
      return Map(action.payload.boxes.map(box => [box.boxName, box]));
    case BoxesActionTypes.ADD_BOX_REQUEST_STARTED:
      return data.set(
        action.payload.boxName,
        Box({
          boxName: action.payload.boxName,
          archivedFlashcards: 0,
          totalFlashcards: 1,
          optimistic: true,
        }),
      );
  }
  return data;
};

const sessionsReducer = (
  sessions: BoxesState['sessions'],
  action?: HandledActions,
): BoxesState['sessions'] => {
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

const sessionsPreviewRequestsReducer = (
  sessionsPreviewRequests: BoxesState['sessionsPreviewRequests'],
  action?: HandledActions,
): BoxesState['sessionsPreviewRequests'] => {
  if (!action) return sessionsPreviewRequests;
  switch (action.type) {
    case BoxesActionTypes.BOXES_REQUEST_SUCCEEDED:
      return Map(action.payload.boxes.map(box => [box.boxName, BoxSessionPreviewRequestStatus()]));
    case BoxesActionTypes.ADD_BOX_REQUEST_STARTED:
      return sessionsPreviewRequests.set(
        action.payload.boxName,
        BoxSessionPreviewRequestStatus({
          status: BoxSessionPreviewRequestStatusEnum.NEVER_STARTED,
        }),
      );
    case BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_STARTED:
      return sessionsPreviewRequests.update(action.payload.boxName, boxSessionPreviewRequest =>
        boxSessionPreviewRequest.set('status', BoxSessionPreviewRequestStatusEnum.PENDING),
      );
    case BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_SUCCEEDED:
      return sessionsPreviewRequests.update(action.payload.sessionPreview.boxName, boxSessionPreviewRequest =>
        boxSessionPreviewRequest.set('status', BoxSessionPreviewRequestStatusEnum.SUCCEEDED),
      );
    case BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_FAILED:
      return sessionsPreviewRequests.set(
        action.payload.boxName,
        BoxSessionPreviewRequestStatus({
          status: BoxSessionPreviewRequestStatusEnum.FAILED,
          error: action.payload.error,
        }),
      );
  }
  return sessionsPreviewRequests;
};

const boxesRequestStatusReducer = (
  boxesRequestStatus: BoxesState['boxesRequestStatus'],
  action?: HandledActions,
): BoxesState['boxesRequestStatus'] => {
  if (!action) return boxesRequestStatus;
  switch (action.type) {
    case BoxesActionTypes.BOXES_REQUEST_STARTED:
      return boxesRequestStatus.set('status', BoxesRequestStatusEnum.PENDING);
    case BoxesActionTypes.BOXES_REQUEST_SUCCEEDED:
      return boxesRequestStatus.set('status', BoxesRequestStatusEnum.SUCCEEDED);
    case BoxesActionTypes.BOXES_REQUEST_FAILED:
      return BoxesRequestStatus({
        status: BoxesRequestStatusEnum.FAILED,
        error: action.payload.error,
      });
  }
  return boxesRequestStatus;
};

const addBoxRequestStatusReducer = (
  addBoxRequestStatus: BoxesState['addBoxRequestStatus'],
  action?: HandledActions,
): BoxesState['addBoxRequestStatus'] => {
  if (!action) return addBoxRequestStatus;
  switch (action.type) {
    case BoxesActionTypes.ADD_BOX_REQUEST_SUCCEEDED:
      return addBoxRequestStatus.set('status', AddBoxRequestStatusEnum.SUCCEEDED);
    case BoxesActionTypes.ADD_BOX_REQUEST_FAILED:
      return AddBoxRequestStatus({
        status: AddBoxRequestStatusEnum.FAILED_WITH_UNKNOWN_ERROR,
        error: action.error,
      });
  }
  return addBoxRequestStatus;
};

export const boxesReducer = (state = BoxesState(), action?: HandledActions): BoxesState =>
  BoxesState({
    data: dataReducer(state.data, action),
    sessions: sessionsReducer(state.sessions, action),
    sessionsPreviewRequests: sessionsPreviewRequestsReducer(state.sessionsPreviewRequests, action),
    boxesRequestStatus: boxesRequestStatusReducer(state.boxesRequestStatus, action),
    addBoxRequestStatus: addBoxRequestStatusReducer(state.addBoxRequestStatus, action),
  });
