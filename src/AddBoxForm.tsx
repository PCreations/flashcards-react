import React, { useReducer } from 'react';

type AddBoxFormFields = {
  boxName: string;
  flashcardQuestion: string;
  flashcardAnswer: string;
};

type AddBoxFormProps = {
  onSubmit: (fields: AddBoxFormFields) => void;
};

enum AddBoxFormActionTypes {
  INPUT_VALUE_CHANGED,
}

enum AddBoxFormInputId {
  BOX_NAME = 'add-box-form-box-name-input',
  FLASHCARD_QUESTION = 'add-box-form-flashcard-question-input',
  FLASHCARD_ANSWER = 'add-box-form-flashcard-answer-input',
}

type AddBoxFormState = {
  [AddBoxFormInputId.BOX_NAME]: string;
  [AddBoxFormInputId.FLASHCARD_QUESTION]: string;
  [AddBoxFormInputId.FLASHCARD_ANSWER]: string;
};

const changeInputValue = (inputId: AddBoxFormInputId, inputValue: string) => ({
  type: AddBoxFormActionTypes.INPUT_VALUE_CHANGED as AddBoxFormActionTypes.INPUT_VALUE_CHANGED,
  payload: {
    id: inputId,
    value: inputValue,
  },
});

type HandledActions = ReturnType<typeof changeInputValue>;

const addBoxFormReducer = (state: AddBoxFormState, action: HandledActions): AddBoxFormState => {
  if (action.type === AddBoxFormActionTypes.INPUT_VALUE_CHANGED) {
    return {
      ...state,
      [action.payload.id]: action.payload.value,
    };
  }
  return state;
};

const useAddBoxFormReducer = () => {
  const [formState, dispatch] = useReducer(addBoxFormReducer, {
    [AddBoxFormInputId.BOX_NAME]: '',
    [AddBoxFormInputId.FLASHCARD_QUESTION]: '',
    [AddBoxFormInputId.FLASHCARD_ANSWER]: '',
  });
  return {
    boxNameValue: formState[AddBoxFormInputId.BOX_NAME],
    flashcardQuestionValue: formState[AddBoxFormInputId.FLASHCARD_QUESTION],
    flashcardAnswerValue: formState[AddBoxFormInputId.FLASHCARD_ANSWER],
    changeBoxNameValue: (value: string) => dispatch(changeInputValue(AddBoxFormInputId.BOX_NAME, value)),
    changeFlashcardQuestionValue: (value: string) =>
      dispatch(changeInputValue(AddBoxFormInputId.FLASHCARD_QUESTION, value)),
    changeFlashcardAnswerValue: (value: string) =>
      dispatch(changeInputValue(AddBoxFormInputId.FLASHCARD_ANSWER, value)),
  };
};
export const AddBoxForm: React.FC<AddBoxFormProps> = ({ onSubmit }) => {
  const {
    boxNameValue,
    flashcardQuestionValue,
    flashcardAnswerValue,
    changeBoxNameValue,
    changeFlashcardAnswerValue,
    changeFlashcardQuestionValue,
  } = useAddBoxFormReducer();
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSubmit({
          boxName: boxNameValue,
          flashcardAnswer: flashcardAnswerValue,
          flashcardQuestion: flashcardQuestionValue,
        });
      }}
    >
      <label htmlFor="add-box-form-box-name-input">Name of the box</label>
      <input
        type="text"
        id="add-box-form-box-name-input"
        value={boxNameValue}
        onChange={e => changeBoxNameValue(e.target.value)}
      />
      <label htmlFor="add-box-form-flashcard-question-input">Flashcard's question</label>
      <input
        type="text"
        id="add-box-form-flashcard-question-input"
        value={flashcardQuestionValue}
        onChange={e => changeFlashcardQuestionValue(e.target.value)}
      />
      <label htmlFor="add-box-form-flashcard-answer-input">Flashcard's answer</label>
      <input
        type="text"
        id="add-box-form-flashcard-answer-input"
        value={flashcardAnswerValue}
        onChange={e => changeFlashcardAnswerValue(e.target.value)}
      />
      <button type="submit">Submit the box</button>
    </form>
  );
};
