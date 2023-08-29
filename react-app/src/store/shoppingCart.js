// constants
const SET_SHOPPING_CART = "shopping_cart/SET_SHOPPING_CART";
const CREATE_SHOPPING_CART = "shopping_cart/CREATE_SHOPPING_CART";
const UPDATE_SHOPPING_CART = "shopping_cart/UPDATE_SHOPPING_CART";
const DELETE_SHOPPING_CART = "shopping_cart/DELETE_SHOPPING_CART";

const setShoppingCart1 = (arr) => ({
	type: SET_SHOPPING_CART,
	arr
});

const createShoppingCart1 = (obj) => ({
	type: CREATE_SHOPPING_CART,
	obj
});

const updateShoppingCart1 = (obj) => ({
	type: UPDATE_SHOPPING_CART,
	obj
});

const deleteShoppingCart1 = (id) => ({
	type: DELETE_SHOPPING_CART,
	id
});


export const setShoppingCart = () => async (dispatch) => {
	const response = await fetch("/api/shopping-carts/user");
	if (response.ok) {
	  const data = await response.json();
	  dispatch(setShoppingCart1(data));
      return null;
	}
};

export const createShoppingCart = (productId) => async (dispatch) => {
	const response = await fetch("/api/shopping-carts/user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({productId}),
	});
  const data = await response.json();
	if (response.ok) {
		dispatch(createShoppingCart1(data));
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

export const updateShoppingCart = (quantity, shoppingCartId) => async (dispatch) => {
	const response = await fetch(`/api/shopping-carts/${shoppingCartId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({quantity}),
	});
  const data = await response.json();
	if (response.ok) {
		dispatch(updateShoppingCart1(data));
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

export const deleteShoppingCart = (shoppingCartId) => async (dispatch) => {
	const response = await fetch(`/api/shopping-carts/${shoppingCartId}`, {
		method: "DELETE"
	});
  const data = await response.json();
	if (response.ok) {
		dispatch(deleteShoppingCart1(shoppingCartId));
		return null;
	}
  else {
		return ["An error occurred. Please try again."];
	}
};

const initialState = {
  shoppingCart: {},
}

export default function reducer(state = initialState, action) {
    let newState;
	switch (action.type) {
	case SET_SHOPPING_CART:
      newState = {shoppingCart: {}}
      for (let obj of action.arr) {
        newState.shoppingCart[obj.id] = obj
      }
		return newState

    case CREATE_SHOPPING_CART:
      newState = {shoppingCart: {...state.shoppingCart}}
      newState.shoppingCart[action.obj.id] = action.obj
		return newState

    case UPDATE_SHOPPING_CART:
      newState = {shoppingCart: {...state.shoppingCart}}
      newState.shoppingCart[action.obj.id] = action.obj
		return newState

    case DELETE_SHOPPING_CART:
      newState = {shoppingCart: {...state.shoppingCart}}
      delete newState.shoppingCart[action.id]
		return newState

		default:
			return state;
	}
}
