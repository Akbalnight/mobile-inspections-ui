import {genericRequest, genericUploadRequest} from './network';
//
export const apiGetConfigByName = (configName) => () =>
	genericRequest({
		url: '/api/dynamicdq/configuration/' + configName,
		method: 'GET',
	});

export const apiGetConfigByObject = ({configName, data, params}) =>
	genericRequest({
		url: '/api/dynamicdq/configuration/' + configName,
		method: 'GET',
		data,
		params,
	});

export const apiGetFlatDataByConfigName = (configName) => ({data, params}) =>
	apiGetDataByConfigName({
		configName: configName,
		hierarchical: false,
		lazyLoad: false,
		data,
		params,
	});

export const apiGetHierarchicalDataByConfigName = (configName) => ({
	data,
	params,
}) =>
	apiGetDataByConfigName({
		configName: configName,
		hierarchical: true,
		lazyLoad: false,
		data,
		params,
	});

export const apiGetLazyLoadDataByConfigName = (configName) => ({
	data,
	params,
}) =>
	apiGetDataByConfigName({
		configName: configName,
		hierarchical: true,
		lazyLoad: true,
		data,
		params,
	});

export const apiGetDataCountByConfigName = (configName) => ({data, params}) =>
	genericRequest({
		url: `/api/dynamicdq/data/flat/count/${configName}`,
		method: 'POST',
		data,
		params,
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

export const apiGetCatalogWithParentById = ({catalogName, id, params}) =>
	genericRequest({
		url: `/api/catalog/baseCatalogWithParent/${catalogName}/${id}`,
		method: 'GET',
		params,
	});

export const apiGetCatalogById = ({catalogName, id, params}) =>
	genericRequest({
		url: `/api/catalog/baseCatalog/${catalogName}/${id}`,
		method: 'GET',
		params,
	});

export const apiSaveBaseCatalogWithParentIdD = (catalogName) => ({
	method,
	data,
	params,
}) => {
	return genericRequest({
		url: `/api/catalog/baseCatalogWithParent/${catalogName}`,
		method: method,
		data,
		params,
	});
};

export const apiSaveBaseCatalogWithParentId = ({
	catalogName,
	method,
	data,
	params,
}) => {
	return genericRequest({
		url: `/api/catalog/baseCatalogWithParent/${catalogName}`,
		method: method,
		data,
		params,
	});
};

export const apiSaveBaseCatalog = ({catalogName, method, data, params}) => {
	return genericRequest({
		url: `/api/catalog/baseCatalog/${catalogName}`,
		method: method,
		data,
		params,
	});
};

export const apiGetEquipmentById = ({id, params}) =>
	genericRequest({
		url: `/api/catalog/equipments/${id}`,
		method: 'GET',
		params,
	});

export const apiSaveEquipment = ({method, data, params}) => {
	return genericRequest({
		url: `/api/catalog/equipments`,
		method: method,
		data,
		params,
	});
};

export const apiGetTechMapById = ({id, params}) =>
	genericRequest({
		url: `/api/catalog/techMaps/${id}`,
		method: 'GET',
		params,
	});

export const apiSaveTechMap = ({method, data, params}) =>
	genericRequest({
		// url: `/api/catalog/techMaps`,
		url: `/api/dynamicdq/data/save/techMaps`,
		method: method,
		data,
		params,
	});

export const apiSaveControlPoints = ({method, data, params}) =>
	genericRequest({
		// url: `/api/catalog/controlPoints`,
		url: `/api/dynamicdq/data/save/controlPoints`,
		method: method,
		data,
		params,
	});

export const apiSaveByConfigName = (catalogName) => ({method, data, params}) =>
	genericRequest({
		// url: `/api/catalog/controlPoints`,
		url: `/api/dynamicdq/data/save/${catalogName}`,
		method: method,
		data,
		params,
	});

export const apiSaveFileByConfigName = (catalogName) => (data) =>
	genericUploadRequest(`/api/dynamicdq/data/save/file/${catalogName}`, data);

export const apiGetDataFlatConfigManagement = (configName) => ({
	data,
	params,
}) =>
	genericRequest({
		url: `/api/management/data/flat/${configName}`,
		method: 'POST',
		data,
		params,
	});
