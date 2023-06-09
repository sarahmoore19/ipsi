import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams, useLocation, useHistory  } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import * as storeActions from '../../store/store'
import './index.css'

function ProductForm() {
  const location = useLocation()
  const { productId } = useParams()
  const dispatch = useDispatch();
  const history = useHistory()
  const { storeId, product } = location.state
  const sessionUser = useSelector((state) => state.session.user);
  const store = useSelector((state) => state.stores.userStores)[storeId]
  let context = 'post'
  if (productId) context = 'update'

  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(product?.name);
  const [descripton, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);

  useEffect(async () => {
    await dispatch(productActions.setAllProducts())
    await dispatch(storeActions.setUserStores())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])
    const formData = new FormData();
    if (image) {
      formData.append("mainImage", image);
      setImageLoading(true);
    }
    if (name) formData.append("name", name);
    if (descripton) formData.append("description", descripton);
    if (price) formData.append("price", price);

    let response;
    if (context === 'post') {
      formData.append("storeId", storeId);
      response = await dispatch(productActions.createProduct(formData))
    }
    else {
      response = await dispatch(productActions.updateProduct(formData, productId))
    }
    if (response) {
      setImageLoading(false)
      setErrors(response)
    }
    else history.push(`/stores/${storeId}`)
  }

  if (!store) return null

  return (
  <div>
    <h1 className="header">
      {context === 'post' ? `Create New Product For ${store?.name}` : `Update ${product?.name}`}
    </h1>
    <div className="formContainer">
    <div className="errors">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
    </div>
    <form
    className="form"
    encType="multipart/form-data"
    onSubmit={handleSubmit}>
      <label>
        {context === 'update' && <div>Name</div>}
        <input
        required={context === 'post'}
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}/>
      </label>
      <label>
        {context === 'update' && <div>Desciption</div>}
        <textarea
        required={context === 'post'}
        placeholder='Description'
        value={descripton}
        onChange={(e) => setDescription(e.target.value)}
      />
      </label>
      <label>
        {context === 'update' && <div>Price</div>}
        <input
        required={context === 'post'}
        type='number'
        placeholder='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}/>
      </label>
      <div>
        <span>Main Image</span>
        <input
        className="productFile"
        required={context === 'post'}
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}/>
      </div>
      <button
      onClick={() => history.push(`/stores/${storeId}`)}
      type="button">
        Cancel
      </button>
      <button
      type="submit">
        Submit
      </button>
      {(imageLoading)&& <p>Loading, please do not click anything.</p>}
    </form>
    </div>
  </div>
  );
}

export default ProductForm;
