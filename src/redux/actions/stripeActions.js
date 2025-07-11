import api from '../../api/api';

export const createPaymentIntent = (totalPrice, toast) => async (dispatch) => {
	try {
		dispatch({ type: 'STRIPE_REQUEST' });
		const { data } = await api.post('/order/payment-intent', {
			amount: Number(totalPrice) * 100,
			currency: 'usd',
		});
		dispatch({ type: 'STRIPE_REQUEST_SUCCESS' });
		dispatch({ type: 'CLIENT_SECRET', payload: data });
		localStorage.setItem('client-secret', JSON.stringify(data));
	} catch (error) {
		dispatch({ type: 'STRIPE_REQUEST_ERROR' });
		toast.error(
			error?.response.data.message || 'Failed to create client secret'
		);
	}
};

// orderProducts api in backend
export const stripePaymentConfirmation =
	(sendData, setErrorMessage, toast) => async (dispatch) => {
		try {
			const response = await api.post('/order/users/payments/online', sendData);
			if (response.data) {
				// Since the order is placed and localStore need to be cleared
				localStorage.removeItem('CHECKOUT_ADDRESS');
				localStorage.removeItem('cartItems');
				localStorage.removeItem('client-secret');
				dispatch({ type: 'REMOVE_CLIENT_SECRET_ADDRESS' });
				dispatch({ type: 'CLEAR_CART' });
				toast.success('Order Received');
			} else {
				setErrorMessage('Payment Failed! Please try again...');
			}
		} catch (error) {
			toast.error(error?.response.data.message || 'Failed to payment');
		}
	};
