import { Map, Record } from 'immutable';
import { Box } from '../types';
import {
  boxesRequestSucceeded,
  addBoxRequestStarted,
  boxSessionPreviewRequestStarted,
  boxSessionPreviewRequestSucceeded,
  boxSessionPreviewRequestFailed,
  BoxesActionTypes,
} from '../actions';

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

type BoxSessionPreviewRequestStatus = ReturnType<typeof BoxSessionPreviewRequestStatus>;

type SessionsPreviewRequests = Map<Box['boxName'], BoxSessionPreviewRequestStatus>;

const SessionsPreviewRequests = (sessionsPreviewRequests?: SessionsPreviewRequests) =>
  sessionsPreviewRequests || Map<Box['boxName'], BoxSessionPreviewRequestStatus>();

export type HandledActions =
  | ReturnType<typeof boxesRequestSucceeded>
  | ReturnType<typeof addBoxRequestStarted>
  | ReturnType<typeof boxSessionPreviewRequestStarted>
  | ReturnType<typeof boxSessionPreviewRequestSucceeded>
  | ReturnType<typeof boxSessionPreviewRequestFailed>;

export const sessionsPreviewRequestsReducer = (
  sessionsPreviewRequests = SessionsPreviewRequests(),
  action?: HandledActions,
): SessionsPreviewRequests => {
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
