import React from 'react';
import { AddBoxFormInput } from './AddBoxFormInput';
import { AddBoxFormProps, AddBoxFormInputId } from './types';
import { useAddBoxFormReducer } from './useAddBoxFormReducer';

export const AddBoxForm: React.FC<AddBoxFormProps> = ({ onSubmit }) => {
  const {
    boxName,
    flashcardQuestion,
    flashcardAnswer,
    submitForm,
    shouldDisplayError,
    changeBoxNameValue,
    changeFlashcardAnswerValue,
    changeFlashcardQuestionValue,
  } = useAddBoxFormReducer(onSubmit);
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        submitForm();
      }}
    >
      {shouldDisplayError && <strong>All fields are mandatory</strong>}
      <AddBoxFormInput
        labelText="Name of the box"
        id={AddBoxFormInputId.BOX_NAME}
        value={boxName}
        onChange={changeBoxNameValue}
      />
      <AddBoxFormInput
        labelText="Flashcard's question"
        id={AddBoxFormInputId.FLASHCARD_QUESTION}
        value={flashcardQuestion}
        onChange={changeFlashcardQuestionValue}
      />
      <AddBoxFormInput
        labelText="Flashcard's answer"
        id={AddBoxFormInputId.FLASHCARD_ANSWER}
        value={flashcardAnswer}
        onChange={changeFlashcardAnswerValue}
      />
      <button type="submit">Submit the box</button>
    </form>
  );
};
