const initialState = {
	user: null,
	address: [],
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_USER':
			return { ...state, user: action.payload };

		default:
			return state;
	}
};

export default authReducer;
