import React from 'react';
import {useHistory} from 'react-router';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {
	addGroupOnServer,
	editGroupOnServer,
} from '../../Base/Modals/GroupOnServer';
import {BasePage} from 'mobile-inspections-base-ui';

/**
 * Компонент не закончен, не работают ссылки на EDIT и ADD
 */
export default function DetoursConfiguratorRoutes() {
	let history = useHistory();

	const formConfig = {
		noPadding: true,
		body: [
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						child: {
							componentType: 'ServerTable',
							history,
							requestLoadRows: apiGetHierarchicalDataByConfigName(
								'techMaps'
							),
							requestLoadConfig: apiGetConfigByName('techMaps'),
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'page'},
									edit: {actionType: ['page', 'modal']},
									delete: {actionType: 'modal'},
								},
							},
							madals: [
								addGroupOnServer('techMaps'),
								editGroupOnServer('techMaps'),
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
