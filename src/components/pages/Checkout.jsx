import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useEffect, useState } from 'react';
import AddressInfo from '../AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../redux/actions/addressActions';

const Checkout = () => {
	const steps = ['Address', 'Payment Method', 'Order Summary', 'Payment'];

	const [activeStep, setActiveStep] = useState(0);

	const dispatch = useDispatch();

	const { address } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getUserAddresses());
	}, [dispatch]);

	return (
		<Box sx={{ width: '100%', py: 4 }}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div className="mt-8">
				{activeStep === 0 && <AddressInfo address={address} />}
			</div>
		</Box>
	);
};

export default Checkout;

// https://mui.com/material-ui/react-stepper/
