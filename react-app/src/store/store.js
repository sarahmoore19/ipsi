// constants
const SET_USER_STORES = "store/SET_USER_STORES";
const CREATE_STORE = "store/CREATE_STORE";
const UPDATE_STORE = "store/UPDATE_STORE";
const DELETE_STORE = "store/DELETE_STORE";

const setUserStores1 = (arr) => ({
	type: SET_USER_STORES,
	arr
});

const createStore1 = (obj) => ({
	type: CREATE_STORE,
	obj
});

const updateStore1 = (obj) => ({
	type: UPDATE_STORE,
	obj
});

const deleteStore1 = (id) => ({
	type: DELETE_STORE,
	id
});


export const setUserStores = () => async (dispatch) => {
	const response = await fetch("/api/stores/user");
	if (response.ok) {
		const data = await response.json();
	  dispatch(setUserStores1(data));
    return null;
	}
};

export const createStore = (formData) => async (dispatch) => {
	const response = await fetch("/api/stores", {
		method: "POST",
		body: formData,
	});
  const data = await response.json();
	if (response.ok) {
		dispatch(createStore1(data));
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

export const updateStore = (formData, storeId) => async (dispatch) => {
	const response = await fetch(`/api/stores/${storeId}`, {
		method: "PUT",
		body: formData,
	});
  const data = await response.json();
	if (response.ok) {
		dispatch(updateStore1(data));
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

export const deleteStore = (storeId) => async (dispatch) => {
	const response = await fetch(`/api/stores/${storeId}`, {
		method: "DELETE"
	});
  const data = await response.json();
	if (response.ok) {
		dispatch(deleteStore1(storeId));
		return null;
	}
  else {
		return ["An error occurred. Please try again."];
	}
};

const initialState = {
  userStores: {},
}

export default function reducer(state = initialState, action) {
    let newState;
	switch (action.type) {
		case SET_USER_STORES:
      newState = {userStores: {}}
      for (let obj of action.arr) {
        newState.userStores[obj.id] = obj
      }
			return newState
    case CREATE_STORE:
      newState = {userStores: {...state.userStores}}
      newState.userStores[action.obj.id] = action.obj
			return newState
    case UPDATE_STORE:
      newState = {userStores: {...state.userStores}}
      newState.userStores[action.obj.id] = action.obj
			return newState
    case DELETE_STORE:
      newState = {userStores: {...state.userStores}}
      delete newState.userStores[action.id]
			return newState
		default:
			return state;
	}
}
