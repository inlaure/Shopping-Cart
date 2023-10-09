import { useState } from 'react';

const useInput = validationFn => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  const inputIsInvalid = !valueIsValid && isTouched;

  const valueChangeHandler = e => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = e => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: inputIsInvalid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
