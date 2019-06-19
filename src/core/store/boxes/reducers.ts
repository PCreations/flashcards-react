import { Record, Map } from 'immutable';
import { BoxesActionTypes, boxesRequestStarted, boxesRequestSucceeded, boxesRequestFailed } from './actions';
import { Box } from './types';

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

type BoxesStateProps = {
  data: Map<Box['boxName'], Box>;
  boxesRequestStatus: BoxesRequestStatus;
};

export const BoxesState = Record<BoxesStateProps>({
  data: Map(),
  boxesRequestStatus: BoxesRequestStatus(),
});

export type BoxesState = ReturnType<typeof BoxesState>;

type HandledActions =
  | ReturnType<typeof boxesRequestStarted>
  | ReturnType<typeof boxesRequestSucceeded>
  | ReturnType<typeof boxesRequestFailed>;

export const boxesReducer = (state = BoxesState(), action?: HandledActions): BoxesState => {
  if (!action) return state;
  switch (action.type) {
    case BoxesActionTypes.BOXES_REQUEST_STARTED:
      return state.setIn(['boxesRequestStatus', 'status'], BoxesRequestStatusEnum.PENDING);
    case BoxesActionTypes.BOXES_REQUEST_SUCCEEDED:
      return state
        .setIn(['boxesRequestStatus', 'status'], BoxesRequestStatusEnum.SUCCEEDED)
        .set('data', Map(action.payload.boxes.map(box => [box.boxName, box])));
    case BoxesActionTypes.BOXES_REQUEST_FAILED:
      return state.set(
        'boxesRequestStatus',
        BoxesRequestStatus({
          status: BoxesRequestStatusEnum.FAILED,
          error: action.payload.error,
        }),
      );
  }
  return state;
};
