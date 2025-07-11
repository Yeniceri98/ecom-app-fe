import { useState } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Backdrop from './shared/Backdrop';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import toast from 'react-hot-toast';

const UserMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logoutHandler = () => {
		dispatch(logoutUser(navigate, toast));
	};

	return (
		<>
			<Avatar onClick={handleClick} />

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						'aria-labelledby': 'basic-button',
					},
				}}>
				<Link to="/profile">
					<MenuItem onClick={handleClose}>
						<AccountCircleIcon className="mr-2" />
						<span>{user.username}</span>
					</MenuItem>
				</Link>
				<Link to="/profile/orders">
					<MenuItem onClick={handleClose}>
						<ShoppingCartCheckoutIcon className="mr-2" />
						<span>Orders</span>
					</MenuItem>
				</Link>
				<MenuItem onClick={logoutHandler}>
					<LogoutIcon className="mr-2" />
					<span>Logout</span>
				</MenuItem>
			</Menu>

			{open && <Backdrop />}
		</>
	);
};
export default UserMenu;
