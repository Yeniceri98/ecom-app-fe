const initialState = {
	user: null,
	address: [],
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_USER':
			return { ...state, user: action.payload };
		case 'LOGOUT_USER':
			return { user: null, address: null };
		case 'GET_USER_ADDRESSES':
			return { user: null, address: action.payload };
		default:
			return state;
	}
};

export default authReducer;
