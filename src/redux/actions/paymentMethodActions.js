export const setPaymentMethod = (method) => {
	return {
		type: 'SET_PAYMENT_METHOD',
		payload: method,
	};
};
