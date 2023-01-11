import React, { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckOut, setIsCheckOUt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDisSubmit] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = (event) => {
    event.preventDefault();
    setIsCheckOUt(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
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
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHiddenCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order{" "}
        </button>
      )}
    </div>
  );
  const submitOrderHandler = async (userDate) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-food-order-96762-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userDate,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDisSubmit(true);
    cartCtx.clearCart();
  };
  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onHiddenCart}
        />
      )}
      {!isCheckOut && modalActions};
    </Fragment>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModelContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHiddenCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onHiddenCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModelContent}
    </Modal>
  );
};
export default Cart;
