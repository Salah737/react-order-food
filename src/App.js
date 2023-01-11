import "./App.css";
import Header from "./Components/Layout/Header";
import React, { Fragment, useState } from "react";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hiddenCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider className="App">
      {cartIsShown && <Cart onHiddenCart={hiddenCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
