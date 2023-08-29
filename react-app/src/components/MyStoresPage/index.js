import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import * as storeActions from '../../store/store'
import StoreCard from '../StoreCard'
import DeleteModal from '../DeleteModal'
import OpenModalButton from "../OpenModalButton";
import './index.css'

function MyStoresPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const stores = useSelector((state) => state.stores.userStores);
  const storesArr = Object.values(stores)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(async () => {
    await dispatch(storeActions.setUserStores())
    setIsLoaded(true)
  }, [dispatch])

  return (
  <>
   {isLoaded == true && (
    <div>
      <div className="header">
      <h1>My Stores</h1>
      </div>
      <div className="createButton">
      <Link
      to={{
        pathname: `/stores/new`,
        state: {}
      }}>
        <button>Create New Store</button>
      </Link>
      </div>
      <div className="allStoresDiv">
    {(storesArr.length == 0) && <h1>Create your first store!</h1>}
      {storesArr.map(o => (
        <div>
          <Link
          key={o.id}
          to={`/stores/${o.id}`}>
            <StoreCard
            storeId={o.id}/>
          </Link>
          <div className="buttonDiv">
            <Link
            to={{
              pathname: `/stores/${o.id}/edit`,
              state: { store: stores[o.id] }
            }}>
              <button>Edit Store</button>
            </Link>
            <OpenModalButton
            buttonText='Delete Store'
            modalComponent={<DeleteModal id={o.id} context='store'/>}
            />
          </div>
        </div>
      ))}
      </div>
    </div>)}
  </>
  );
}

export default MyStoresPage;
