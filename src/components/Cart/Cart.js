import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout.js';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = props => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        'https://meals-ed7dc-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
        }
      );
      const data = await response.json();
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (err) {
      console.error(err.message);
      setDidSubmit(false);
    }
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  let content;

  if (isOrdered) {
    content = (
      <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
    );
  } else {
    content = (
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={() => setIsOrdered(true)}>
            Order
          </button>
        )}
      </div>
    );
  }

  const cartContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitContent = (
    <>
      <p>Successfully sent the order</p>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitContent}
      {!didSubmit && !isSubmitting && content}
    </Modal>
  );
};

export default Cart;
