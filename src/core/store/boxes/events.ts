import { BoxesEventTypes, Box, BOXES_FETCHING_STARTED, BOXES_RECEIVED } from './types';

export const boxFetchingStarted = (): BoxesEventTypes => ({
  type: BOXES_FETCHING_STARTED,
});

export const boxesReceived = ({ boxes }: { boxes: Box[] }): BoxesEventTypes => ({
  type: BOXES_RECEIVED,
  payload: {
    boxes,
  },
});
