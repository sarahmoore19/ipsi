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
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/stores/user">
            <MyStoresPage />
          </Route>
          <Route exact path="/stores/new">
            <StoreForm />
          </Route>
          <Route exact path="/stores/:storeId">
            <StorePage />
          </Route>
          <Route exact path="/stores/:storeId/edit">
            <StoreForm />
          </Route>
          <Route exact path="/products/new">
            <ProductForm />
          </Route>
          <Route exact path="/products/:productId">
            <ProductPage />
          </Route>
          <Route exact path="/products/:productId/edit">
            <ProductForm />
          </Route>
          <Route path="">
            <>Not a valid path, please click the logo in the upper left corner to go home.</>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
