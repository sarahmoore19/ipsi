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
    <div className="footer">
      <div>Sarah Moore</div>
      <div>sarahnmoore19@gmail.com</div>
      <a target='_blank' href='https://www.linkedin.com/in/sarah-moore-747946259/'>LinkedIn</a>
      <a target='_blank' href='https://github.com/sarahmoore19'>GitHub</a>
    </div>
  </div>
  );
}

export default LandingPage;
