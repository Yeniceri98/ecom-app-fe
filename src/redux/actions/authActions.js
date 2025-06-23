import api from '../../api/api';

export const authenticateSignInUser =
	(sendData, reset, navigate, setLoader, toast) => async (dispatch) => {
		try {
			setLoader(true);
			const { data } = await api.post('/auth/login', sendData);
			dispatch({
				type: 'LOGIN_USER',
				payload: data,
			});
			localStorage.setItem('auth', JSON.stringify(data));
			reset();
			toast.success('Login Success');
			navigate('/');
		} catch (error) {
			console.log('Error Occured', error);
			toast.error(error?.response.data.message || 'Internal Server Error');
		} finally {
			setLoader(false);
		}
	};
