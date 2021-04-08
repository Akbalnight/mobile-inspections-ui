import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

export const historyFields = () => {
	return {
		componentType: 'Layout',
		className: 'p-8',
		children: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					className: 'ml-8',
					label: 'История изменений',
					level: 4,
				},
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Table',
					// dispatchPath:
					// 	'defects.defectTable.modal.infoEquipment.table',
					requestLoadRows: apiGetFlatDataByConfigName(
						'defectHistory'
					),
					requestLoadConfig: apiGetConfigByName('defectHistory'),
				},
			},
		],
	};
};
