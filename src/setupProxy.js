const {createProxyMiddleware} = require('http-proxy-middleware');

const API_URL = 'http://10.5.121.117';
// const LOCAL_API_URL = 'http://localhost';

const OAUTH_URL = 'https://oauth.dias-dev.ru';

module.exports = function(app) {
	app.use(
		'/api/catalog',
		createProxyMiddleware({
			target: `${API_URL}:8803/catalog`,
			pathRewrite: {'^/api/catalog': ''}
		})
	);
	app.use(
		'/api/dynamicdq',
		createProxyMiddleware({
			target: `${API_URL}:8804/dynamicdq`,
			pathRewrite: {'^/api/dynamicdq': ''}
		})
	);
	app.use(
		'/api/management-dynamicdq',
		createProxyMiddleware({
			target: `${API_URL}:8805/management-dynamicdq`,
			pathRewrite: {'^/api/management-dynamicdq': ''}
		})
	);
	app.use(
		'/api/oauth',
		createProxyMiddleware({
			target: `${OAUTH_URL}/oauth`,
			pathRewrite: {'^/api/oauth': ''},
			changeOrigin: true,
			secure: false
		})
	);
};
