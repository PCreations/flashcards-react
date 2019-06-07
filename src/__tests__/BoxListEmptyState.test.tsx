import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from 'react-testing-library';
import { BoxListEmptyState } from '../BoxListEmptyState';
import { createRender } from './createRender';
import { expectAButtonToAddNewBoxToBeVisible } from './utils';

describe('BoxListEmptyState', () => {
  afterEach(cleanup);
  test('it should render a message saying that there is no boxes yet and a button to add a new one', () => {
    const render = createRender({});
    const { getByText, getByLabelText } = render(<BoxListEmptyState />);
    expect(getByText('No flashcards box yet')).toBeInTheDocument();
    expect(getByText('Create a new box and it will show up here.')).toBeInTheDocument();
    expectAButtonToAddNewBoxToBeVisible(getByLabelText);
  });
});
