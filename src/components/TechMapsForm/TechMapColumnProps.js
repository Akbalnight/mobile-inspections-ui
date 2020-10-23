import React from 'react';
import {Checkbox} from 'antd';

export const customColumnProps = [
	{
		name: 'code',
		cellRenderer: ({rowData}) => String(rowData.code).padStart(8, '0')
	},
	{
		name: 'position',
		cellRenderer: ({rowData, rowIndex}) => {
			rowData.position = rowIndex + 1;
			return rowIndex + 1;
		}
	},
	{
		name: 'needInputData',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />
	},
	{
		name: 'equipmentStop',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />
	},
	{
		name: 'increasedDanger',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />
	},
	{
		name: 'duration',
		cellRenderer: ({cellData}) => `${cellData} мин.`
	}
];
