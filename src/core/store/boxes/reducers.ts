import { BoxesActionTypes, boxesRequestStarted, boxesRequestSucceeded, boxesRequestFailed } from './actions';
import { Box } from './types';

type BoxMap = {
  [key: string]: Box;
};

export enum BoxesRequestStatusEnum {
  NEVER_STARTED,
  PENDING,
  SUCCEEDED,
  FAILED,
}

type BoxesRequestStatus = {
  status: BoxesRequestStatusEnum;
  error?: string;
};

type BoxesState = {
  data: BoxMap;
  boxesRequestStatus: BoxesRequestStatus;
};

const initialState: BoxesState = {
  data: {},
  boxesRequestStatus: {
    status: BoxesRequestStatusEnum.NEVER_STARTED,
  },
};

type HandledActions =
  | ReturnType<typeof boxesRequestStarted>
  | ReturnType<typeof boxesRequestSucceeded>
  | ReturnType<typeof boxesRequestFailed>;

export const boxesReducer = (state = initialState, action: HandledActions): BoxesState => {
  switch (action.type) {
    case BoxesActionTypes.BOXES_REQUEST_STARTED:
      return {
        ...state,
        boxesRequestStatus: {
          status: BoxesRequestStatusEnum.PENDING,
        },
      };
    case BoxesActionTypes.BOXES_REQUEST_SUCCEEDED:
      return {
        ...state,
        data: action.payload.boxes.reduce(
          (boxes, box) => ({
            ...boxes,
            [box.id]: box,
          }),
          {},
        ),
        boxesRequestStatus: {
          status: BoxesRequestStatusEnum.SUCCEEDED,
        },
      };
    case BoxesActionTypes.BOXES_REQUEST_FAILED:
      return {
        ...state,
        boxesRequestStatus: {
          status: BoxesRequestStatusEnum.FAILED,
          error: action.payload.error,
        },
      };
  }
  return state;
};
