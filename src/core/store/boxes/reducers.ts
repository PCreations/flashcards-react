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
import { Box, SessionPreview } from './types';

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
  sessions: Map<Box['boxName'], SessionPreview>;
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

export const boxesReducer = (state = BoxesState(), action?: HandledActions): BoxesState => {
  if (!action) return state;
  switch (action.type) {
    case BoxesActionTypes.BOXES_REQUEST_STARTED:
      return state.setIn(['boxesRequestStatus', 'status'], BoxesRequestStatusEnum.PENDING);
    case BoxesActionTypes.BOXES_REQUEST_SUCCEEDED:
      return state
        .setIn(['boxesRequestStatus', 'status'], BoxesRequestStatusEnum.SUCCEEDED)
        .set('data', Map(action.payload.boxes.map(box => [box.boxName, box])))
        .set(
          'sessions',
          Map(
            action.payload.boxes.map(box => [
              box.boxName,
              SessionPreview({
                boxName: box.boxName,
                totalFlashcards: box.totalFlashcards,
                archivedFlashcards: box.archivedFlashcards,
              }),
            ]),
          ),
        )
        .set(
          'sessionsPreviewRequests',
          Map(action.payload.boxes.map(box => [box.boxName, BoxSessionPreviewRequestStatus()])),
        );
    case BoxesActionTypes.BOXES_REQUEST_FAILED:
      return state.set(
        'boxesRequestStatus',
        BoxesRequestStatus({
          status: BoxesRequestStatusEnum.FAILED,
          error: action.payload.error,
        }),
      );
    case BoxesActionTypes.ADD_BOX_REQUEST_STARTED:
      return state
        .update('data', boxMap =>
          boxMap.set(
            action.payload.boxName,
            Box({
              boxName: action.payload.boxName,
              archivedFlashcards: 0,
              totalFlashcards: 1,
              optimistic: true,
            }),
          ),
        )
        .setIn(
          ['sessionsPreviewRequests', action.payload.boxName],
          BoxSessionPreviewRequestStatus({
            status: BoxSessionPreviewRequestStatusEnum.NEVER_STARTED,
          }),
        );
    case BoxesActionTypes.ADD_BOX_REQUEST_SUCCEEDED:
      return state.set(
        'addBoxRequestStatus',
        AddBoxRequestStatus({
          status: AddBoxRequestStatusEnum.SUCCEEDED,
          error: undefined,
        }),
      );
    case BoxesActionTypes.ADD_BOX_REQUEST_FAILED:
      return state.set(
        'addBoxRequestStatus',
        AddBoxRequestStatus({
          status: AddBoxRequestStatusEnum.FAILED_WITH_UNKNOWN_ERROR,
          error: action.error,
        }),
      );
    case BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_STARTED:
      return state.updateIn(['sessionsPreviewRequests', action.payload.boxName], boxSessionPreviewRequest =>
        boxSessionPreviewRequest.set('status', BoxSessionPreviewRequestStatusEnum.PENDING),
      );
    case BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_SUCCEEDED:
      return state
        .updateIn(
          ['sessionsPreviewRequests', action.payload.sessionPreview.boxName],
          boxSessionPreviewRequest =>
            boxSessionPreviewRequest.set('status', BoxSessionPreviewRequestStatusEnum.SUCCEEDED),
        )
        .setIn(
          ['sessions', action.payload.sessionPreview.boxName],
          SessionPreview(action.payload.sessionPreview),
        );
    case BoxesActionTypes.BOX_SESSION_PREVIEW_REQUEST_FAILED:
      return state.setIn(
        ['sessionsPreviewRequests', action.payload.boxName],
        BoxSessionPreviewRequestStatus({
          status: BoxSessionPreviewRequestStatusEnum.FAILED,
          error: action.payload.error,
        }),
      );
  }
  return state;
};
