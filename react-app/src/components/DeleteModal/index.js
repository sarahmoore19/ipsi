import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from '../../store/product'
import * as storeActions from '../../store/store'
import './index.css'

import { useModal } from '../../context/Modal.js'

function DeleteModal({id, context, setBigImage}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);

  const handleDelete = async () => {
    let response;
    if (context === 'store') {
      response = await dispatch(storeActions.deleteStore(id))
    }
    else if (context === 'product') {
      response = await dispatch(productActions.deleteProduct(id))
    }
    else {
      response = await dispatch(productActions.deleteProductImage(id))
      setBigImage(null)
    }
    if (response) {
      setErrors(response)
    }
    else closeModal()
  }

  return (
  <div className="deleteModalDiv">
    <h2>Are you sure you would you like to delete this
    {context === 'store' && ' store'}
    {context === 'product' && ' product'}
    {context === 'productImage' && ' image'}
    ?</h2>
    <ul>
      {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    </ul>
    <button
    onClick={closeModal}>
      No, cancel
    </button>
    <button
    onClick={handleDelete}
    >Yes, delete</button>
  </div>
  );
}

export default DeleteModal;
