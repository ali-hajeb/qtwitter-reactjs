import React, { HTMLInputTypeAttribute, HTMLProps } from 'react';

const errorMessageClass: React.CSSProperties = {
  color: 'red',
};

const descriptionClass: React.CSSProperties = {
  fontSize: 'small',
};

const inputGroupClass: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export interface InputGroupProps {
  id: string;
  inputId: string;
  inputValue: string;
  setInputValue: Function;
  inputProps?: HTMLProps<HTMLInputElement>;
  inputType?: HTMLInputTypeAttribute;
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  inputPlaceholder?: string;
  errorMessage?: string;
  descriptions?: string;
}

const InputGroup: React.FunctionComponent<InputGroupProps> = ({
  id,
  className,
  inputClassName,
  inputValue,
  setInputValue,
  inputProps,
  labelClassName,
  label,
  inputId,
  inputType,
  descriptions,
  errorMessage,
  inputPlaceholder,
}) => {
  const inputGroupClassName = ['input-group'];
  if (className) inputGroupClassName.push(className);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      id={id}
      className={inputGroupClassName.join(' ')}
      style={inputGroupClass}
    >
      {label && (
        <label className={labelClassName} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        type={inputType || 'text'}
        id={inputId}
        className={inputClassName}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={inputChangeHandler}
        {...inputProps}
      />
      <span style={descriptionClass}>{descriptions}</span>
      <strong style={errorMessageClass}>{errorMessage}</strong>
    </div>
  );
};

export default InputGroup;
