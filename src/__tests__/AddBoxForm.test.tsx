import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from 'react-testing-library';
import userEvent from 'user-event';
import { AddBoxForm } from '../AddBoxForm';
import { createRender } from './createRender';
import { act } from 'react-hooks-testing-library';

describe('AddBoxForm', () => {
  afterEach(cleanup);
  it('renders an input for the box name, the first flashcard question & answer and a button for submitting the form', () => {
    const render = createRender({});
    const { getByLabelText, getByText } = render(<AddBoxForm onSubmit={jest.fn()} />);
    expect(getByLabelText(/name of the box/i)).toBeInTheDocument();
    expect(getByLabelText(/flashcard's question/i)).toBeInTheDocument();
    expect(getByLabelText(/flashcard's answer/i)).toBeInTheDocument();
    expect(getByText(/submit the box/i)).toBeInTheDocument();
  });
  test('should be able to type in inputs', () => {
    const render = createRender({});
    const { getByLabelText } = render(<AddBoxForm onSubmit={jest.fn()} />);
    const boxNameInput = getByLabelText(/name of the box/i);
    const flashcardQuestionInput = getByLabelText(/flashcard's question/i);
    const flashcardAnswerInput = getByLabelText(/flashcard's answer/i);
    act(() => {
      userEvent.type(boxNameInput, 'this is the box name input value');
      userEvent.type(flashcardQuestionInput, 'this is the flashcard question input value');
      userEvent.type(flashcardAnswerInput, 'this is the flashcard answer input value');
      expect(boxNameInput).toHaveAttribute('value', 'this is the box name input value');
      expect(flashcardQuestionInput).toHaveAttribute('value', 'this is the flashcard question input value');
      expect(flashcardAnswerInput).toHaveAttribute('value', 'this is the flashcard answer input value');
    });
  });
  it('calls the onSubmit props with correct values when submitting the form', () => {
    const render = createRender({});
    const onSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<AddBoxForm onSubmit={onSubmit} />);
    const nameOfBoxInput = getByLabelText(/name of the box/i);
    const flashcardQuestionInput = getByLabelText(/flashcard's question/i);
    const flashcardAnswerInput = getByLabelText(/flashcard's answer/i);
    const submitButton = getByText(/submit the box/i);
    act(() => {
      userEvent.type(nameOfBoxInput, 'My New Box');
      userEvent.type(flashcardQuestionInput, 'Some question');
      userEvent.type(flashcardAnswerInput, 'Some answer');
      userEvent.click(submitButton);
    });
    expect(onSubmit).toHaveBeenNthCalledWith(1, {
      boxName: 'My New Box',
      flashcardQuestion: 'Some question',
      flashcardAnswer: 'Some answer',
    });
  });
});
