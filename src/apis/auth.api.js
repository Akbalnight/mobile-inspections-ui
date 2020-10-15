import axios from 'axios';
import {
	clientId,
	clientSecret,
	logoutUrl,
	redirectUri
} from '../constants/auth.constants';
import {paths} from '../constants/paths';
import {store} from '../store';
import {setCookie} from '../components/App/Cookie/cookie';

const BASIC_AUTH = `Basic ${btoa(clientId + ':' + clientSecret)}`;

const getAuth = () => store.getState().auth;
const getAccessToken = () => getAuth().access_token;
const getRefreshToken = () => getAuth().refresh_token;

const setUser = data => {
	store.dispatch({
		type: 'SET_USER',
		payload: data
	});
};

const logoutUser = () => {
	setUser({});
	window.location.href = logoutUrl;
};

export const accessTokenRequest = code => {
	let headers = {
		Authorization: BASIC_AUTH,
		'Content-Type': 'application/x-www-form-urlencoded'
	};
	let data = {
		grant_type: 'authorization_code',
		redirect_uri: redirectUri,
		code: code,
		code_verifier: localStorage.getItem('code_verifier')
	};
	return axios({
		url: '/api/oauth/token',
		method: 'POST',
		headers,
		params: data
	})
		.then(response => {
			return response;
		})
		.catch(error => {
			return error;
		});
};

export const refreshTokenRequest = refreshToken => {
	let headers = {
		Authorization: BASIC_AUTH,
		'Content-Type': 'application/x-www-form-urlencoded'
	};
	let data = {
		grant_type: 'refresh_token',
		refresh_token: refreshToken
	};
	return axios({
		url: '/api/oauth/token',
		method: 'POST',
		headers,
		params: data
	})
		.then(response => {
			console.log('Refresh Token response', response);

			// Save to redux-store and localStorage
			setUser(response.data);

			// Save to cookies
			setCookie('code_challenge', response.data.code_challenge, {
				path: '/'
			});

			window.location.reload();

			// Redirect to main page
			// history.push(paths.CONFIGURATION_LIST.path)
		})
		.catch(error => {
			console.log('Refresh Token catch', error);
			window.location.href = paths.LOGIN.path;
			return error;
		});
};

export const requestRevokeToken = () =>
	axios({
		url: '/api/oauth/revokeToken',
		headers: {
			Authorization: BASIC_AUTH,
			'Content-Type': 'application/json'
		},
		params: {
			token: getAccessToken()
		}
	}).then(response => {
		return response;
	});

export const checkTokenRequest = () => {
	let headers = {
		Authorization: BASIC_AUTH,
		'Content-Type': 'application/json'
	};
	let data = {
		token: getAccessToken()
	};
	return axios({
		url: '/api/oauth/checkToken',
		method: 'POST',
		headers,
		params: data
	})
		.then(response => {
			return response;
		})
		.catch(error => {
			if (error.response) {
				if (
					error.response.status === 401 ||
					error.response.status === 400
				) {
					// Выбросить пользователя
					requestRevokeToken()
						.then(() => logoutUser())
						.catch(() => logoutUser());
				}
			}
			return error;
		});
};

export const catchUnAuthError = (options, accessToken) => err => {
	if (err.response) {
		if (err.response.status === 401) {
			// auth redirect
			window.location.href = paths.LOGIN.path;
		} else if (err.response.status === 400 && err.response.data.error) {
			console.log('error.response.data => ', err.response.data);
			switch (err.response.data.error) {
				case 'invalid_token':
					refreshTokenRequest(getRefreshToken())
						.then(response => response)
						.catch();
					break;
				default:
					break;

				// case 'invalid_request' : break;
				// case 'invalid_client' : break;
				// case 'invalid_grant' : break;
				// case 'invalid_scope' : break;
				// case 'redirect_uri_mismatch' : break;

				// 	public static final String UNAUTHORIZED_CLIENT = "unauthorized_client";
				// 	public static final String UNSUPPORTED_GRANT_TYPE = "unsupported_grant_type";
				// 	public static final String INSUFFICIENT_SCOPE = "insufficient_scope";
				// 	public static final String UNSUPPORTED_RESPONSE_TYPE ="unsupported_response_type";
				// 	public static final String ACCESS_DENIED = "access_denied";
			}
		}
	}
};
