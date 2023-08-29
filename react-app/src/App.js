import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from './components/LandingPage'
import MyStoresPage from './components/MyStoresPage'
import StorePage from './components/StorePage'
import StoreForm from './components/StoreForm'
import ProductPage from './components/ProductPage'
import ProductForm from './components/ProductForm'
import ShoppingCartPage from "./components/ShoppingCart";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/stores/user" component={MyStoresPage} />
          <Route exact path={["/stores/:storeId/edit", "/stores/new"]} component={StoreForm} />
          <Route exact path="/stores/:storeId" component={StorePage} />
          <Route exact path={["/products/:productId/edit", "/products/new"]} component={ProductForm} />
          <Route exact path="/products/:productId" component={ProductPage} />
          <Route exact path="/shopping-cart" component={ShoppingCartPage} />
          <Route path="">
            <>Not a valid path, please click the logo in the upper left corner to go home.</>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
