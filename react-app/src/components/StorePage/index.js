import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import * as storeActions from '../../store/store'
import ProductCard from "../ProductCard";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from '../DeleteModal'

function StorePage() {
  const { storeId } = useParams()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const products = Object.values(useSelector((state) => state.products.allProducts))
  const store = useSelector((state) => state.stores.userStores)[storeId]

  useEffect(async () => {
    await dispatch(productActions.setAllProducts())
    await dispatch(storeActions.setUserStores())
  }, [dispatch])

  if (!products.length) return null
  let storeProducts = products.filter(p => p.storeId == storeId)

  return (
  <div>
    <h1>{store?.name}</h1>
    <h2>{store?.description}</h2>
    <Link
    to={{
      pathname: `/products/new`,
      state: { storeId: storeId }
    }}>
      <button>Create New Product</button>
    </Link>
    {storeProducts.map(o => (
      <div>
        <Link
        key={o.id}
        to={`/products/${o.id}`}>
          <ProductCard
          productId={o.id}
          />
        </Link>
          <div>
            <Link
            to={{
              pathname: `/products/${o.id}/edit`,
              state: { storeId: storeId }
            }}>
              <button>Edit Product</button>
            </Link>
            <OpenModalButton
            buttonText='Delete Product'
            modalComponent={<DeleteModal id={o.id} context='product'/>}
            />
          </div>
       </div>
    ))}
  </div>
  );
}

export default StorePage;
