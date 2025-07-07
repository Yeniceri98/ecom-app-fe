const initialState = {
	paymentMethod: null,
};

const paymentMethodReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_PAYMENT_METHOD':
			return {
				...state,
				paymentMethod: action.payload,
			};
		default:
			return state;
	}
};

export default paymentMethodReducer;
