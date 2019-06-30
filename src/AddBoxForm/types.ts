type AddBoxFormFields = {
  boxName: string;
  flashcardQuestion: string;
  flashcardAnswer: string;
};

export type AddBoxFormProps = {
  onSubmit: (fields: AddBoxFormFields) => void;
};

export enum AddBoxFormInputId {
  BOX_NAME = 'add-box-form-box-name-input',
  FLASHCARD_QUESTION = 'add-box-form-flashcard-question-input',
  FLASHCARD_ANSWER = 'add-box-form-flashcard-answer-input',
}
