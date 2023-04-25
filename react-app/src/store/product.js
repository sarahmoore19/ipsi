const SET_ALL_PRODUCTS = "product/SET_ALL_PRODUCTS";
const SET_PRODUCT = "product/SET_PRODUCT";
const CREATE_PRODUCT = "product/CREATE_PRODUCT";
const UPDATE_PRODUCT = "product/UPDATE_PRODUCT";
const DELETE_PRODUCT = "product/DELETE_PRODUCT";
const CREATE_PRODUCT_IMAGE = "product/CREATE_PRODUCT_IMAGE";
const DELETE_PRODUCT_IMAGE = "product/DELETE_PRODUCT_IMAGE";

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

const createProductImage1 = (obj) => ({
	type: CREATE_PRODUCT_IMAGE,
	obj
});

const deleteProductImage1 = (obj) => ({
	type: DELETE_PRODUCT_IMAGE,
	obj
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


export const createProductImage = (formData) => async (dispatch) => {
	const response = await fetch("/api/product-images", {
		method: "POST",
		body: formData,
	});

  const data = await response.json();
	if (response.ok) {
		dispatch(createProductImage1(data));
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

export const deleteProductImage = (productImageId) => async (dispatch) => {
	const response = await fetch(`/api/product-images/${productImageId}`, {
		method: "DELETE",
	});
  const data = await response.json();
	if (response.ok) {
		dispatch(deleteProductImage1(data));
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
	case DELETE_PRODUCT_IMAGE:
		newState = {product: {...state.product}, allProducts: {...state.allProducts}}
		if (newState.product.id == action.obj.productId) {
		  newState.product.images = newState.product.images.filter(o => o.id != action.obj.id)
		}
		return newState
	case CREATE_PRODUCT_IMAGE:
		newState = {product: {...state.product}, allProducts: {...state.allProducts}}
		if (newState.product.id == action.obj.productId) {
		  newState.product.images.push(action.obj)
		}
		return newState

	default:
	    return state;
	}
}
