import { useReducer, useCallback } from 'react';
import { AddBoxFormProps, AddBoxFormInputId } from './types';
import { AddBoxFormActionTypes, invalidate, changeInputValue, submit } from './actions';
import { addBoxFormReducer, HandledActions, initialState } from './reducer';
import { useRoutesHistoryDispatch } from '../router/context';
import { changeRoute, RoutePath } from '../router/state';

const isFieldValueEmpty = (inputValue: string) => inputValue === '';

export const useAddBoxFormReducer = (onSubmit: AddBoxFormProps['onSubmit']) => {
  const [formState, baseDispatch] = useReducer(addBoxFormReducer, initialState);
  const fieldValues = {
    boxName: formState[AddBoxFormInputId.BOX_NAME],
    flashcardQuestion: formState[AddBoxFormInputId.FLASHCARD_QUESTION],
    flashcardAnswer: formState[AddBoxFormInputId.FLASHCARD_ANSWER],
  };
  const isPristine = Object.values(fieldValues).every(isFieldValueEmpty);
  const historyDispatch = useRoutesHistoryDispatch();
  const dispatch = useCallback(
    (action: HandledActions) => {
      if (action.type === AddBoxFormActionTypes.FORM_SUBMITTED) {
        if (Object.values(fieldValues).some(isFieldValueEmpty)) {
          baseDispatch(invalidate());
        } else {
          onSubmit(fieldValues);
          historyDispatch(changeRoute(RoutePath.HOME));
        }
      } else {
        baseDispatch(action);
      }
    },
    [fieldValues, historyDispatch, onSubmit],
  );
  const stateActionDispatchers = {
    changeBoxNameValue: useCallback(
      (value: string) => dispatch(changeInputValue(AddBoxFormInputId.BOX_NAME, value)),
      [dispatch],
    ),
    changeFlashcardQuestionValue: useCallback(
      (value: string) => dispatch(changeInputValue(AddBoxFormInputId.FLASHCARD_QUESTION, value)),
      [dispatch],
    ),
    changeFlashcardAnswerValue: useCallback(
      (value: string) => dispatch(changeInputValue(AddBoxFormInputId.FLASHCARD_ANSWER, value)),
      [dispatch],
    ),
    submitForm: useCallback(() => dispatch(submit()), [dispatch]),
  };

  return {
    shouldDisplayError: formState.alreadyBeenSubmitedOnce && !isPristine && !formState.isValid,
    ...fieldValues,
    ...stateActionDispatchers,
  };
};
