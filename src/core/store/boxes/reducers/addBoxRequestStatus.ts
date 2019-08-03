import { Record } from 'immutable';
import { BoxesActionTypes, addBoxRequestSucceeded, addBoxRequestFailed } from '../actions';

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

export type HandledActions =
  | ReturnType<typeof addBoxRequestSucceeded>
  | ReturnType<typeof addBoxRequestFailed>;

export const addBoxRequestStatusReducer = (
  addBoxRequestStatus = AddBoxRequestStatus(),
  action?: HandledActions,
): AddBoxRequestStatus => {
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
