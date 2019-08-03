import { Record } from 'immutable';
import { boxesRequestStarted, boxesRequestSucceeded, boxesRequestFailed, BoxesActionTypes } from '../actions';

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

export type HandledActions =
  | ReturnType<typeof boxesRequestStarted>
  | ReturnType<typeof boxesRequestSucceeded>
  | ReturnType<typeof boxesRequestFailed>;

export const boxesRequestStatusReducer = (
  boxesRequestStatus = BoxesRequestStatus(),
  action?: HandledActions,
): BoxesRequestStatus => {
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
