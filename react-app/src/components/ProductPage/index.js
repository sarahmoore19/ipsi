import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import DeleteModal from "../DeleteModal";
import OpenModalButton from "../OpenModalButton";
import AddProductImageModal from "../AddProductImageModal/AddProductImageModal";

function ProductPage({}) {
  const {productId} = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products.product)
  const [bigImage, setBigImage] = useState(null)

  useEffect(async () => {
    await dispatch(productActions.setProduct(productId))
  }, [dispatch])

  if (!product?.id) return null
  let images = [{url: product.mainImage}, ...product.images]

  return (
  <div>
    <h1>{product.name}</h1>
    <img
    height='275px'
    width='400px'
    src={bigImage?.url || product.mainImage}/>
    {images.map(i => (
      <img
      onClick={() => setBigImage(i)}
      height='75px'
      width='100px'
      src={i.url}/>
    ))}
    { product.userId == sessionUser?.id &&
    <OpenModalButton
    buttonText={<i class="fas fa-plus"></i>}
    modalComponent={<AddProductImageModal productId={productId}/>}
    />}
    <div>
      <div>${product.price}</div>
      <h2>{product.description}</h2>
    </div>
  </div>
  );
}

export default ProductPage;
