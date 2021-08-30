import axios from 'axios';
import {store} from '../store';
import {catchUnAuthError} from 'mobile-inspections-base-ui';
import {paths} from '../constants/paths';
import {fileDownload} from './fileDownload';

const DEFAULT_HEADERS = {
	'Content-type': 'application/json',
	userId: 10,
	Authorization: 'Bearer 698937c6-8a66-4301-bf9c-ff780a925eac',
};

const getAuth = () => store.getState().auth;
const getAccessToken = () => getAuth().access_token;
const getRefreshToken = () => getAuth().refresh_token;
const setUser = (data) => {
	store.dispatch({
		type: 'SET_USER',
		payload: data,
	});
};

const getAuthorizationHeaders = () => ({
	Authorization:
		getAuth() && getAuth().access_token
			? `Bearer ${getAuth().access_token}`
			: null,
	userId: getAuth() && getAuth().userId ? getAuth().userId : 1,
});

const getCatchParams = () => ({
	refreshToken: getRefreshToken(),
	setUser,
	loginPath: paths.LOGIN.path,
});

export const instance = axios.create({
	baseURL: '/',
	timeout: 1200000,
	headers: DEFAULT_HEADERS,
});

export const genericRequest = (options) => {
	return instance({
		...options,
		headers: getAuthorizationHeaders(),
	})
		.then((response) => response)
		.catch(catchUnAuthError(getCatchParams(), options, getAccessToken()));
};

export const genericUploadRequest = (url, data) => {
	const formData = new FormData();
	formData.append('file', data.file);
	formData.append('dataObject', JSON.stringify(data.dataObject));
	// console.log('genericUploadRequest => ', data);
	const options = {
		url,
		method: 'POST',
		data: formData,
		headers: getAuthorizationHeaders(),
	};
	return instance(options).catch(
		catchUnAuthError(getCatchParams(), options, getAccessToken())
	);
};

export const genericDownloadRequest = (options) => {
	return genericRequest({
		...options,
		responseType: 'blob',
	}).then((response) => {
		const contentDisposition =
			response.headers && response.headers['content-disposition']
				? response.headers['content-disposition']
				: undefined;

		let fileName = 'filename';
		if (contentDisposition) {
			const startIndex =
				contentDisposition.indexOf("filename*=UTF-8''") + 17; // Adjust '+ 10' if filename is not the right one.
			const endIndex = contentDisposition.length; //Check if '- 1' is necessary
			const rawFileName = contentDisposition.substring(
				startIndex,
				endIndex
			);
			// console.log("rawFileName: ", rawFileName);

			// fileName = decodeURIComponent(escape(atob(rawFileName)));
			fileName = decodeURIComponent(rawFileName);
			// console.log("fileName: ", fileName);
		}
		fileDownload(response.data, fileName);
	});
};
