import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
	baseURL: `${BASE_URL}/api`,
	withCredentials: true, // It allows cookies to be sent with the request sent from the browser.
});

export default api;
