import React from 'react';
// import {useHistory} from 'react-router';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';

import {BasePage} from 'mobile-inspections-base-ui';
import {
	addControlPointToRoute,
	editControlPointToRoute,
} from './modalControlPointsRoute';

/**
 * Компонент не закончен, не работают ссылки на EDIT и ADD
 */
export default function DetoursConfiguratorRoutes() {
	// let history = useHistory();

	const formConfig = {
		noPadding: true,
		body: [
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						child: {
							componentType: 'LocalTable',

							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'modal'},
									edit: {actionType: ['page', 'modal']},
									delete: {},
									up: {},
									down: {},
								},
							},
							requestLoadRows: apiGetHierarchicalDataByConfigName(
								'controlPoints'
							),
							requestLoadConfig: apiGetConfigByName(
								'controlPoints'
							),

							modals: [
								addControlPointToRoute('controlPoints'),
								editControlPointToRoute('controlPoints'),
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
