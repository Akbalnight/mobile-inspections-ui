import {classic} from 'rt-design';
import React from 'react';
import {FolderOutlined, ToolOutlined} from '@ant-design/icons';
import {dateTime} from '../Base/customColumnProps';

const {Checkbox, DateText} = classic;

/**
 * @desc Array of table column configuration
 * @type {({cellRenderer: (function({cellData: *}): *), name: string}|{cellRenderer: (function({cellData: *}): *), name: string}|{cellRenderer: (function({rowData: *, cellData: *}): *), name: string}|{cellRenderer: function({cellData?: *}): *, name: *})[]}
 */
export const customColumnPropsEquipments = [
	{
		name: 'deleted',
		cellRenderer: ({cellData}) => {
			return <Checkbox checked={cellData} disabled />;
		},
	},
	{
		name: 'isGroup',
		cellRenderer: ({cellData}) => {
			return <Checkbox checked={cellData} disabled />;
		},
	},
	{
		name: 'techPlacePath',
		cellRenderer: ({rowData, cellData}) => {
			return (
				<span>
					{rowData.isGroup ? <FolderOutlined /> : <ToolOutlined />}{' '}
					{cellData}
				</span>
			);
		},
	},
	{...dateTime('dateStart')},
	{...dateTime('dateFinish')},
	{
		name: 'workSchedules',
		cellRenderer: ({cellData}) => (
			<span style={{display: 'flex', flexDirection: 'column'}}>
				{cellData &&
					cellData.map((cell, index) => (
						<span
							key={index}
							style={{display: 'flex', flexDirection: 'row'}}
						>
							<DateText
								value={cell[`${index}-StartWorkSchedules`]}
								format={'DD.MM.YYYY HH:mm'}
							/>
							{'  '}
							-&gt;{'  '}
							<DateText
								value={cell[`${index}-FinishWorkSchedules`]}
								format={'DD.MM.YYYY HH:mm'}
							/>
						</span>
					))}
			</span>
		),
	},
	{
		name: 'sickLeaves',
		cellRenderer: ({cellData}) => (
			<span style={{display: 'flex', flexDirection: 'column'}}>
				{cellData &&
					cellData.map((cell, index) => (
						<span
							key={index}
							style={{display: 'flex', flexDirection: 'row'}}
						>
							<DateText
								value={cell[`${index}-StartSickLeaves`]}
								format={'DD.MM.YYYY'}
							/>{' '}
							-{' '}
							<DateText
								value={cell[`${index}-FinishSickLeaves`]}
								format={'DD.MM.YYYY'}
							/>
						</span>
					))}
			</span>
		),
	},
	{
		name: 'vacation',
		cellRenderer: ({cellData}) => (
			<span style={{display: 'flex', flexDirection: 'column'}}>
				{cellData &&
					cellData.map((cell, index) => (
						<span
							key={index}
							style={{display: 'flex', flexDirection: 'row'}}
						>
							<DateText
								value={cell[`${index}-StartVacation`]}
								format={'DD.MM.YYYY'}
							/>{' '}
							-{' '}
							<DateText
								value={cell[`${index}-FinishVacation`]}
								format={'DD.MM.YYYY'}
							/>
						</span>
					))}
			</span>
		),
	},
	{
		name: 'code', //'codeHierarchical'
		cellRenderer: ({rowData, cellData}) => {
			return (
				<span className={'rt-table-cell'}>
					{rowData.isGroup ? <FolderOutlined /> : null} {cellData}
				</span>
			);
		},
	},
];
