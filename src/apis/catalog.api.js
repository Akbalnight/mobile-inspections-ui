import {genericRequest, genericUploadRequest} from './network';
//
export const apiGetConfigByName = (configName) => () =>
	genericRequest({
		url: '/api/dynamicdq/configuration/' + configName,
		method: 'GET',
	});
export const apiGetDataByConfigName = ({
	hierarchical,
	lazyLoad,
	configName,
	data,
	params,
}) =>
	genericRequest({
		url: `/api/dynamicdq/data/${
			hierarchical && !lazyLoad ? 'hierarchical' : 'flat'
		}/${configName}`,
		method: 'POST',
		data,
		params,
	});

export const apiGetFlatDataByConfigName =
	(configName) =>
	({data, params}) =>
		apiGetDataByConfigName({
			configName: configName,
			hierarchical: false,
			lazyLoad: false,
			data,
			params,
		});

export const apiGetHierarchicalDataByConfigName =
	(configName) =>
	({data, params}) =>
		apiGetDataByConfigName({
			configName: configName,
			hierarchical: true,
			lazyLoad: false,
			data,
			params,
		});

export const apiSaveByConfigName =
	(catalogName) =>
	({method, data, params}) =>
		genericRequest({
			url: `/api/dynamicdq/data/save/${catalogName}`,
			method: method,
			data,
			params,
		});

export const apiGetDataFlatConfigManagement =
	(configName) =>
	({data, params}) =>
		genericRequest({
			url: `/api/management/data/flat/${configName}`,
			method: 'POST',
			data,
			params,
		});

export const apiGetUnAuthData = ({configName, mode, data, params}) =>
	genericRequest({
		url: `/api/dynamicdq/unauthorized/data/${mode}/${configName}`,
		method: 'POST',
		data,
		params,
	});
export const apiGetUnAuthConfigByName = (configName) => () =>
	genericRequest({
		url: `/api/dynamicdq/unauthorized/configuration/${configName}`,
		method: 'POST',
	});

export const apiSaveFileByConfigName = (catalogName) => (data) =>
	genericUploadRequest(`/api/dynamicdq/data/save/file/${catalogName}`, data);

export const apiGetDataCountByConfigName =
	(configName) =>
	({data, params}) =>
		genericRequest({
			url: `/api/dynamicdq/data/flat/count/${configName}`,
			method: 'POST',
			data,
			params,
		});
