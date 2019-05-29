import { boxesReducer } from '../reducers';
import { boxFetchingStarted, boxesReceived } from '../events';

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
