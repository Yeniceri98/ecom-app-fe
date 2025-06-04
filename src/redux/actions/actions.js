import api from '../../api/api';

export const getAllProducts = () => async (dispatch) => {
	try {
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
	} catch (error) {
		console.log('error:', error);
	}
};
