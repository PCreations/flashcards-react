import React, { useCallback } from 'react';

type AddBoxFormInputProps = {
  labelText: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
};

const applyEventTargetValueToChangeHandler = (onChange: AddBoxFormInputProps['onChange']) => (
  event: React.ChangeEvent<HTMLInputElement>,
) => onChange(event.target.value);

export const AddBoxFormInput: React.FC<AddBoxFormInputProps> = ({ labelText, id, value, onChange }) => {
  const onChangeHandler = useCallback(applyEventTargetValueToChangeHandler(onChange), []);
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type="text" value={value} onChange={onChangeHandler} />
    </>
  );
};
