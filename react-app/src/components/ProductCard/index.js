import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import './index.css'

function ProductCard({productId}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products.allProducts)[productId]

  useEffect(async () => {
    await dispatch(productActions.setAllProducts())
  }, [dispatch])

  return (
  <div className="productCard">
    <img
    maxWidth='250px'
    height='250px'
    src={product.mainImage}/>
    <div className="namePrice">
      <div className="pName">{product.name}</div>
      <div className="pPrice">${product.price}</div>
    </div>
  </div>
  );
}

export default ProductCard;
