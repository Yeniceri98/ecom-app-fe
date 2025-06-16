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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';

const drawerWidth = 200;

function DrawerItem({ children }) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
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
						<Typography variant="h6" noWrap component="div">
							ASY ECOM
						</Typography>
					</Box>
				</Toolbar>
			</MuiAppBar>

			<Drawer variant="persistent" anchor="left" open={open}>
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
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
					marginLeft: open ? `${drawerWidth}px` : 0,
				}}>
				{children}
			</Box>
		</Box>
	);
}
export default DrawerItem;
