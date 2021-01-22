import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {ReactComponent as WorkSchedulesPane} from '../../imgs/tabPane/workSchedules/workSchedules.svg';
import {ReactComponent as WorkShiftPane} from '../../imgs/tabPane/workSchedules/workShift.svg';
import {ReactComponent as WorkTemplatesPane} from '../../imgs/tabPane/workSchedules/workSchedulesTemplates.svg';
import {useHistory} from 'react-router';
import {addShiftModal, editShiftModal} from './Modals/modalShiftTab';
import {addTemplateModal, editTemplateModal} from './Modals/modalTemplatesTab';
import {workSchedulesFields} from './Tabs/workSchedules';

export default function WorkSchedules() {
	const history = useHistory();

	// const configFilterPanel = [
	// 	{
	// 		componentType: 'SingleSelect',
	// 		name: '1',
	// 		className: 'mr-16',
	// 		rowRender: 'positionName',
	// 		title: 'Сотрудники',
	// 		widthControl: 120,
	// 		widthPopup: 250,
	// 		requestLoadRows: apiGetFlatDataByConfigName('staff'),
	// 		requestLoadConfig: apiGetConfigByName('staff'),
	// 	},
	// 	{
	// 		componentType: 'DateRange',
	// 		title: 'Период',
	// 		nameStart: 'dateStart',
	// 		nameEnd: 'dateFinish',
	// 		dateFormat: 'DD-MM-YYYY',
	// 		className: 'ml-16',
	// 	},
	// ];

	const workShiftsFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable',
						dispatchPath: 'workSchedules.workShiftTable.table',
						// selectable: true,
						history,
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								edit: {actionType: ['modal', 'modal']},
								delete: {},
							},
						},
						requestLoadRows: apiGetFlatDataByConfigName(
							'defects' //'workSchedules'
						),
						requestLoadConfig: apiGetConfigByName(
							'defects' //'workSchedules'
						),
						modals: [addShiftModal(), editShiftModal()],
					},
				},
			],
		},
	];
	const workSchedulesTemplatesFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable',
						dispatchPath: 'workSchedules.workShiftTable.table',
						// selectable: true,
						history,
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								edit: {actionType: ['modal', 'modal']},
								delete: {},
							},
						},
						requestLoadRows: apiGetFlatDataByConfigName(
							'defects' //'workSchedules'
						),
						requestLoadConfig: apiGetConfigByName(
							'defects' //'workSchedules'
						),
						modals: [addTemplateModal(), editTemplateModal()],
					},
				},
			],
		},
	];
	const mainPageConfig = [
		{
			componentType: 'Tabs',
			type: 'card',
			size: 'medium',
			className: 'mt-8 ml-4',
			children: [
				{
					componentType: 'TabPane',
					tab: <WorkSchedulesPane />,
					key: 'workSchedules',
					className: 'workSchedules',
					children: [...workSchedulesFields],
				},
				{
					componentType: 'TabPane',
					tab: <WorkShiftPane />,
					key: 'workShifts',
					className: 'workShifts',
					children: [...workShiftsFields],
				},
				{
					componentType: 'TabPane',
					tab: <WorkTemplatesPane />,
					key: 'workSchedulesTemplates',
					className: 'workSchedulesTemplates',
					children: [...workSchedulesTemplatesFields],
				},
			],
		},
	];

	const formConfig = {
		noPadding: true,
		name: 'workSchedulesMain',
		body: [...mainPageConfig],
	};
	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
