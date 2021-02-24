import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

export const equipmentFields = () => {
	return {
		componentType: 'Layout',
		className: 'p-8',
		children: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					className: 'ml-8',
					label: 'Оборудование',
					level: 4,
				},
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Table',
					dispatchPath:
						'defects.defectTable.modal.infoEquipment.table',
					requestLoadRows: apiGetFlatDataByConfigName('equipments'),
					requestLoadConfig: apiGetConfigByName('equipments'),
				},
			},
		],
	};
};
