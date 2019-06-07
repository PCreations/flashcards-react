import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from 'react-testing-library';
import { BoxList } from '../BoxList';
import { BoxesRequestStatusEnum } from '../core/store/boxes';
import { createRender } from './createRender';
import { expectAButtonToAddNewBoxToBeVisible } from './utils';

describe('BoxList', () => {
  afterEach(cleanup);
  it('should render the call to action to select a box if not loading', () => {
    const render = createRender({});
    const { getByText } = render(
      <BoxList boxes={[]} boxesRequestStatus={BoxesRequestStatusEnum.NEVER_STARTED} />,
    );
    expect(getByText(/select a box :/i)).toBeInTheDocument();
  });
  it('should inform that the boxes are loading if boxes request is pending', () => {
    const render = createRender({});
    const { getByText } = render(<BoxList boxes={[]} boxesRequestStatus={BoxesRequestStatusEnum.PENDING} />);
    expect(getByText(/loading/i)).toBeInTheDocument();
  });
  it('should render the given boxes and a button to add new box', () => {
    const render = createRender({});
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
    const { getAllByTestId, getByLabelText } = render(
      <BoxList boxes={boxes} boxesRequestStatus={BoxesRequestStatusEnum.SUCCEEDED} />,
    );
    expect(getAllByTestId('boxName').map(e => e.textContent)).toEqual(boxes.map(b => b.boxName));
    expect(getAllByTestId('boxFlashcardsTotal').map(e => e.textContent)).toEqual(
      boxes.map(b => `${b.totalFlashcards}`),
    );
    expect(getAllByTestId('boxArchivedFlashcards').map(e => e.textContent)).toEqual(
      boxes.filter(b => b.archivedFlashcards > 0).map(b => `${b.archivedFlashcards}`),
    );
    expectAButtonToAddNewBoxToBeVisible(getByLabelText);
  });
  it('should render an error if the boxes request has failed', () => {
    const render = createRender({});
    const expectedError = 'some error message';
    const { container } = render(
      <BoxList
        boxes={[]}
        boxesRequestStatus={BoxesRequestStatusEnum.FAILED}
        boxesRequestError={expectedError}
      />,
    );
    expect(container).toHaveTextContent(expectedError);
  });
});
