import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

export const routeMapsControlPointViewModal = () => {
	let Row;

	const loadData = (callBack, row) => {
		Row = row;
		if (Row.jsonEquipments) Row.equipments = JSON.parse(Row.jsonEquipments);
		callBack(row);
	};

	const loadControlPointEquipmentsHandler = ({data, params}) => {
		const newData = {...data, controlPointsId: Row.id};
		return apiGetFlatDataByConfigName('controlPointsEquipments')({
			data: newData,
			params,
		});
	};
	const loadControlPointTechMapsHandler = ({data, params}) => {
		const newData = {...data, controlPointsId: Row.id};
		return apiGetFlatDataByConfigName('controlPointsTechMaps')({
			data: newData,
			params,
		});
	};

	const headFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				level: 5,
			},
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 6,
					children: [
						{
							componentType: 'Item',
							label: 'Код',
							name: 'code', // 'controlPointCode' не реагирует
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
				{
					componentType: 'Col',
					span: 10,
					children: [
						{
							componentType: 'Item',
							label: 'Наименование',
							name: 'name', // 'controlPointName' не реагирует
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'Группа',
							name: 'parentName', //'controlPointGroup'
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
			],
		},
		{
			componentType: 'Row',
			style: {
				marginTop: 15,
			},
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Метка',
								level: 5,
							},
						},
						{
							componentType: 'Row',
							children: [
								{
									componentType: 'Col',
									span: 10,
									children: [
										{
											componentType: 'Item',
											label: 'Тип',
											name: 'markType', // найминг нужно подумать для метки
											className: 'mb-0',
											child: {componentType: 'Text'},
										},
									],
								},
								{
									componentType: 'Col',
									span: 8,
									children: [
										{
											componentType: 'Item',
											label: 'Код метки',
											name: 'markCode', // найминг нужно подумать для метки
											className: 'mb-0',
											child: {componentType: 'Text'},
										},
									],
								},
							],
						},
					],
				},
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Местоположение',
								level: 5,
							},
						},
						{
							componentType: 'Row',
							children: [
								{
									componentType: 'Col',
									span: 10,
									children: [
										{
											componentType: 'Item',
											label: 'Координаты',
											name: 'coordinates', // найминг нужно подумать
											className: 'mb-0',
											child: {componentType: 'Text'},
										},
									],
								},
							],
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
				style: {
					marginTop: 15,
				},
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
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Технологические карты',
				level: 5,
				style: {
					marginTop: 15,
				},
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
						requestLoadRows: loadControlPointTechMapsHandler,
						requestLoadConfig: apiGetConfigByName(
							'controlPointsTechMaps'
						),
					},
				},
			],
		},
	];

	return {
		type: 'viewObject',
		title: 'Информация о контрольной точке',
		width: 800,
		bodyStyle: {height: 700},
		form: {
			name: 'controlPointsDataView',
			loadInitData: loadData,
			body: [...headFields, ...equipmentFields, ...techMaps],
		},
	};
};
