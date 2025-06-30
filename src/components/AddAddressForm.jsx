import { useForm } from 'react-hook-form';
import InputField from './shared/InputField';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../redux/actions/addressActions';
import toast from 'react-hot-toast';

const AddAddressForm = ({ address, setIsAddressModalOpen }) => {
	const { btnLoader } = useSelector((state) => state.loadingAndErrors);

	const dispatch = useDispatch();

	// react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
	});

	const submitHandler = (data) => {
		dispatch(addAddress(data, setIsAddressModalOpen, toast));
	};

	return (
		<form
			onSubmit={handleSubmit(submitHandler)}
			className="sm:w-[450px] w-[360px] shadow py-8 sm:px-8 px-4 rounded-md">
			<div className="flex flex-col items-center justify-center space-y-4">
				<FaAddressCard className="text-slate-800 text-5xl" />
				<h1 className="text-slate-800 text-center font-mono lg:text-3xl text-2xl font-bold">
					Add Address
				</h1>
			</div>
			<hr className="mt-2 mb-5 text-black" />
			<div className="flex flex-col gap-5">
				<InputField
					id="buildingName"
					label="Building Name"
					placeholder="Enter your building name"
					message="Building Name is required"
					type="text"
					register={register}
					errors={errors}
					required
				/>
				<InputField
					id="city"
					label="City"
					placeholder="Enter your city"
					message="City is required"
					type="text"
					register={register}
					errors={errors}
					required
				/>
				<InputField
					id="state"
					label="State"
					placeholder="Enter your state"
					message="State is required"
					type="text"
					register={register}
					errors={errors}
					required
				/>
				<InputField
					id="zipcode"
					label="Zipcode"
					placeholder="Enter your zipcode"
					message="Zipcode is required"
					type="text"
					register={register}
					errors={errors}
					required
				/>
				<InputField
					id="streetName"
					label="Street"
					placeholder="Enter your street"
					message="Street is required"
					type="text"
					register={register}
					errors={errors}
					required
				/>
				<InputField
					id="country"
					label="Country"
					placeholder="Enter your country"
					message="Country is required"
					type="text"
					register={register}
					errors={errors}
					required
				/>
			</div>
			<button
				disabled={btnLoader}
				className="bg-blue-500 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-300 transition-colors duration-200 rounded-sm mt-8 mb-3"
				type="submit">
				{btnLoader ? (
					<p className="text-white font-medium">Loading...</p>
				) : (
					<p className="text-white font-medium">Save Address</p>
				)}
			</button>
		</form>
	);
};

export default AddAddressForm;
