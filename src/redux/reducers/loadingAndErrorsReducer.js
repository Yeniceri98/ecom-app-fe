const initialState = {
	productLoading: false,
	categoryLoading: false,
	productErrorMessage: null,
	categoryErrorMessage: null,
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
		default:
			return state;
	}
};

export default loadingAndErrorsReducer;
