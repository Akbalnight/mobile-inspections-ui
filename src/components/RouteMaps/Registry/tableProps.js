import React from 'react';

export const customColumnProps = [
	{
		name: 'position',
		cellRenderer: ({rowData, rowIndex}) => {
			rowData.position = rowIndex + 1;
			return <div className={'rt-table-cell'}>{rowIndex + 1}</div>;
		},
	},
];
