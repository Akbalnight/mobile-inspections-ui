import {apiGetFlatDataByConfigName} from '../../../apis/application.api';
/**
 * Проверяет необходимость запроса в базу данных. Если не передан id записи - вернет пустой промис */
export const selectRowsById =
	(catalogName, fieldName, fieldValue) =>
	({params, data}) => {
		if (fieldValue) {
			const newData = {...data, [fieldName]: fieldValue};
			return apiGetFlatDataByConfigName(catalogName)({
				data: newData,
				params,
			});
		} else {
			return new Promise((resolve) => resolve({data: []}));
		}
	};
