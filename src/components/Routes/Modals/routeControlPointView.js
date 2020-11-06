import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {techOperations} from './techOperationsConfig';

export const controlPointViewModal = () => {
	let Row;

	const loadData = (callBack, row) => {
		Row = row;
		if (Row.jsonEquipments) Row.equipments = JSON.parse(Row.jsonEquipments);
		callBack(row);
	};

	const loadControlPointEquipmentsHandler = ({data, params}) => {
		const newData = {...data, routesDataId: Row.id};
		return apiGetFlatDataByConfigName('routeEquipments')({
			data: newData,
			params,
		});
	};

	const loadControlPointsTechOperations = ({params, data}) => {
		let newData = {...data};
		// console.log('loadControlPointsEquipments newData.techMapId => ', newData.techMapId);
		newData.techMapId = Row ? Row.techMapId : null;
		return apiGetFlatDataByConfigName('techOperationsSmall')({
			params,
			data: newData,
		});
	};

	const headFields = [
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Наименование',
							name: 'controlPointName',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
			],
		},
	];

	const equipmentFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Оборудование',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			className: 'mb-16',
			children: [
				{
					componentType: 'Item',
					name: 'equipments',
					child: {
						componentType: 'LocalTable',
						requestLoadRows: loadControlPointEquipmentsHandler,
						requestLoadConfig: apiGetConfigByName(
							'controlPointsEquipments'
						),
					},
				},
			],
		},
	];

	const techMaps = [
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Технологическая карта',
							name: 'techMapName',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
			],
		},
		...techOperations(loadControlPointsTechOperations),
	];

	return {
		type: 'viewObject',
		title: 'Контрольная точка',
		width: 783,
		bodyStyle: {
			height: 682,
		},
		form: {
			name: 'controlPointsDataView',
			loadInitData: loadData,
			body: [...headFields, ...equipmentFields, ...techMaps],
		},
	};
};
