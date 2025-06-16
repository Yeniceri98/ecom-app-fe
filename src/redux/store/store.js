import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/productReducer';
import loadingAndErrorsReducer from '../reducers/loadingAndErrorsReducer';
import categoryReducer from '../reducers/categoryReducer';
import cartReducer from '../reducers/cartReducer';

// Added localStorage and initialState so that the products that the user added to the cart do not disappear when the page is refreshed
const cartItems = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const initialState = {
	carts: { cart: cartItems },
};

const store = configureStore({
	reducer: {
		products: productReducer,
		categories: categoryReducer,
		loadingAndErrors: loadingAndErrorsReducer,
		carts: cartReducer,
	},
	preloadedState: initialState,
});

export default store;
