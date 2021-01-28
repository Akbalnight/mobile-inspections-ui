import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

export const routeMapsControlPointViewModal = () => {
	let Row;

	const loadData = (callBack, row) => {
		Row = row;
		console.log(Row);

		if (Row.jsonEquipments) Row.equipments = JSON.parse(Row.jsonEquipments);
		callBack(row);
	};
	/**
	 *
	 * Получение данных по определенной КТ
	 */
	const loadControlPointEquipmentsHandler = ({data, params}) => {
		const newData = {...data, controlPointsId: Row.controlPointId};
		return apiGetFlatDataByConfigName('controlPointsEquipments')({
			data: newData,
			params,
		});
	};

	/**
	 *
	 * Получение данных по определенной КТ
	 */
	const loadControlPointTechMapsHandler = ({data, params}) => {
		const newData = {...data, controlPointsId: Row.controlPointId};
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
							name: 'controlPointCode',
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
							name: 'controlPointName',
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
							name: 'controlPointParent', //нужно понять что конкретно тут хотят видеть
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
			],
		},
		{
			componentType: 'Row',
			сlassName: 'mt-16',
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
											name: 'controlPointRfidName', // найминг нужно подумать для метки
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
											name: 'controlPointRfidCode', // найминг нужно подумать для метки
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
									componentType: 'Item',
									label: 'Координаты по горизонтали',
									name: 'xLocation',
									className: 'mb-0',
									child: {componentType: 'Text'},
								},
								{
									componentType: 'Item',
									label: 'по вертикали',
									name: 'yLocation',
									className: 'mb-0 ml-8',
									child: {componentType: 'Text'},
								},
								// после генерации новой сущности в конфигураторе получения данных изменить верстку
								// {
								// 	componentType: 'Col',
								// 	span: 10,
								// 	children: [
								// {
								// 	componentType: 'Item',
								// 	label: 'Координаты',
								// 	name: 'coordinates',
								// 	className: 'mb-0 ml-8',
								// 	child: {componentType: 'Text'},
								// },
								// 	],
								// },
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
				className: 'mt-8',
			},
		},
		{
			componentType: 'Layout',
			className: 'mb-8',
			children: [
				{
					componentType: 'Item',
					name: 'equipments',
					child: {
						componentType: 'LocalTable',
						style: {height: '180px'},
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
				className: 'mt-16',
			},
		},
		{
			componentType: 'Layout',
			className: 'mb-8',
			children: [
				{
					componentType: 'Item',
					name: 'techMaps',
					child: {
						componentType: 'LocalTable',
						style: {height: '180px'},
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
