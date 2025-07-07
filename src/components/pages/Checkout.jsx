import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Step,
	StepLabel,
	Stepper,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AddressInfo from '../AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../redux/actions/addressActions';
import PaymentMethod from '../PaymentMethod';

const Checkout = () => {
	const steps = ['Address', 'Payment Method', 'Order Summary', 'Payment'];

	const [activeStep, setActiveStep] = useState(0);

	const dispatch = useDispatch();

	const { address, selectedUserCheckoutAddress } = useSelector(
		(state) => state.auth
	);
	const { addressLoading, addressErrorMessage } = useSelector(
		(state) => state.loadingAndErrors
	);

	useEffect(() => {
		dispatch(getUserAddresses());
	}, [dispatch]);

	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const handleProceed = () => {
		setActiveStep((prev) => prev + 1);
	};

	// NOTE: The methods below added to separate each component according to different loading and error states
	const getStepErrorMessage = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return addressErrorMessage;
			default:
				return null;
		}
	};

	const isStepLoading = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return addressLoading;
			default:
				return false;
		}
	};

	const renderStepContent = (stepIndex) => {
		const errorMessage = getStepErrorMessage(stepIndex);

		// Error Occured
		if (errorMessage) {
			return (
				<Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
					<Alert severity="error" sx={{ minWidth: '300px' }}>
						{errorMessage}
					</Alert>
				</Box>
			);
		}

		// Loading State
		if (isStepLoading(stepIndex)) {
			return (
				<Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
					<CircularProgress />
				</Box>
			);
		}

		// Everything is OK
		switch (stepIndex) {
			case 0:
				return <AddressInfo address={address} />;
			case 1:
				return <PaymentMethod />;
			case 2:
				return <div>Order Summary Component</div>;
			case 3:
				return <div>Payment Component</div>;
			default:
				return null;
		}
	};

	return (
		<Box sx={{ width: '100%', py: 4 }}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>

			<div className="mt-8">{renderStepContent(activeStep)}</div>

			<div className="fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center px-4 h-24 py-4 border-t border-slate-500">
				<Button
					onClick={handleBack}
					variant="outlined"
					disabled={activeStep === 0}>
					Back
				</Button>
				{activeStep !== steps.length - 1 && (
					<Button
						onClick={handleProceed}
						variant="outlined"
						disabled={
							!selectedUserCheckoutAddress ||
							addressLoading ||
							addressErrorMessage
						}>
						Proceed
					</Button>
				)}
			</div>
		</Box>
	);
};

export default Checkout;

// https://mui.com/material-ui/react-stepper/
