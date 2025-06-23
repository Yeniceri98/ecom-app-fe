import { useState } from 'react';
import {
	AppBar as MuiAppBar,
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	useTheme,
	Badge,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import GroupsIcon from '@mui/icons-material/Groups';
import LoginIcon from '@mui/icons-material/Login';
import StoreIcon from '@mui/icons-material/Store';
import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu';

const drawerWidth = 200;

function DrawerItem({ children }) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const { cart } = useSelector((state) => state.carts);
	const { user } = useSelector((state) => state.auth);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex', width: '100%', overflow: 'hidden' }}>
			<MuiAppBar
				position="fixed"
				sx={{
					zIndex: theme.zIndex.drawer + 1,
					transition: theme.transitions.create(['margin', 'width'], {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
					...(open && {
						width: `calc(100% - ${drawerWidth}px)`,
						marginLeft: `${drawerWidth}px`,
						transition: theme.transitions.create(['margin', 'width'], {
							easing: theme.transitions.easing.easeOut,
							duration: theme.transitions.duration.enteringScreen,
						}),
					}),
				}}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{ mr: 2, ...(open && { display: 'none' }) }}>
							<MenuIcon />
						</IconButton>
						<IconButton color="inherit" component={Link} to="/">
							<StoreIcon />
							<Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
								ASY ECOM
							</Typography>
						</IconButton>
					</Box>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<IconButton color="inherit" component={Link} to="/cart">
							<Badge badgeContent={cart?.length || 0} color="error">
								<ShoppingBasketIcon />
							</Badge>
							<Typography variant="subtitle2" sx={{ ml: 1 }}>
								Cart
							</Typography>
						</IconButton>

						{user && user.userId ? (
							<UserMenu />
						) : (
							<IconButton color="inherit" component={Link} to="/login">
								<LoginIcon />
								<Typography variant="subtitle2" sx={{ ml: 1 }}>
									Login
								</Typography>
							</IconButton>
						)}
					</Box>
				</Toolbar>
			</MuiAppBar>

			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}>
				<Toolbar />
				<div className="flex items-center justify-end p-1">
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					{[
						{ text: 'Home', icon: <HomeIcon />, path: '/' },
						{
							text: 'Products',
							icon: <ShoppingBasketIcon />,
							path: '/products',
						},
						{
							text: 'About',
							icon: <GroupsIcon />,
							path: '/about',
						},
					].map((item) => (
						<ListItem key={item.text} disablePadding>
							<ListItemButton component={Link} to={item.path}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					width: '100%',
					paddingTop: '64px', // Default AppBar Height
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
					marginLeft: `-${drawerWidth}px`,
					...(open && {
						transition: theme.transitions.create('margin', {
							easing: theme.transitions.easing.easeOut,
							duration: theme.transitions.duration.enteringScreen,
						}),
						marginLeft: 0,
					}),
				}}>
				{children}
			</Box>
		</Box>
	);
}
export default DrawerItem;
