import axios from 'axios';
import {store} from '../store';
import {catchUnAuthError, setUser} from 'mobile-inspections-base-ui';
import {paths} from '../constants/paths';

const DEFAULT_HEADERS = {
	'Content-type': 'application/json',
	userId: 10,
	Authorization: 'Bearer 698937c6-8a66-4301-bf9c-ff780a925eac',
};

const getAuth = () => store.getState().auth;
const getAccessToken = () => getAuth().access_token;
const getRefreshToken = () => getAuth().refresh_token;

export const instance = axios.create({
	baseURL: '/',
	timeout: 1200000,
	headers: DEFAULT_HEADERS,
});

export const genericRequest = (options) => {
	const accessToken = getAccessToken();
	const catchParams = {
		refreshToken: getRefreshToken(),
		setUser,
		loginPath: paths.LOGIN.path,
	};
	return instance({
		...options,
		headers: {
			Authorization: accessToken ? `Bearer ${accessToken}` : null,
			...{userId: getAuth() && getAuth().userId ? getAuth().userId : 1},
		},
	})
		.then((response) => response)
		.catch(catchUnAuthError(catchParams, options, accessToken));
};
