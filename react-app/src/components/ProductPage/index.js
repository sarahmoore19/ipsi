import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import DeleteModal from "../DeleteModal";
import OpenModalButton from "../OpenModalButton";
import AddProductImageModal from "../AddProductImageModal/AddProductImageModal";
import './index.css'

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
          <div className="header">
            <h1>{product.name}</h1>
          </div>
          <div className="productPage">
            <div className="productDiv">
              <div className='bigImg'>
                <img
                width='380px'
                src={bigImage?.url || product.mainImage}/>
                <span>
                  {product.userId == sessionUser?.id &&
                    <div
                    className="add"
                    title='Add an image for this product'>
                    <OpenModalButton
                    buttonText={<i class="fas fa-plus"></i>}
                    modalComponent={<AddProductImageModal productId={productId}/>}/>
                    </div>
                  }
                  { product.userId == sessionUser?.id && bigImage?.id &&
                    <div
                    className="trash"
                    title='Delete the image currently being displayed'>
                    <OpenModalButton
                    buttonText={<i class="fas fa-trash"></i>}
                    modalComponent={<DeleteModal context='productImage' setBigImage={setBigImage} id={bigImage.id}/>}/>
                    </div>
                  }
                </span>
              </div>
              <div className="imgs">
                {images.map(i => (
                  <img
                  className="smallImg"
                  onClick={() => setBigImage(i)}
                  height='85px'
                  width='85px'
                  src={i.url}/>
                ))}
              </div>
              <div className="priceDesc1">
                <div className="price">${product.price}</div>
                <div
                className="productDesc">
                  {product.description}
                </div>
              </div>
            </div>
          </div>
        </div>)}
    </>
  );
}

export default ProductPage;
