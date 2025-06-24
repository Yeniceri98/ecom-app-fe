import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputField from '../shared/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/actions/authActions';
import toast from 'react-hot-toast';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () => {
	const [loader, setLoader] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// react-hook-form
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
	});

	const registerHandler = (data) => {
		dispatch(registerUser(data, reset, navigate, setLoader, toast));
	};

	return (
		<div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
			<form
				onSubmit={handleSubmit(registerHandler)}
				className="sm:w-[450px] w-[360px] shadow py-8 sm:px-8 px-4 rounded-md">
				<div className="flex flex-col items-center justify-center space-y-4">
					<PersonAddIcon className="text-slate-800" sx={{ fontSize: 50 }} />
					<h1 className="text-slate-800 text-center font-mono lg:text-3xl text-2xl font-bold">
						Register Here
					</h1>
				</div>
				<hr className="mt-2 mb-5 text-black" />
				<div className="flex flex-col gap-5">
					<InputField
						id="username"
						label="Username"
						placeholder="Enter your username"
						message="Username is required"
						type="text"
						register={register}
						errors={errors}
						required
						min={3}
					/>
					<InputField
						id="email"
						label="Email"
						placeholder="Enter your email"
						message="Email is required"
						type="email"
						register={register}
						errors={errors}
						required
					/>
					<InputField
						id="password"
						label="Password"
						placeholder="Enter your password"
						message="Password is required"
						type="text"
						register={register}
						errors={errors}
						required
						min={4}
					/>
				</div>
				<button
					disabled={loader}
					className="bg-blue-500 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-300 transition-colors duration-200 rounded-sm mt-8 mb-3"
					type="submit">
					{loader ? <p>Loading</p> : <p>Register</p>}
				</button>
				<p className="text-center text-md text-slate-700 mt-8">
					Already have an account?
					<Link
						to="/login"
						className="font-semibold underline hover:text-black">
						<span> Sign in</span>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
