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
