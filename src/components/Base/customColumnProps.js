import React from 'react';
import {toDDMMYYYYdot, toDDMMYYYYHHMMSS} from '../../utils/datesUtils';
import {Checkbox} from 'antd';
import {codeNormalizer} from './Functions/TextUtils';

export const code = {
	name: 'code',
	cellRenderer: ({rowData}) => codeNormalizer(rowData.code),
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
	cellRenderer: ({cellData}) => toDDMMYYYYdot(cellData),
});

export const dateTime = (name) => ({
	name: name,
	cellRenderer: ({cellData}) => toDDMMYYYYHHMMSS(cellData),
});
