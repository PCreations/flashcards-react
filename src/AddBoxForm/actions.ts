import { AddBoxFormInputId } from './types';

export enum AddBoxFormActionTypes {
  INPUT_VALUE_CHANGED,
  FORM_SUBMITTED,
  FORM_VALIDATION_FAILED,
}

export const changeInputValue = (inputId: AddBoxFormInputId, inputValue: string) => ({
  type: AddBoxFormActionTypes.INPUT_VALUE_CHANGED as AddBoxFormActionTypes.INPUT_VALUE_CHANGED,
  payload: {
    id: inputId,
    value: inputValue,
  },
});

export const submit = () => ({
  type: AddBoxFormActionTypes.FORM_SUBMITTED as AddBoxFormActionTypes.FORM_SUBMITTED,
});

export const invalidate = () => ({
  type: AddBoxFormActionTypes.FORM_VALIDATION_FAILED as AddBoxFormActionTypes.FORM_VALIDATION_FAILED,
});
