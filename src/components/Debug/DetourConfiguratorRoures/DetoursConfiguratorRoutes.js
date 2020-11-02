import React from 'react';
import {useHistory} from 'react-router';
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
import {routeViewModal} from './modalRouteInfo';
import {controlPointViewModal} from './modalControlPointInfo';

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
							componentType: 'LocalTable',
							history,
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'page'},
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
								routeViewModal(), //info about Route
								controlPointViewModal(), // info about ControlPoint
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
