import { FlashcardsAppState } from '..';

export const readBoxes = (state: FlashcardsAppState) => ({
  loading: state.boxes.loading,
  data: Object.values(state.boxes.data),
});
