import { isEqual } from 'lodash';
import { boxesReducer } from '../reducers';
import { readBoxes } from '../selectors';
import { boxFetchingStarted, boxesReceived } from '../events';
import { fetchBoxes } from '../behaviors';
import { createStore, FlashcardsAppState, FlashcardsAppStore } from '../..';

test(`
  given no boxes have been fetched
  then the readBoxes selector should return an empty list and a loading status as false
`, () => {
  const store = createStore({ fetchBoxes: jest.fn() });
  expect(readBoxes(store.getState())).toEqual({ loading: false, data: [] });
});

test(`
  given no boxes have been fetched
  when a fetchBoxes command is issued
  then the readBoxes selector should return that the boxes are loading
  and the readBoxes selector should eventually return the fetched boxes
`, async () => {
  const boxes = [
    {
      id: 'box1',
      boxName: 'Capitals of the World',
      totalFlashcards: 50,
      archivedFlashcards: 20,
    },
    {
      id: 'box2',
      boxName: 'Some other box',
      totalFlashcards: 40,
      archivedFlashcards: 0,
    },
    {
      id: 'box3',
      boxName: 'Some other box 2',
      totalFlashcards: 75,
      archivedFlashcards: 50,
    },
  ];
  const fetchBoxesMock = jest.fn().mockResolvedValueOnce(boxes);
  const store = createStore({ fetchBoxes: fetchBoxesMock });

  const distinctSelectorChanges = <S extends (state: FlashcardsAppState) => ReturnType<S>>(
    selector: S,
    store: FlashcardsAppStore,
  ) => {
    const actualChanges: ReturnType<S>[] = [];
    const pushChangeToActualChanges = () => {
      const lastChange = actualChanges.slice(-1)[0];
      const currentChange = selector(store.getState());
      if (!isEqual(lastChange, currentChange)) {
        actualChanges.push(currentChange);
      }
    };
    store.subscribe(pushChangeToActualChanges);
    return actualChanges;
  };

  const actualChanges = distinctSelectorChanges(readBoxes, store);
  await store.dispatch(fetchBoxes());
  expect(actualChanges.length).toBe(2);
  expect(actualChanges[0]).toEqual({ loading: true, data: [] });
  expect(actualChanges[1]).toEqual({ loading: false, data: boxes });
});

test(`
  given no arguments
  then it should return the initial state
`, () => {
  expect(boxesReducer()).toEqual({
    loading: false,
    data: {},
  });
});

test(`
  given no state and a boxesFetchingStarted event
  then it should set the loading state to true
`, () => {
  expect(boxesReducer(undefined, boxFetchingStarted())).toEqual({
    loading: true,
    data: {},
  });
});

test(`
  given the box fetching has started
  when receiving the boxes
  then the loading state should be set to false and the boxes correctly stored
`, () => {
  const boxes = [
    {
      id: 'box1',
      boxName: 'Capitals of the World',
      totalFlashcards: 50,
      archivedFlashcards: 20,
    },
    {
      id: 'box2',
      boxName: 'Some other box',
      totalFlashcards: 40,
      archivedFlashcards: 0,
    },
    {
      id: 'box3',
      boxName: 'Some other box 2',
      totalFlashcards: 75,
      archivedFlashcards: 50,
    },
  ];
  const boxFetchingStartedState = boxesReducer(undefined, boxFetchingStarted());
  expect(boxesReducer(boxFetchingStartedState, boxesReceived({ boxes }))).toEqual({
    loading: false,
    data: {
      box1: boxes[0],
      box2: boxes[1],
      box3: boxes[2],
    },
  });
});
