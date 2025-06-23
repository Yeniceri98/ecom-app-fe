import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosLogIn } from 'react-icons/io';
import InputField from '../shared/InputField';
import { useDispatch } from 'react-redux';
import { authenticateSignInUser } from '../../redux/actions/authActions';
import toast from 'react-hot-toast';

const Login = () => {
	const [loader, setLoader] = useState(false);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	// react-hook-form
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
	});

	const loginHandler = async (data) => {
		dispatch(authenticateSignInUser(data, reset, navigate, setLoader, toast));
	};

	return (
		<div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
			<form
				onSubmit={handleSubmit(loginHandler)}
				className="sm:w-[450px] w-[360px] shadow py-8 sm:px-8 px-4 rounded-md">
				<div className="flex flex-col items-center justify-center space-y-4">
					<IoIosLogIn className="text-slate-800 text-5xl" />
					<h1 className="text-slate-800 text-center font-mono lg:text-3xl text-2xl font-bold">
						Login Here
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
					/>
				</div>
				<button
					disabled={loader}
					className="bg-blue-500 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-300 transition-colors duration-200 rounded-sm mt-8 mb-3"
					type="submit">
					{loader ? <p>Loading</p> : <p>Login</p>}
				</button>
				<p className="text-center text-md text-slate-700 mt-8">
					Don't have an account?
					<Link
						to="/register"
						className="font-semibold underline hover:text-black">
						<span> Sign up</span>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
