import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import * as storeActions from '../../store/store'
import ProductCard from "../ProductCard";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from '../DeleteModal'
import './index.css'

function StorePage() {
  const { storeId } = useParams()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products.allProducts)
  const productsArr = Object.values(products)
  const store = useSelector((state) => state.stores.userStores)[storeId]

  useEffect(async () => {
    await dispatch(productActions.setAllProducts())
    await dispatch(storeActions.setUserStores())
  }, [dispatch])

  if (!productsArr.length) return null
  let storeProducts = productsArr.filter(p => p.storeId == storeId)

  return (
  <div>
    <div className="storeInfoDiv">
      <h1>{store?.name}</h1>
      <h3>{store?.description}</h3>
    </div>
    <div className="createButton">
    <Link
    to={{
      pathname: `/products/new`,
      state: { storeId: storeId }
    }}>
      <button>Create New Product</button>
    </Link>
    </div>
    <div className="allProductsDiv">
    {(storeProducts.length == 0) && <h1>Create your first product!</h1>}
    {storeProducts.map(o => (
      <div>
        <Link
        key={o.id}
        to={`/products/${o.id}`}>
          <ProductCard
          productId={o.id}
          />
        </Link>
          <div className="buttonDiv">
            <Link
            to={{
              pathname: `/products/${o.id}/edit`,
              state: { storeId: storeId, product: products[o.id]}
            }}>
              <button>Edit</button>
            </Link>
            <OpenModalButton
            buttonText='Delete'
            modalComponent={<DeleteModal id={o.id} context='product'/>}
            />
          </div>
       </div>
    ))}
    </div>
  </div>
  );
}

export default StorePage;
