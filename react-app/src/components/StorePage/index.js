import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import ProductCard from "../ProductCard";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from '../DeleteModal'

function StorePage() {
  const { storeId } = useParams()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const products = Object.values(useSelector((state) => state.products.allProducts))

  useEffect(async () => {
    await dispatch(productActions.setAllProducts())
  }, [dispatch])

  if (!products.length) return null
  let userProducts = products.filter(p => p.storeId == storeId)

  return (
  <div>
    <Link
    to={`/products/new`}>
      <button>Create New Product</button>
    </Link>
    {userProducts.map(o => (
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
            to={`/products/${o.id}/edit`}
            >
              <button>edit</button>
            </Link>
            <OpenModalButton
            buttonText='Delete'
            modalComponent={<DeleteModal/>}
            />
          </div>
       </div>
    ))}
  </div>
  );
}

export default StorePage;
