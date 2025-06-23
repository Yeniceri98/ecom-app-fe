import { useState } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logoutHandler = () => {};

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
						<span>Profile</span>
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
		</>
	);
};
export default UserMenu;
