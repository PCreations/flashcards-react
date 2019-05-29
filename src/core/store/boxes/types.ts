export interface Box {
  id: string;
  boxName: string;
  totalFlashcards: number;
  archivedFlashcards: number;
}

export type BoxMap = {
  [key: string]: Box;
};

export interface BoxesState {
  loading: boolean;
  data: BoxMap;
}

export const BOXES_FETCHING_STARTED = 'BOXES_FETCHING_STARTED';
export const BOXES_RECEIVED = 'BOXES_RECEIVED';

interface BoxesFetchingStartedEvent {
  type: typeof BOXES_FETCHING_STARTED;
}

interface BoxesReceivedEvent {
  type: typeof BOXES_RECEIVED;
  payload: {
    boxes: Box[];
  };
}

export type BoxesEventTypes = BoxesFetchingStartedEvent | BoxesReceivedEvent;
