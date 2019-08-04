import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from 'react-testing-library';
import { BoxList } from '../BoxList';
import { createRender } from './createRender';
import { expectAButtonToAddNewBoxToBeVisible } from './utils';
import { getTestBoxesData } from './data/boxes';

describe('BoxList', () => {
  afterEach(cleanup);
  it('should render the call to action to select a box if not loading', () => {
    const render = createRender({});
    const { getByText } = render(<BoxList boxes={[]} isBoxesRequestPending={false} />);
    expect(getByText(/select a box :/i)).toBeInTheDocument();
  });
  it('should inform that the boxes are loading if boxes request is pending', () => {
    const render = createRender({});
    const { getByText } = render(<BoxList boxes={[]} isBoxesRequestPending={true} />);
    expect(getByText(/loading/i)).toBeInTheDocument();
  });
  it('should render the given boxes and a button to add new box', () => {
    const render = createRender({});
    const boxes = getTestBoxesData();
    const { getAllByTestId, getByText, getByLabelText } = render(<BoxList boxes={boxes} />);
    boxes.map(b => expect(getByText(b.boxName)).toBeInTheDocument());
    expect(getAllByTestId('boxFlashcardsTotal').map(e => e.textContent)).toEqual(
      boxes.map(b => `${b.totalFlashcards}`),
    );
    expect(getAllByTestId('boxArchivedFlashcards').map(e => e.textContent)).toEqual(
      boxes.filter(b => b.archivedFlashcards > 0).map(b => `${b.archivedFlashcards}`),
    );
    expectAButtonToAddNewBoxToBeVisible(getByLabelText);
  });
  it('should render an error if the boxes request has failed and display the locally existing boxes', () => {
    const render = createRender({});
    const expectedError = 'some error message';
    const { getByRole, getByText } = render(
      <BoxList
        boxes={[
          {
            boxName: 'some box locally',
            totalFlashcards: 1,
            archivedFlashcards: 0,
          },
        ]}
        boxesRequestError={expectedError}
      />,
    );
    expect(getByRole('boxesRequestError')).toHaveTextContent(expectedError);
    expect(getByText('some box locally')).toBeInTheDocument();
  });
  it('should render the addBoxRequest error if the addBoxRequest has failed', () => {
    const render = createRender({});
    const expectedError = 'some error message';
    const { getByRole } = render(<BoxList boxes={[]} addBoxRequestError={expectedError} />);
    expect(getByRole('addBoxError')).toHaveTextContent(expectedError);
  });
});
