import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/pages/Products';
import Home from './components/pages/Home';
import DrawerItem from './components/shared/DrawerItem';
import About from './components/pages/About';
import { Toaster } from 'react-hot-toast';
import Cart from './components/pages/Cart';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/pages/Register';
import Checkout from './components/pages/Checkout';

function App() {
	return (
		<>
			<Router>
				<DrawerItem>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/products" element={<Products />} />
						<Route path="/about" element={<About />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/" element={<PrivateRoute publicPage />}>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</Route>
						<Route path="/" element={<PrivateRoute />}>
							<Route path="/checkout" element={<Checkout />} />
						</Route>
					</Routes>
				</DrawerItem>
			</Router>
			<Toaster position="bottom-center" />
		</>
	);
}

export default App;
