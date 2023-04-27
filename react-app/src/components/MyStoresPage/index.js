import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import * as storeActions from '../../store/store'
import StoreCard from '../StoreCard'
import DeleteModal from '../DeleteModal'
import OpenModalButton from "../OpenModalButton";

function MyStoresPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const stores = Object.values(useSelector((state) => state.stores.userStores))
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(async () => {
    await dispatch(storeActions.setUserStores())
    setIsLoaded(true)
  }, [dispatch])

  return (
    <>
   {isLoaded == true && (
    <div>
      <h1>My Stores</h1>
      <Link
      to={`/stores/new`}>
        <button>Create New Store</button>
      </Link>
    {(stores.length == 0) && <h1>Create your first store!</h1>}
      {stores.map(o => (
        <div>
          <Link
          key={o.id}
          to={`/stores/${o.id}`}>
            <StoreCard
            storeId={o.id}/>
          </Link>
          <div>
            <Link
            to={`/stores/${o.id}/edit`}>
              <button>Edit Store</button>
            </Link>
            <OpenModalButton
            buttonText='Delete Store'
            modalComponent={<DeleteModal id={o.id} context='store'/>}
            />
          </div>
        </div>
      ))}
    </div>)}
  </>
  );
}

export default MyStoresPage;
