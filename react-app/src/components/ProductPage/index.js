import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'

function ProductPage() {
  const {productId} = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products.allProducts)[productId]

  useEffect(async () => {
    await dispatch(productActions.setAllProducts())
  }, [dispatch])

  if (!product) return null

  return (
  <div>
    <img
    height='275px'
    width='400px'
    src={product.mainImage}/>
    <div>
      <span>{product.name}</span>
      <span>{product.price}</span>
      <div>{product.description}</div>
    </div>
  </div>
  );
}

export default ProductPage;
