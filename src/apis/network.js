import axios from 'axios';

const DEFAULT_HEADERS = {
	'Content-type': 'application/json',
	userId: 1
};

export const instance = axios.create({
	baseURL: '/',
	timeout: 1200000,
	headers: DEFAULT_HEADERS
});

export const genericRequest = options => {
	const accessToken = 'Gop Token'; //getAccessToken();
	return instance({
		...options,
		headers: {
			Authorization: `Bearer ${accessToken}`
			// ...{userId: getAuth() && getAuth().userId ? getAuth().userId : 10}
		}
	});
	// .then(result => {
	//     console.log("result", result);
	//     return result.data
	// })
	// .catch(error => {
	//     console.log("error", error);
	//     return error
	// });
};
