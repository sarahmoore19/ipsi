import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'

function StoreForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products.allProducts)

  useEffect(async () => {
    await dispatch(productActions.setAllProducts())
  }, [dispatch])

  return (
  <div>
   store form
  </div>
  );
}

export default StoreForm;
