import { AddBoxFormInputId } from './types';
import { changeInputValue, submit, invalidate, AddBoxFormActionTypes } from './actions';

type AddBoxFormState = {
  [AddBoxFormInputId.BOX_NAME]: string;
  [AddBoxFormInputId.FLASHCARD_QUESTION]: string;
  [AddBoxFormInputId.FLASHCARD_ANSWER]: string;
  isValid: boolean;
  alreadyBeenSubmitedOnce: boolean;
};

export const initialState: AddBoxFormState = {
  [AddBoxFormInputId.BOX_NAME]: '',
  [AddBoxFormInputId.FLASHCARD_QUESTION]: '',
  [AddBoxFormInputId.FLASHCARD_ANSWER]: '',
  isValid: false,
  alreadyBeenSubmitedOnce: false,
};

export type HandledActions =
  | ReturnType<typeof changeInputValue>
  | ReturnType<typeof submit>
  | ReturnType<typeof invalidate>;

export const addBoxFormReducer = (state: AddBoxFormState, action: HandledActions): AddBoxFormState => {
  if (action.type === AddBoxFormActionTypes.INPUT_VALUE_CHANGED) {
    return {
      ...state,
      [action.payload.id]: action.payload.value,
    };
  }
  if (action.type === AddBoxFormActionTypes.FORM_VALIDATION_FAILED) {
    return {
      ...state,
      alreadyBeenSubmitedOnce: true,
    };
  }
  return state;
};
