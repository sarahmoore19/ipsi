const SET_ALL_PRODUCTS = "product/SET_ALL_PRODUCTS";
const SET_PRODUCT = "product/SET_PRODUCT";
const CREATE_PRODUCT = "product/CREATE_PRODUCT";
const UPDATE_PRODUCT = "product/UPDATE_PRODUCT";
const DELETE_PRODUCT = "product/DELETE_PRODUCT";

const setAllProducts1 = (arr) => ({
	type: SET_ALL_PRODUCTS,
	arr
});

const setProduct1 = (obj) => ({
	type: SET_PRODUCT,
  obj
});

const createProduct1 = (obj) => ({
	type: CREATE_PRODUCT,
	obj
});

const updateProduct1 = (obj) => ({
	type: UPDATE_PRODUCT,
	obj
});

const deleteProduct1 = (id) => ({
	type: DELETE_PRODUCT,
	id
});


export const setAllProducts = () => async (dispatch) => {
	const response = await fetch("/api/products/all");
	if (response.ok) {
	  const data = await response.json();
	  dispatch(setAllProducts1(data));
      return null;
	}
};

export const setProduct = (productId) => async (dispatch) => {
	const response = await fetch(`/api/products/${productId}`);
	if (response.ok) {
		const data = await response.json();
	  dispatch(setProduct1(data));
    return null;
	}
};


export const createProduct = (formData) => async (dispatch) => {
	const response = await fetch("/api/products", {
		method: "POST",
		body: formData,
	});
  const data = await response.json();
	if (response.ok) {
		dispatch(createProduct1(data));
		return null;
	}
  else if (response.status < 500) {
		if (data.errors) {
			return data.errors;
		}
	}
  else {
		return ["An error occurred. Please try again."];
	}
};

export const updateProduct = (formData, productId) => async (dispatch) => {
	const response = await fetch(`/api/products/${productId}`, {
		method: "PUT",
		body: formData,
	});
  const data = await response.json();
	if (response.ok) {
		dispatch(updateProduct1(data));
		return null;
	}
  else if (response.status < 500) {
		if (data.errors) {
			return data.errors;
		}
	}
  else {
		return ["An error occurred. Please try again."];
	}
};

export const deleteProduct = (productId) => async (dispatch) => {
	const response = await fetch(`/api/products/${productId}`, {
		method: "DELETE",
	});
  const data = await response.json();
	if (response.ok) {
		dispatch(deleteProduct1(productId));
		return null;
	}
  else {
		return ["An error occurred. Please try again."];
	}
};

const initialState = {
  allProducts: {},
  product: {}
}

export default function reducer(state = initialState, action) {
    let newState;
	switch (action.type) {
	case SET_ALL_PRODUCTS:
      newState = {product: {...state.product}, allProducts: {}}
      for (let obj of action.arr) {
        newState.allProducts[obj.id] = obj
      }
	  return newState
	case SET_PRODUCT:
      newState = {product: {...action.obj}, allProducts: {...state.allProducts}}
	  return newState
    case CREATE_PRODUCT:
      newState = {product: {...state.product}, allProducts: {...state.allProducts}}
      newState.allProducts[action.obj.id] = action.obj
	  return newState
    case UPDATE_PRODUCT:
      newState = {product: {...state.product}, allProducts: {...state.allProducts}}
      newState.allProducts[action.obj.id] = action.obj
	  return newState
    case DELETE_PRODUCT:
      newState = {product: {...state.product}, allProducts: {...state.allProducts}}
      delete newState.allProducts[action.id]
	  return newState
	default:
	    return state;
	}
}
