import React from 'react';
import {useHistory} from 'react-router';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';

import {BasePage} from 'mobile-inspections-base-ui';
import {
	addControlPointToRoute,
	editControlPointToRoute,
} from './Modals/routeControlPointEdit';
import {routeViewModal} from './Modals/routeView';
// import {controlPointViewModal} from './Modals/routeControlPointView';

export default function Routes() {
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
								},
							},
							requestLoadRows: apiGetFlatDataByConfigName(
								'routes'
							),
							requestLoadConfig: apiGetConfigByName('routes'),

							modals: [
								addControlPointToRoute('controlPoints'),
								editControlPointToRoute('controlPoints'),
								routeViewModal(), //info about Route
								// controlPointViewModal(), // info about ControlPoint
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
