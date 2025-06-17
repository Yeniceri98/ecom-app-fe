import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/pages/Products';
import Home from './components/pages/Home';
import DrawerItem from './components/shared/DrawerItem';
import About from './components/pages/About';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<>
			<Router>
				<DrawerItem>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/products" element={<Products />} />
						<Route path="/about" element={<About />} />
					</Routes>
				</DrawerItem>
			</Router>
			<Toaster position="bottom-center" />
		</>
	);
}

export default App;
