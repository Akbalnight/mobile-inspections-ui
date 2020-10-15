import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName
} from '../../../apis/catalog.api';

export const EquipmentSelectModal = {
	type: 'select',
	width: 800,
	form: {
		body: [
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						name: 'equipments',
						child: {
							componentType: 'SelectTable', //'LocalTable', // 'ServerTable', 'InfinityTAble'
							// selectable: true,
							commandPanelProps: {systemBtnProps: {search: {}}},
							nodeAssociated: false,
							searchParamName: 'name',
							style: {height: '600px'},
							requestLoadRows: apiGetHierarchicalDataByConfigName(
								'equipmentsAutoQuery'
							),
							requestLoadConfig: apiGetConfigByName(
								'equipmentsAutoQuery'
							)
						}
					}
				]
			}
		]
	}
};
