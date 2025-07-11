import { useState } from 'react';
import { Skeleton } from '@mui/material';
import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';

const PaymentForm = ({ clientSecret, totalPrice }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) return;

		const { error: submitError } = await elements.submit();

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${process.env.REACT_APP_FRONTEND_URL}/order-confirm`,
			},
		});

		if (error) {
			setErrorMessage(error.message);
			return false;
		}
	};

	const paymentElementOptions = {
		layout: 'tabs',
	};

	const isLoading = !clientSecret || !stripe || !elements;

	return (
		<form onSubmit={handleSubmit} className="max-w-lg mx-auto o-4">
			<h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
			{isLoading ? (
				<>
					<Skeleton variant="text" width="80%" height={24} />
					<Skeleton variant="text" width="60%" height={24} />
					<Skeleton variant="rectangular" width="100%" height={60} />
					<Skeleton variant="text" width="40%" height={24} />
				</>
			) : (
				<>
					{clientSecret && <PaymentElement options={paymentElementOptions} />}

					{errorMessage && (
						<div className="text-red-500 mt-2">{errorMessage}</div>
					)}

					<button
						className="text-white w-full px-5 py-[10px] bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
						disabled={!stripe || isLoading}>
						{!isLoading
							? `Pay $${Number(totalPrice).toFixed(2)}`
							: 'Processing...'}
					</button>
				</>
			)}
		</form>
	);
};

export default PaymentForm;
