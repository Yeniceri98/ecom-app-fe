import api from '../../api/api';

export const addUpdateUserAddress =
	(sendData, addressId, setIsAddressModalOpen, toast) => async (dispatch) => {
		dispatch({ type: 'ADD_UPDATE_ADDRESS_REQUEST' });
		try {
			if (!addressId) {
				await api.post('/addresses', sendData); // Add
			} else {
				await api.put(`/addresses/${addressId}`, sendData); // Update
			}
			toast.success('Address Saved Successfully');
			dispatch({ type: 'ADD_UPDATE_ADDRESS_SUCCESS' });
			dispatch(getUserAddresses()); // NOTE: Without this call, we needed to refresh page to see newly added or updated addresses
		} catch (error) {
			toast.error(error?.response.data.message || 'Internal Server Error');
			dispatch({ type: 'ADD_UPDATE_ADDRESS_ERROR', payload: null });
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

export const selectUserCheckoutAddress = (address) => {
	return {
		type: 'SELECT_CHECKOUT_ADDRESS',
		payload: address,
	};
};

export const deleteUserAddress =
	(addressId, setIsDeleteAddressModalOpen, toast) => async (dispatch) => {
		try {
			dispatch({ type: 'DELETE_ADDRESS_REQUEST' });
			await api.delete(`/addresses/${addressId}`);
			dispatch({ type: 'DELETE_ADDRESS_SUCCESS' });
			toast.success('Address Deleted Successfully');
			dispatch(getUserAddresses());
		} catch (error) {
			toast.error(error?.response.data.message || 'Internal Server Error');
			dispatch({ type: 'DELETE_ADDRESS_ERROR', payload: null });
		} finally {
			setIsDeleteAddressModalOpen(false);
		}
	};
