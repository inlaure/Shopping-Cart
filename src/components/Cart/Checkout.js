import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const Checkout = props => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(value => value.trim() !== '');

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(value => value.trim() !== '');

  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInput(value => value.trim().length === 5);

  let formIsValid = nameIsValid && streetIsValid && postalIsValid;

  const submitHandler = e => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      postalCode: postalValue,
    });

    resetName();
    resetStreet();
    resetPostal();
  };

  const nameClasses = nameHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const streetClasses = streetHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const postalClasses = postalHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Please enter your street name.</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          id="postal"
          type="text"
          value={postalValue}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && <p>Please enter 5 numbers.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className={classes.submit}
          disabled={!formIsValid}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
