const initialState = {
	productLoading: false,
	categoryLoading: false,
	addressLoading: false,
	productErrorMessage: null,
	categoryErrorMessage: null,
	addressErrorMessage: null,
};

const loadingAndErrorsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PRODUCTS_REQUEST':
			return {
				...state,
				productLoading: true,
				productErrorMessage: null,
			};
		case 'CATEGORIES_REQUEST':
			return {
				...state,
				categoryLoading: true,
				categoryErrorMessage: null,
			};
		case 'ADDRESS_REQUEST':
			return {
				...state,
				addressLoading: true,
				addressErrorMessage: null,
			};

		case 'PRODUCTS_REQUEST_SUCCESS':
			return {
				...state,
				productLoading: false,
				productErrorMessage: null,
			};
		case 'CATEGORIES_REQUEST_SUCCESS':
			return {
				...state,
				categoryLoading: false,
				categoryErrorMessage: null,
			};
		case 'ADDRESS_REQUEST_SUCCESS':
			return {
				...state,
				addressLoading: false,
				addressErrorMessage: null,
			};

		case 'PRODUCTS_REQUEST_ERROR':
			return {
				...state,
				productLoading: false,
				productErrorMessage: action.payload,
			};
		case 'CATEGORIES_REQUEST_ERROR':
			return {
				...state,
				categoryLoading: false,
				categoryErrorMessage: action.payload,
			};
		case 'ADDRESS_REQUEST_ERROR':
			return {
				...state,
				addressLoading: false,
				addressErrorMessage: action.payload,
			};

		default:
			return state;
	}
};

export default loadingAndErrorsReducer;
