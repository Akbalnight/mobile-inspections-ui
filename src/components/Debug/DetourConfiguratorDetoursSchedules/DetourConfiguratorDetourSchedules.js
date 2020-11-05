import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {addChoiseExecutor} from './Modals/modalSelectEmploye';

export default function DetoursConfiguratorDetoursSchedules() {
	const formConfig = {
		noPadding: true,
		name: 'DetoursConfiguratorDetourSchedules',
		labelCol: {span: 16},
		wrapperCol: {span: 24},
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
							// history,
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'modal'},
									// edit: {actionType: ['page', 'modal']},
									// delete: {},
								},
							},
							requestLoadRows: apiGetFlatDataByConfigName(
								'staffPositions'
							),
							requestLoadConfig: apiGetConfigByName(
								'staffPositions'
							),

							modals: [addChoiseExecutor('staffPositions')],
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
