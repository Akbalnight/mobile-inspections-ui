import {uuid} from '../../../utils/baseUtils';
import sha256 from 'js-sha256';

import {
	authorizeUrl,
	clientId,
	redirectUri
} from '../../../constants/auth.constants';

const Login = () => {
	// const code_verifier = '4cc9b165-1230-4607-873b-3a78afcf60c5'; //uuid();
	const code_verifier = uuid();
	localStorage.setItem('code_verifier', code_verifier);

	const code_challenge_sha256 = sha256(code_verifier);
	// console.log('code_challenge_sha256 =>', code_challenge_sha256);
	const code_challenge_base64 = btoa(code_challenge_sha256);
	console.log('code_challenge_base64 =>', code_challenge_base64);
	console.log(
		'code_challenge_demo   => YmRmMTkyODk4YjJhYmM4MWQyOGNlZWYxMWJmODExMTYyMWZjY2ZhMGNjMGJjZTZlMjAwMGZlMzdmODc0MjcwZQ=='
	);

	let authLink =
		'' +
		authorizeUrl +
		'?response_type=code' +
		`&client_id=${clientId}` +
		`&redirect_uri=${redirectUri}` +
		'&scope=read' +
		`&code_challenge=${code_challenge_base64}` +
		'&code_challenge_method=s256';

	console.log('authLink =>', authLink);

	window.location.href = authLink;
	return null;
};
export default Login;
