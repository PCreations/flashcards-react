import { Data, Box } from './reducer';

export const createSelectors = <S>(getDataSlice: (state: S) => Data) => ({
  getBoxes(state: S) {
    return getDataSlice(state).toList();
  },
  getBox(boxName: string, state: S) {
    return getDataSlice(state).get(boxName, Box({ boxName }));
  },
});
