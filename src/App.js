import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/pages/Products';
import Home from './components/pages/Home';
import DrawerItem from './components/shared/DrawerItem';
import About from './components/pages/About';
import { Toaster } from 'react-hot-toast';
import Cart from './components/pages/Cart';
import Login from './components/pages/Login';

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
						<Route path="/login" element={<Login />} />
					</Routes>
				</DrawerItem>
			</Router>
			<Toaster position="bottom-center" />
		</>
	);
}

export default App;
