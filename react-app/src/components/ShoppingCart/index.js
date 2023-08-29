import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import * as shoppingCartActions from '../../store/shoppingCart'
import ProductCard from "../ProductCard";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from '../DeleteModal'
import './index.css'

function ShoppingCartPage() {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);
    const shoppingCartArr = Object.values(shoppingCart)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(async () => {
      await dispatch(shoppingCartActions.setShoppingCart())
      setIsLoaded(true)
    }, [dispatch])

    const updateQuantity = (event, id) => {
      event.preventDefault();
      if (!!!event.target.quantity.value) return;
      dispatch(shoppingCartActions.updateShoppingCart(event.target.quantity.value, id))
    }

    return (
  <>
   {isLoaded == true && (
    <div>
      <div className="header">
      <h1>Shopping Cart</h1>
      </div>

      <div className="cartContainer" >
      {shoppingCartArr.map(o => (
        <div key={o.id} className="pr">
        <ProductCard
        productId={o.productId}
        />
        <div className="udCon">
            <div>
            <button>Quantity: {o.quantity}</button>
            <button
              onClick={() => dispatch(shoppingCartActions.deleteShoppingCart(o.id))}>
              Delete Item
            </button>
            </div>
            <div>
            <form
            onSubmit={event => updateQuantity(event, o.id)}>
            <input
            id='quantity'
            min='1'
            type='number'
            ></input>
            <button
            type="submit"
            >Update Quantity</button>
            </form>
            </div>
        </div>
        </div>
      ))}
      </div>
    </div>)}
  </>
    )
}

export default ShoppingCartPage;
