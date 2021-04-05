import React from 'react';
import {toDDMMYYYYdot, toDDMMYYYYHHMMSS} from '../../utils/datesUtils';
import {Checkbox} from 'antd';

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

export const checkBox = (name) => ({
	name: name,
	cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
});

export const date = (name) => ({
	name: name,
	cellRenderer: ({cellData}) => (
		<div className={'rt-table-cell'}>{toDDMMYYYYdot(cellData)}</div>
	),
});

export const dateTime = (name) => ({
	name: name,
	cellRenderer: ({cellData}) => toDDMMYYYYHHMMSS(cellData),
});
