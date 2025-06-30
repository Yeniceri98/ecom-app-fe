const initialState = {
	productLoading: false,
	categoryLoading: false,
	addressLoading: false,
	productErrorMessage: null,
	categoryErrorMessage: null,
	addressErrorMessage: null,
	btnLoader: false,
};

const loadingAndErrorsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_PRODUCTS_REQUEST':
			return {
				...state,
				productLoading: true,
				productErrorMessage: null,
			};
		case 'FETCH_CATEGORIES_REQUEST':
			return {
				...state,
				categoryLoading: true,
				categoryErrorMessage: null,
			};

		case 'FETCH_PRODUCTS_SUCCESS':
			return {
				...state,
				productLoading: false,
				productErrorMessage: null,
			};
		case 'FETCH_CATEGORIES_SUCCESS':
			return {
				...state,
				categoryLoading: false,
				categoryErrorMessage: null,
			};

		case 'FETCH_PRODUCTS_ERROR':
			return {
				...state,
				productLoading: false,
				productErrorMessage: action.payload,
			};
		case 'FETCH_CATEGORIES_ERROR':
			return {
				...state,
				categoryLoading: false,
				categoryErrorMessage: action.payload,
			};
		case 'ADD_ADDRESS_REQUEST':
			return { ...state, btnLoader: true };
		case 'ADD_ADDRESS_SUCCESS':
			return {
				...state,
				addressLoading: false,
				addressErrorMessage: null,
				btnLoader: false,
			};
		default:
			return state;
	}
};

export default loadingAndErrorsReducer;
