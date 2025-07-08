import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethod } from '../redux/actions/paymentMethodActions';
import { useEffect } from 'react';
import { createOrUpdateCartWithItems } from '../redux/actions/cartActions';

const PaymentMethod = () => {
	const { paymentMethod } = useSelector((state) => state.paymentMethod);
	const { cart, cartId } = useSelector((state) => state.carts);
	const { cartLoading, cartErrorMessage } = (state) => state.loadingAndErrors;

	const dispatch = useDispatch();

	useEffect(() => {
		if (cart.length > 0 && !cartId && !cartErrorMessage) {
			const sendCartItems = cart.map((item) => {
				return {
					productId: item.productId,
					quantity: item.quantity,
				};
			});

			dispatch(createOrUpdateCartWithItems(sendCartItems));
		}
	}, [dispatch, cartId]);

	const handlePaymentMethodChange = (method) => {
		dispatch(setPaymentMethod(method));
	};

	return (
		<div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border">
			<h1 className="text-2xl font-semibold mb-4 text-center">
				Select Payment Method
			</h1>
			<FormControl>
				<RadioGroup
					aria-labelledby="payment method"
					name="paymentMethod"
					value={paymentMethod}
					onChange={(e) => handlePaymentMethodChange(e.target.value)}>
					<FormControlLabel
						value="stripe"
						control={<Radio color="primary" />}
						label="Stripe"
					/>
					<FormControlLabel
						value="paypal"
						control={<Radio color="primary" />}
						label="Paypal"
					/>
				</RadioGroup>
			</FormControl>
		</div>
	);
};

export default PaymentMethod;

// https://mui.com/material-ui/react-radio-button/
