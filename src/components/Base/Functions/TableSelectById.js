import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';
/**
 * Проверяет необходимость запроса в базу данных. Если не передан id записи - вернет пустой промис */
export const selectRowsById = (catalogName, fieldName, fieldValue) => ({
	params,
	data,
}) => {
	if (fieldValue) {
		console.log('transferred', fieldValue);
		const newData = {...data, [fieldName]: fieldValue};
		return apiGetFlatDataByConfigName(catalogName)({
			data: newData,
			params,
		});
	} else {
		console.log('not transferred');

		return new Promise((resolve) => resolve({data: []}));
	}
};
