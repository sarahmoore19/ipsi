import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams, useLocation, useHistory  } from "react-router-dom";
import * as storeActions from '../../store/store'

function StoreForm() {
  const { storeId } = useParams()
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const store = useSelector((state) => state.stores.userStores)[storeId]
  let context = 'post'
  if (storeId) context = 'update'

  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [descripton, setDescription] = useState(null);

  useEffect(async () => {
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

    let response;
    if (context === 'post') {
      formData.append("storeId", storeId);
      response = await dispatch(storeActions.createStore(formData))
    }
    else {
      response = await dispatch(storeActions.updateStore(formData, storeId))
    }
    if (response) {
      setImageLoading(false)
      setErrors(response)
    }
    else history.push(`/stores/user`)
  }

  return (
  <div>
    <h1>{context === 'post' ? `Create New Store` : `Update ${store?.name}`}</h1>
    <ul>
      {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    </ul>
    <form
    encType="multipart/form-data"
    onSubmit={handleSubmit}>
      <input
      required={context === 'post'}
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
      <textarea
      required={context === 'post'}
      placeholder="Description"
      value={descripton}
      onChange={(e) => setDescription(e.target.value)}
      />
      <div>
      <div>Main Image</div>
      <input
      required={context === 'post'}
      type="file"
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
      />
      </div>
      <button
      onClick={() => history.push('/stores/user')}
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
  );
}

export default StoreForm;
