const initialState = {
	categories: null,
	pagination: {},
};

const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_CATEGORIES':
			return {
				...state,
				categories: action.payload,
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

export default categoryReducer;
