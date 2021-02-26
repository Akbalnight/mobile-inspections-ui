import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {techOperations} from './techOperationsConfig';

export const routeControlPointViewModal = () => {
	let Row;

	const loadData = (callBack, row) => {
		Row = row;
		if (Row.jsonEquipments) Row.equipments = JSON.parse(Row.jsonEquipments);
		callBack(row);
	};
	/**
	 *
	 * надо продумать, как настроить корректное отоборажени информации в таблице
	 */
	const loadControlPointEquipmentsHandler = ({data, params}) => {
		const newData = {...data, controlPointsId: Row.controlPointId};
		return apiGetFlatDataByConfigName('controlPointsEquipments')({
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
							'controlPointsEquipments' //'routeEquipments'
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
		width: 800,
		bodyStyle: {height: 700},
		form: {
			name: 'controlPointsDataView',
			loadInitData: loadData,
			body: [...headFields, ...equipmentFields, ...techMaps],
		},
	};
};
