import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as productActions from '../../store/product'
import ProductCard from '../ProductCard'
import './index.css'

function LandingPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const products = Object.values(useSelector((state) => state.products.allProducts))

  useEffect(async () => {
    await dispatch(productActions.setAllProducts())
  }, [dispatch])

  if (!products.length) return null

  return (
  <div>
    <div
    className="header">
      <h1>
       {sessionUser?.id && `Welcome back, ${sessionUser.username}!`}
       {!sessionUser && `Welcome to ipsi!`}
      </h1>
    </div>
    <div className="allProductsDiv">
    {products.map(o => (
      <Link
      className="productCard"
      key={o.id}
      to={`/products/${o.id}`}>
        <ProductCard
        productId={o.id}
        />
      </Link>
    ))}
    </div>
  </div>
  );
}

export default LandingPage;
