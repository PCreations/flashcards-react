import { BoxesState, BoxesEventTypes, BOXES_FETCHING_STARTED, BOXES_RECEIVED } from './types';

const initialState: BoxesState = {
  loading: false,
  data: {},
};

export const boxesReducer = (state = initialState, event?: BoxesEventTypes) => {
  if (!event) return state;
  if (event.type === BOXES_FETCHING_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }
  if (event.type === BOXES_RECEIVED) {
    return {
      ...state,
      loading: false,
      data: event.payload.boxes.reduce(
        (boxes, box) => ({
          ...boxes,
          [box.id]: box,
        }),
        {},
      ),
    };
  }
};
