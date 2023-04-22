import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import * as storeActions from '../../store/store'

function ProductCard({storeId}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const store = useSelector((state) => state.stores.userStores)[storeId]

  useEffect(async () => {
    await dispatch(storeActions.setUserStores())
  }, [dispatch])

  return (
  <div>
    <img
    height='275px'
    width='400px'
    src={store.mainImage}/>
    <div>
      <span>{store.name}</span>
    </div>
  </div>
  );
}

export default ProductCard;
