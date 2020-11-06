import React from 'react';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {
	addGroupOnServer,
	editGroupOnServer,
} from '../Base/Modals/GroupOnServer';
import {useHistory} from 'react-router';
import {techMapDataView} from '../TechMapsForm/TechMapDataView';
import {groupView} from '../Base/Modals/GroupView';
import {code} from '../Base/customColumnProps';

const TechMaps = () => {
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
							requestLoadRows: apiGetHierarchicalDataByConfigName(
								'techMaps'
							),
							requestLoadConfig: apiGetConfigByName('techMaps'),
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'page'},
									addGroup: {actionType: 'modal'},
									edit: {actionType: ['page', 'modal']},
								},
							},

							// В примере #3 будет описан вот этот массив
							modals: [
								addGroupOnServer('techMaps'),
								editGroupOnServer('techMaps'),
								techMapDataView(),
								groupView(
									'Информация о группе технологической карты'
								),
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
};

TechMaps.propTypes = {};

export default TechMaps;
