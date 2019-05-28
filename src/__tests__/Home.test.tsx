import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { default as userEvent } from 'user-event';
import 'jest-dom/extend-expect';
import { Home } from '../Home';

describe('Home', () => {
  afterEach(cleanup);
  test('it should render the name of the application and a button to sign in with Github', () => {
    const { getByText, getByLabelText } = render(<Home onSignInClicked={jest.fn} />);
    expect(getByText('Flashcards')).toBeInTheDocument();
    expect(getByLabelText(/sign in with github/i)).toBeInTheDocument();
  });
  test('the sign in with Github button should call the onSignInClicked prop', () => {
    const onSignInClicked = jest.fn();
    const { getByLabelText } = render(<Home onSignInClicked={onSignInClicked} />);
    userEvent.click(getByLabelText(/sign in with github/i));
    expect(onSignInClicked).toHaveBeenCalled();
  });
});
