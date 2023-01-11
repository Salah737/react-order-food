import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "../Layout/HeaderCardButton.module.css";

const HeaderCardButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const btnClass = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }

    setBtnIsHighLighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button onClick={props.onShowCart} className={btnClass}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCardButton;
