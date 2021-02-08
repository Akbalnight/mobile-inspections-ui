import React from 'react';
import {Checkbox} from 'antd';
import {code, duration, position} from '../Base/customColumnProps';

export const customColumnProps = [
	{...code},
	{...position},
	{...duration},
	{
		name: 'needInputData',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
	{
		name: 'equipmentStop',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
	{
		name: 'increasedDanger',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
];

// Дополнительная обработка объекта строки после закрытия модалки
export const customFields = [
	{
		name: 'duration',
		value: (row) => parseInt(row.hours * 60) + parseInt(row.minutes),
	},
	{
		name: 'code',
		value: (row, rows) =>
			parseInt(
				rows.reduce(
					(max, current) =>
						parseInt(current.code) > max ? current.code : max,
					0
				)
			) + 1,
	},
	{
		name: 'position',
		value: (row, rows) => rows.length + 1,
	},
];
