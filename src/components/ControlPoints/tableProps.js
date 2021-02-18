/**
 *
 * файл со всеми customFields, поля и валидация в объекты таблицы
 */
export const equipmentTableCustom = (params) => {
	return [
		{
			name: 'controlPointId',
			value: () => params.id,
		},
		{
			name: 'equipmentId',
			value: (row) => row.id,
			validate: (row, rows) => {
				// console.log("validate => ", rows.map(row => row.equipmentId));
				// console.log("validate => ", row.id);
				// console.log("validate => ", !rows.map(row => row.equipmentId).includes(row.id));
				return !rows.map((row) => row.equipmentId).includes(row.id);
			},
		},
	];
};
export const techMapsTableCustom = (params) => {
	return [
		{
			name: 'controlPointId',
			value: () => params.id,
		},
		{
			name: 'techMapId',
			value: (row) => row.id,
		},
		{
			name: 'isGroup',
			validate: (row, rows) => !row.isGroup,
		},
	];
};
