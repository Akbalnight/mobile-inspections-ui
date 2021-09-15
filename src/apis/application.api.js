import {genericRequest, genericUploadRequest} from './network';

export const apiGetConfigByName = (configName) => () =>
	genericRequest({
		url: '/api/dynamicdq/configuration/' + configName,
		method: 'GET',
	});

const apiRequestByMode =
	(mode) =>
	(configName) =>
	({data, params}) =>
		genericRequest({
			url: `/api/dynamicdq/data/${mode}/${configName}`,
			method: 'POST',
			data,
			params,
		});

export const apiGetCountDataByConfigName =
	(configName) =>
	({data, params}) =>
		apiRequestByMode('count')(configName)({data, params});

export const apiGetFlatDataByConfigName =
	(configName) =>
	({data, params}) =>
		apiRequestByMode('flat')(configName)({data, params});

export const apiGetHierarchicalDataByConfigName =
	(configName) =>
	({data, params}) =>
		apiRequestByMode('hierarchical')(configName)({data, params});

export const apiSaveByConfigName =
	(catalogName, systemEvent) =>
	({method, data, params}) =>
		genericRequest({
			url: `/api/dynamicdq/data/save/${catalogName}`,
			method: method,
			data: {...data, systemEvent: systemEvent},
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
