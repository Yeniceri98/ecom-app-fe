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
