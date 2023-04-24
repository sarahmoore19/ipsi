import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from '../../store/product'
import * as storeActions from '../../store/store'

import { useModal } from '../../context/Modal.js'

function DeleteModal({id, context}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);

  const handleDelete = async () => {
    let response;
    if (context === 'store') {
      response = await dispatch(storeActions.deleteStore(id))
    }
    else {
      response = await dispatch(productActions.deleteProduct(id))
    }
    if (response) {
      setErrors(response)
    }
    else closeModal()
  }

  return (
  <div>
    <h2>Are you sure you would you like to delete this {context === 'store' ? 'Store' : 'Product'}?</h2>
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
