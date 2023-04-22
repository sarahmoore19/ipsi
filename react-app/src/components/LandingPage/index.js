import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as productActions from '../../store/product'
import ProductCard from '../ProductCard'

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
    {products.map(o => (
      <Link
      key={o.id}
      to={`/products/${o.id}`}>
        <ProductCard
        productId={o.id}
        />
      </Link>
    ))}
  </div>
  );
}

export default LandingPage;
