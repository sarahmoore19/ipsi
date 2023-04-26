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
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(async () => {
    setIsLoaded(false)
    await dispatch(productActions.setProduct(productId))
    setIsLoaded(true)
  }, [dispatch])

  if (!product?.id) return null
  let images = [{url: product.mainImage}, ...product.images]

  return (
  <>
   {isLoaded == true && (
   <div>
    <h1>{product.name}</h1>
    <img
    height='275px'
    width='400px'
    src={bigImage?.url || product.mainImage}/>
    { product.userId == sessionUser?.id && bigImage?.id &&
    <span
    title='Delete the image currently being displayed'>
    <OpenModalButton
    buttonText={<i class="fas fa-trash"></i>}
    modalComponent={<DeleteModal context='productImage' setBigImage={setBigImage} id={bigImage.id}/>}
    /></span>}
    <div>
    {images.map(i => (
      <img
      onClick={() => setBigImage(i)}
      height='75px'
      width='100px'
      src={i.url}/>
    ))}
    </div>
    { product.userId == sessionUser?.id &&
    <span
    title='Add an image for this product'>
    <OpenModalButton
    buttonText={<i class="fas fa-plus"></i>}
    modalComponent={<AddProductImageModal productId={productId}/>}
    /></span>}
    <div>
      <div>${product.price}</div>
      <h2>{product.description}</h2>
    </div>
  </div> )}
  </>
  );
}

export default ProductPage;
