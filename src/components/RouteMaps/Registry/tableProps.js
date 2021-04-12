export const customColumnProps = [
	{
		name: 'position',
		cellRenderer: ({rowData, rowIndex}) => {
			rowData.position = rowIndex + 1;
			return rowIndex + 1;
		},
	},
];
