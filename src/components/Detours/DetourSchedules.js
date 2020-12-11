import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {schedulesViewModal} from './Modals/SchedulesView';
import {addChoiseExecutor} from './Modals/SelectEmploye';
import {useHistory} from 'react-router';
import {code, dateTime} from '../Base/customColumnProps';

export default function DetoursSchedules() {
	let history = useHistory();
	const configFilterPanel = [
		{
			componentType: 'SingleSelect',
			name: 'routeIds',
			className: 'mr-16',
			rowRender: 'name',
			title: 'Маршрут',
			widthControl: 150,
			widthPopup: 300,
			heightPopup: 200,
			requestLoadRows: apiGetFlatDataByConfigName('routes'),
			requestLoadConfig: apiGetConfigByName('routes'),
		},
		{
			componentType: 'SingleSelect',
			name: 'staffIds',
			className: 'mr-16',
			rowRender: ({rowData}) => (
				<div>
					<span>{rowData.userId}</span>{' '}
					<span>[{rowData.positionName}]</span>
				</div>
			),
			title: 'Сотрудник',
			widthControl: 150,
			widthPopup: 300,
			heightPopup: 200,
			requestLoadRows: apiGetFlatDataByConfigName('staff'), //временно //staff
			requestLoadConfig: apiGetConfigByName('staff'), //временно //staff
		},
		{
			componentType: 'DateRange',
			title: 'Период',
			nameStart: 'dateBegin',
			nameEnd: 'dateEnd',
			dateFormat: 'DD-MM-YYYY',
			className: 'mr-16',
		},
	];

	const customColumnProps = [
		{...code},
		{...dateTime('dateStartPlan')},
		{...dateTime('dateFinishPlan')},
		{...dateTime('dateStartFact')},
		{...dateTime('dateFinishFact')},
	];

	const formConfig = {
		noPadding: true,
		name: 'DetourSchedules',
		// methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		onFinish: (values) => {
			console.log('Values', values);
		},

		body: [
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						child: {
							componentType: 'ServerTable',
							history,
							fixWidthColumn: true,
							customColumnProps: customColumnProps,
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'page'},
									edit: {actionType: ['page', 'modal']},
									delete: {},
								},
							},
							filterPanelProps: {
								configFilter: [...configFilterPanel],
							},
							requestLoadRows: apiGetFlatDataByConfigName(
								'detours'
							),
							requestLoadConfig: apiGetConfigByName('detours'),

							modals: [
								addChoiseExecutor('staffPositions'),
								schedulesViewModal(),
							],
						},
					},
				],
			},
		],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
