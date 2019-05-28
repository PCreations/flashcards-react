import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BoxListEmptyState } from '../BoxListEmptyState';
import { default as userEvent } from 'user-event';
import 'jest-dom/extend-expect';

describe('BoxListEmptyState', () => {
  afterEach(cleanup);
  test('it should render a message saying that there is no boxes yet and a button to add a new one', () => {
    const { getByLabelText, getByText } = render(<BoxListEmptyState createNewBox={jest.fn()} />);
    expect(getByText('No flashcards box yet')).toBeInTheDocument();
    expect(getByText('Create a new box and it will show up here.')).toBeInTheDocument();
    expect(getByLabelText(/create a new box/i)).toBeInTheDocument();
  });
  test('it should call the createNewBox prop when clicking on the button', () => {
    const createNewBox = jest.fn();
    const { getByLabelText } = render(<BoxListEmptyState createNewBox={createNewBox} />);
    userEvent.click(getByLabelText(/create a new box/i));
    expect(createNewBox).toHaveBeenCalled();
  });
});
