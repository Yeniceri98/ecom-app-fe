import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false }) => {
	const { user } = useSelector((state) => state.auth);

	if (publicPage) {
		return user && user.userId ? <Navigate to="/profile" /> : <Outlet />;
	} else {
		return user && user.userId ? <Outlet /> : <Navigate to="/login" />;
	}
};

export default PrivateRoute;
