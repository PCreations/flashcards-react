import { Map, Record } from 'immutable';
import { boxesRequestSucceeded, addBoxRequestStarted, BoxesActionTypes } from '../actions';

type BoxProps = {
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
  optimistic?: boolean;
};

export const Box = Record<BoxProps>({
  boxName: '',
  totalFlashcards: 0,
  archivedFlashcards: 0,
  optimistic: false,
});

export type Box = ReturnType<typeof Box>;

export type Data = Map<Box['boxName'], Box>;

const Data = (data?: Data) => data || Map<Box['boxName'], Box>();

export type HandledActions =
  | ReturnType<typeof boxesRequestSucceeded>
  | ReturnType<typeof addBoxRequestStarted>;

export const reducer = (data = Data(), action?: HandledActions): Data => {
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
