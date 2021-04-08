import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {itemsInfo} from '../../../constants/dictionary';

export const equipmentFields = () => {
	return {
		componentType: 'Layout',
		name: 'equipment',
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
				...itemsInfo.typeEquipment,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.sapId,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				name: ['equipment', 'name'],
				label: itemsInfo.name.label,
				className: 'mb-8',
				rules: [],
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				name: ['equipment', 'techPlacePath'],
				label: itemsInfo.techPlacePath.label,
				className: 'mb-8',
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.parentName,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.constructionType,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.material,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.size,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.weight,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.manufacturer,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.dateFinish,
				format: 'DD.MM.YYYY',
				child: {
					componentType: 'Text',
				},
			},
			// {
			// 	componentType: 'Item',
			// 	name:'equipment',
			// 	child: {
			// 		componentType: 'Table',
			// 		// dispatchPath:
			// 		// 	'defects.defectTable.modal.infoEquipment.table',
			// 		// requestLoadRows: apiGetFlatDataByConfigName('equipments'),
			// 		requestLoadConfig: apiGetConfigByName('defectEquipmentsColumns'),
			// 	},
			// },
		],
	};
};
