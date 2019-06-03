import { FlashcardsAppState } from '..';

export const getBoxes = (state: FlashcardsAppState) => Object.values(state.boxes.data);

export const getBoxesRequestStatus = (state: FlashcardsAppState) => state.boxes.boxesRequestStatus;
