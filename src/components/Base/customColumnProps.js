export const code = {
	name: 'code',
	cellRenderer: ({rowData}) => String(rowData.code).padStart(8, '0'),
};

export const position = {
	name: 'position',
	cellRenderer: ({rowData, rowIndex}) => {
		rowData.position = rowIndex + 1;
		return rowIndex + 1;
	},
};

export const duration = {
	name: 'duration',
	cellRenderer: ({cellData}) => `${cellData} мин.`,
};
