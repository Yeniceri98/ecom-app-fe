const initialState = {
	isLoading: false,
	errorMessage: null,
};

const loadingAndErrorsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_PRODUCTS_REQUEST':
			return {
				...state,
				isLoading: true,
				errorMessage: null,
			};
		case 'FETCH_PRODUCTS_SUCCESS':
			return {
				...state,
				isLoading: false,
				errorMessage: null,
			};
		case 'FETCH_PRODUCTS_ERROR':
			return {
				...state,
				isLoading: false,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
};

export default loadingAndErrorsReducer;
