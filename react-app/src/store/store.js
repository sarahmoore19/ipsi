// constants
const SET_USER_STORES = "store/SET_USER_STORES";
const SET_STORE = "store/SET_STORE";
const CREATE_STORE = "store/CREATE_STORE";
const UPDATE_STORE = "store/UPDATE_STORE";
const DELETE_STORE = "store/DELETE_STORE";

const setUserStores1 = (obj) => ({
	type: SET_USER_STORES,
	obj
});

const setStore1 = (arr) => ({
	type: SET_STORE,
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

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

state = {
  userStores: {},
  store: {}
}

export default function reducer(state = initialState, action) {
    let newState
	switch (action.type) {
		case SET_USER_STORES:
			return { user: action.payload };
		case SET_STORE:
			return { user: null };
        case CREATE_STORE:
            return { user: null };
        case UPDATE_STORE:
            return { user: null };
        case DELETE_STORE:
            return { user: null };
		default:
			return state;
	}
}
