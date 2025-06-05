import api from '../../api/api';

export const getAllProducts = () => async (dispatch) => {
	try {
		dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

		const { data } = await api.get('/public/products');

		dispatch({
			type: 'GET_ALL_PRODUCTS',
			payload: data.content,
			pageNumber: data.pageNumber,
			pageSize: data.pageSize,
			totalElements: data.totalElements,
			totalPages: data.totalPages,
			lastPage: data.lastPage,
		});

		dispatch({ type: 'FETCH_PRODUCTS_SUCCESS' });
	} catch (error) {
		dispatch({
			type: 'FETCH_PRODUCTS_ERROR',
			payload: error?.response?.data?.message || 'Failed to fetch products',
		});
	}
};
