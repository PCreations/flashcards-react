import { FlashcardsAppState } from '..';

export const getBoxes = (state: FlashcardsAppState) => state.boxes.data.toList();

export const getBoxesRequestStatus = (state: FlashcardsAppState) => state.boxes.boxesRequestStatus;
