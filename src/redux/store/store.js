import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/productReducer';
import loadingAndErrorsReducer from '../reducers/loadingAndErrorsReducer';

const store = configureStore({
	reducer: {
		products: productReducer,
		loadingAndErrors: loadingAndErrorsReducer,
	},
	preloadedState: {},
});

export default store;
