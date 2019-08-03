import { Map } from 'immutable';
import { Box } from '../types';
import { boxesRequestSucceeded, addBoxRequestStarted, BoxesActionTypes } from '../actions';

type Data = Map<Box['boxName'], Box>;

const Data = (data?: Data) => data || Map<Box['boxName'], Box>();

export type HandledActions =
  | ReturnType<typeof boxesRequestSucceeded>
  | ReturnType<typeof addBoxRequestStarted>;

export const dataReducer = (data = Data(), action?: HandledActions): Data => {
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
