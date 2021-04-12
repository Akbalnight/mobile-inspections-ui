/**
 * функция преобразования пустых данных формы просмотра в Н/Д
 */
export const emptyToNd = (partialRow) => {
	let reFilled = {};
	if (partialRow) {
		Object.keys(partialRow).forEach((item) => {
			if (partialRow[item])
				reFilled = {...reFilled, [item]: partialRow[item]};
			else reFilled = {...reFilled, [item]: 'Н/Д'};
		});
	}
	return reFilled;
};
