import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import Home from './components/Home';
import DrawerItem from './components/shared/DrawerItem';

function App() {
	return (
		<Router>
			<DrawerItem>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
				</Routes>
			</DrawerItem>
		</Router>
	);
}

export default App;
