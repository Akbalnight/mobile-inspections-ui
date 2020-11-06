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
									// edit: {actionType: ['page', 'modal']},
									// delete: {},
								},
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
