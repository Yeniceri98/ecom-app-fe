import api from '../../api/api';

export const addAddress =
	(sendData, setIsAddressModalOpen, toast) => async (dispatch) => {
		dispatch({ type: 'ADD_ADDRESS_REQUEST' });
		try {
			await api.post('/addresses', sendData);
			toast.success('Address Added Successfully');
			dispatch({ type: 'ADD_ADDRESS_SUCCESS' });
		} catch (error) {
			toast.error(error?.response.data.message || 'Internal Server Error');
			dispatch({ type: 'ADD_ADDRESS_ERROR', payload: null });
		} finally {
			setIsAddressModalOpen(false);
		}
	};

export const getUserAddresses = () => async (dispatch) => {
	try {
		dispatch({ type: 'FETCH_ADDRESSES_REQUEST' });

		const { data } = await api.get(`/user/addresses`);

		dispatch({
			type: 'GET_USER_ADDRESSES',
			payload: data,
		});

		dispatch({ type: 'FETCH_ADDRESSES_SUCCESS' });
	} catch (error) {
		dispatch({
			type: 'FETCH_ADDRESSES_ERROR',
			payload:
				error?.response?.data?.message || 'Failed to fetch user addresses',
		});
	}
};
