import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/productReducer';
import loadingAndErrorsReducer from '../reducers/loadingAndErrorsReducer';
import categoryReducer from '../reducers/categoryReducer';
import cartReducer from '../reducers/cartReducer';
import authReducer from '../reducers/authReducer';

// Added localStorage and initialState so that the products that the user added to the cart do not disappear when the page is refreshed
const cartItems = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

// Auth
const user = localStorage.getItem('auth')
	? JSON.parse(localStorage.getItem('auth'))
	: [];

const initialState = {
	carts: { cart: cartItems },
	auth: { user: user },
};

const store = configureStore({
	reducer: {
		products: productReducer,
		categories: categoryReducer,
		loadingAndErrors: loadingAndErrorsReducer,
		carts: cartReducer,
		auth: authReducer,
	},
	preloadedState: initialState,
});

export default store;
