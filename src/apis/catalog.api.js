import {genericRequest} from './network';

export const apiGetConfigByName = ({configName, data, params}) =>
	genericRequest({
		url: '/api/management-dynamicdq/configuration/'+configName,
		method: 'GET',
		data,
		params
	});

export const apiGetConfigByName_2 = (configName) => () =>
	genericRequest({
		url: '/api/management-dynamicdq/configuration/'+configName,
		method: 'GET',
	});

export const apiGetFlatDataByConfigName = (configName) => ({data, params}) =>
	apiGetDataByConfigName({
		configName: configName,
		hierarchical: false,
		lazyLoad: false,
		data,
		params
	});

export const apiGetHierarchicalDataByConfigName = (configName) => ({data, params}) =>
	apiGetDataByConfigName({
		configName: configName,
		hierarchical: true,
		lazyLoad: false,
		data,
		params
	});


export const apiGetDataByConfigName = ({hierarchical, lazyLoad, configName,  data, params}) =>
	genericRequest({
		url: `/api/dynamicdq/data/${hierarchical && !lazyLoad ? 'hierarchical' : 'flat'}/${configName}`,
		method: 'POST',
		data,
		params
	});

export const apiGetCatalogWithParentById = ({catalogName, id, params}) =>
	genericRequest({
		url: `/api/catalog/baseCatalogWithParent/${catalogName}/${id}`,
		method: 'GET',
		params
	});

export const apiGetCatalogById = ({catalogName, id, params}) =>
	genericRequest({
		url: `/api/catalog/baseCatalog/${catalogName}/${id}`,
		method: 'GET',
		params
	});

export const apiSaveBaseCatalogWithParentId = ({catalogName, method, data, params}) => {
	return genericRequest({
		url: `/api/catalog/baseCatalogWithParent/${catalogName}`,
		method: method,
		data,
		params
	});
};

export const apiSaveBaseCatalog = ({catalogName, method, data, params}) => {
	return genericRequest({
		url: `/api/catalog/baseCatalog/${catalogName}`,
		method: method,
		data,
		params
	});
};

export const apiGetEquipmentById = ({id, params}) =>
	genericRequest({
		url: `/api/catalog/equipments/${id}`,
		method: 'GET',
		params
	});

export const apiSaveEquipment = ({method, data, params}) => {
	return genericRequest({
		url: `/api/catalog/equipments`,
		method: method,
		data,
		params
	});
};

export const apiGetTechMapById = ({id, params}) =>
	genericRequest({
		url: `/api/catalog/techMaps/${id}`,
		method: 'GET',
		params
	})
export const apiSaveTechMap = ({method, data, params}) =>
	genericRequest({
		url: `/api/catalog/techMaps`,
		method: method,
		data,
		params
	});
