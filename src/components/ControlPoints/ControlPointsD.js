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
import {controlPointsGroupInfo} from './Modals/modalControlPointsGroupInfo';

/** Главный компонент раздела
 * Возможно важный комментарий
 * /api/catalog/baseCatalogWithParent/controlPoints
 * {"name":"2","parentId":"3244445c-9df8-4a5c-a123-106c1cdb4023"}
 *
 *
 * routeMapsControlPointViewModal(history) - временное решение пока не обсудили входные данные с сервера
 */
const ControlPointsD = (props) => {
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
							customColumnProps: [{...code}],
							history,
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'page'},
									addGroup: {actionType: 'modal'},
									edit: {actionType: ['page', 'modal']},
									delete: {actionType: 'modal'},
								},
							},
							modals: [
								addGroupOnServer(
									'controlPoints',
									'saveControlPointGroup'
								),
								editGroupOnServer(
									'controlPoints',
									'saveControlPointGroup'
								),
								routeMapsControlPointViewModal(history),
								controlPointsGroupInfo(),
							],
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
