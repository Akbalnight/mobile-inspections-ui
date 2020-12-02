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

export default function DetoursSchedules() {
	let history = useHistory();
	const configFilterPanel = [
		{
			componentType: 'SingleSelect',
			name: 'routesName',
			className: 'mr-16',
			rowRender: 'name',
			title: 'Маршрут',
			widthControl: 150,
			widthPopup: 150,
			requestLoadRows: apiGetFlatDataByConfigName('routes'),
			requestLoadConfig: apiGetConfigByName('routes'),
		},
		{
			componentType: 'SingleSelect',
			name: 'staffName',
			className: 'mr-16',
			rowRender: 'name',
			title: 'Сотрудник',
			widthControl: 150,
			widthPopup: 150,
			requestLoadRows: apiGetFlatDataByConfigName('staffPositions'), //временно //staff
			requestLoadConfig: apiGetConfigByName('staffPositions'), //временно //staff
		},
		{
			componentType: 'DateRange',
			title: 'Период',
			nameStart: 'dateBeginDetour',
			nameEnd: 'dateEndDetour',
			dateFormat: 'DD-MM-YYYY',
			className: 'mr-16',
		},
		{
			componentType: 'SingleSelect',
			name: 'staffName',
			className: 'mr-16',
			rowRender: 'name',
			title: 'Группировка',
			widthControl: 150,
			widthPopup: 150,
			requestLoadRows: apiGetFlatDataByConfigName('techMapsStatuses'), //временно
			requestLoadConfig: apiGetConfigByName('techMapsStatuses'), //временно
		},
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
							componentType: 'LocalTable',
							history,
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
