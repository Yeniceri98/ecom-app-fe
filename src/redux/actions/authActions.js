import api from '../../api/api';
import { getCartOfUser } from './cartActions';

// NOTE: No need a dispatch here since we redirect to login after registration. So we don't have a action type for register in reducer as well
export const registerUser =
	(sendData, reset, navigate, setLoader, toast) => async () => {
		try {
			setLoader(true);
			await api.post('/auth/register', sendData);
			reset();
			toast.success('Register Success');
			navigate('/login');
		} catch (error) {
			toast.error(error?.response.data.message || 'Internal Server Error');
		} finally {
			setLoader(false);
		}
	};

export const loginUser =
	(sendData, reset, navigate, setLoader, toast) => async (dispatch) => {
		try {
			setLoader(true);
			const { data } = await api.post('/auth/login', sendData);
			dispatch({
				type: 'LOGIN_USER',
				payload: data,
			});
			localStorage.setItem('auth', JSON.stringify(data));

			dispatch(getCartOfUser()); // User's cart will be fetched when logged-in

			reset();
			toast.success('Login Success');
			navigate('/');
		} catch (error) {
			toast.error(error?.response.data.message || 'Internal Server Error');
		} finally {
			setLoader(false);
		}
	};

export const logoutUser = (navigate, toast) => async (dispatch) => {
	try {
		await api.post('/auth/logout');
		dispatch({
			type: 'LOGOUT_USER',
		});
		localStorage.removeItem('auth');
		toast.success('Logout Success');
		navigate('/login');
	} catch (error) {
		toast.error(error?.response.data.message || 'Internal Server Error');
	}
};
