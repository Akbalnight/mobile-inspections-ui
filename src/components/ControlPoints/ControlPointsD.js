import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetDataCountByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {useHistory} from 'react-router';
import {
	addGroupOnServer,
	editGroupOnServer,
} from '../Base/Modals/GroupOnServer';
import {code} from '../Base/customColumnProps';

const ControlPointsD = (props) => {
	let history = useHistory();
	// /api/catalog/baseCatalogWithParent/controlPoints
	// {"name":"2","parentId":"3244445c-9df8-4a5c-a123-106c1cdb4023"}

	const formConfig = {
		noPadding: true,
		body: [
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						child: {
							componentType: 'ServerTable', //'LocalTable', // 'ServerTable', 'InfinityTable'
							customColumnProps: [{...code}],
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'page'},
									addGroup: {actionType: 'modal'},
									edit: {actionType: ['page', 'modal']},
									delete: {actionType: 'modal'},
								},
							},
							modals: [
								addGroupOnServer('controlPoints'),
								editGroupOnServer('controlPoints'),
							],
							history: history,
							requestLoadRows: apiGetHierarchicalDataByConfigName(
								'controlPoints'
							),
							requestLoadCount: apiGetDataCountByConfigName(
								'controlPoints'
							),
							requestLoadConfig: apiGetConfigByName(
								'controlPoints'
							),
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
};

ControlPointsD.propTypes = {};

export default ControlPointsD;
