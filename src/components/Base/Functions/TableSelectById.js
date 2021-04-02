import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';

export const selectRowsById = (catalogName, name, currentId) => ({
	params,
	data,
}) => {
	console.log('>>>', currentId, name);
	/**
	 * посмотри на name
	 */
	if (currentId) {
		const newData = {...data, name: currentId};
		return apiGetFlatDataByConfigName(catalogName)({
			data: newData,
			params,
		});
	} else {
		return new Promise((resolve) => resolve({data: []}));
	}
};
