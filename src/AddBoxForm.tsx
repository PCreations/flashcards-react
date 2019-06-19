import React, { useReducer, useCallback } from 'react';

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
    changeBoxNameValue: useCallback(
      (value: string) => dispatch(changeInputValue(AddBoxFormInputId.BOX_NAME, value)),
      [],
    ),
    changeFlashcardQuestionValue: useCallback(
      (value: string) => dispatch(changeInputValue(AddBoxFormInputId.FLASHCARD_QUESTION, value)),
      [],
    ),
    changeFlashcardAnswerValue: useCallback(
      (value: string) => dispatch(changeInputValue(AddBoxFormInputId.FLASHCARD_ANSWER, value)),
      [],
    ),
  };
};

type AddBoxFormInputProps = {
  labelText: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
};

const applyEventTargetValueToChangeHandler = (onChange: AddBoxFormInputProps['onChange']) => (
  event: React.ChangeEvent<HTMLInputElement>,
) => onChange(event.target.value);

const AddBoxFormInput: React.FC<AddBoxFormInputProps> = ({ labelText, id, value, onChange }) => {
  const onChangeHandler = useCallback(applyEventTargetValueToChangeHandler(onChange), []);
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type="text" value={value} onChange={onChangeHandler} />
    </>
  );
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
      <AddBoxFormInput
        labelText="Name of the box"
        id={AddBoxFormInputId.BOX_NAME}
        value={boxNameValue}
        onChange={changeBoxNameValue}
      />
      <AddBoxFormInput
        labelText="Flashcard's question"
        id={AddBoxFormInputId.FLASHCARD_QUESTION}
        value={flashcardQuestionValue}
        onChange={changeFlashcardQuestionValue}
      />
      <AddBoxFormInput
        labelText="Flashcard's answer"
        id={AddBoxFormInputId.FLASHCARD_ANSWER}
        value={flashcardAnswerValue}
        onChange={changeFlashcardAnswerValue}
      />
      <button type="submit">Submit the box</button>
    </form>
  );
};
