import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/productReducer';
import loadingAndErrorsReducer from '../reducers/loadingAndErrorsReducer';
import categoryReducer from '../reducers/categoryReducer';

const store = configureStore({
	reducer: {
		products: productReducer,
		categories: categoryReducer,
		loadingAndErrors: loadingAndErrorsReducer,
	},
	preloadedState: {},
});

export default store;
