import api from '../../api/api';

export const getAllCategories = (queryString) => async (dispatch) => {
	try {
		dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });

		const { data } = await api.get(`/public/categories?${queryString}`);

		dispatch({
			type: 'GET_ALL_CATEGORIES',
			payload: data.content,
			pageNumber: data.pageNumber,
			pageSize: data.pageSize,
			totalElements: data.totalElements,
			totalPages: data.totalPages,
			lastPage: data.lastPage,
		});

		dispatch({ type: 'FETCH_CATEGORIES_SUCCESS' });
	} catch (error) {
		dispatch({
			type: 'FETCH_CATEGORIES_ERROR',
			payload: error?.response?.data?.message || 'Failed to fetch categories',
		});
	}
};
