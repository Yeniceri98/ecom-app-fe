import api from '../../api/api';

export const getAllProducts = (queryString) => async (dispatch) => {
	try {
		dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

		const urlParams = new URLSearchParams(queryString);
		const pageNumber = urlParams.get('page')
			? Number(urlParams.get('page')) - 1
			: 0;
		const pageSize = urlParams.get('size') ? Number(urlParams.get('size')) : 6;

		// Remove page and size from queryString to avoid duplication
		urlParams.delete('page');
		urlParams.delete('size');
		const filteredQueryString = urlParams.toString();

		const { data } = await api.get(
			`/public/products?pageNumber=${pageNumber}&pageSize=${pageSize}${
				filteredQueryString ? `&${filteredQueryString}` : ''
			}`
		);

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
