import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';

export const TechMapSelectModal = {
	type: 'select',
	width: 700,
	form: {
		loadInitData: (callBack, row) => callBack(row),
		body: [
			{
				componentType: 'Layout',
				className: 'mb-16',
				children: [
					{
						componentType: 'Item',
						name: 'techMaps',
						child: {
							componentType: 'SelectTable', //'LocalTable', // 'ServerTable', 'InfinityTAble'
							// selectable: true,
							commandPanelProps: {systemBtnProps: {search: {}}},
							searchParamName: 'name',
							style: {height: '400px'},
							dispatchPath:
								'controlPointData.modal.techMap.selected',
							requestLoadRows: apiGetHierarchicalDataByConfigName(
								'techMaps'
							),
							requestLoadConfig: apiGetConfigByName('techMaps'),
						},
					},
				],
			},
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						// name: 'techOperationsSmall',
						child: {
							componentType: 'ServerTable', //'LocalTable', // 'ServerTable', 'InfinityTable'
							style: {height: '200px'},
							// dispatchPath: 'controlPointData.select.techOperationsSmall',
							defaultFilter: {techMapId: null},
							subscribe: {
								name: 'techMap',
								path: 'controlPointData.modal.techMap.selected',
								onChange: ({value, setReloadTable}) => {
									// console.log('TechMapSelectModal subscribe', value);
									value &&
										setReloadTable &&
										setReloadTable({
											filter: {techMapId: value.id},
										});
								},
							},
							requestLoadRows: apiGetFlatDataByConfigName(
								'techOperationsSmall'
							),
							requestLoadConfig: apiGetConfigByName(
								'techOperationsSmall'
							),
						},
					},
				],
			},
		],
	},
};
