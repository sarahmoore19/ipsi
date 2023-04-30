import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from '../../store/product'

import { useModal } from '../../context/Modal.js'
import './index.css'

function AddProductImageModal({productId}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])
    const formData = new FormData();
    formData.append("image", image);
    formData.append("productId", productId);
    setImageLoading(true);
    let response = await dispatch(productActions.createProductImage(formData))
    if (response) {
      setImageLoading(false);
      setErrors(response)
    }
    else closeModal()
  }

  return (
  <div className='addProductImageModal'>
    <h1>Add Product Image</h1>
    <div className="productImageErrors">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
    </div>
    <form
    className="addProductImageForm"
    onSubmit={handleSubmit}>
    <input
    required
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}/>
    <button
    type='button'
    onClick={closeModal}>
      Cancel
    </button>
    <button
    type='submit'>
      Add Image
    </button>
    </form>
    {(imageLoading)&& <p>Loading, please do not click anything.</p>}
  </div>
  );
}

export default AddProductImageModal;
