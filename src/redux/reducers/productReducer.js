const initialState = {
	products: null,
	pagination: {},
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_PRODUCTS':
			return {
				...state,
				products: action.payload,
				pagination: {
					...state.pagination,
					pageNumber: action.pageNumber,
					pageSize: action.pageSize,
					totalElements: action.totalElements,
					totalPages: action.totalPages,
					lastPage: action.lastPage,
				},
			};
		default:
			return state;
	}
};

export default productReducer;
