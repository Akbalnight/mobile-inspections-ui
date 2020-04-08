import {genericRequest} from './network';

export const monthReports = ({data, params}) =>
	genericRequest({
		url: '/api/commercial/archive-reports/search',
		method: 'POST',
		data,
		params
	});

export const addressesSearch = ({data, params}) =>
	genericRequest({
		url: '/api/catalogue/addresses/search',
		method: 'POST',
		data,
		params
	});
// http://10.5.121.80:34080/api/catalogue/heat-points/search?size=200&page=0
export const heatPointsSearch = ({data, params}) =>
	genericRequest({
		url: '/api/catalogue/heat-points/search',
		method: 'POST',
		data,
		params
	});
