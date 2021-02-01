import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

/**
 *
 * historyChange - временное решение нужно определиться какие данные будут приходить из конфигов получения
 * controlPoints  и routeControlPoints. В конфигурацию controlPoints, добавил недостающие данные.
 * Возможен пересмотр данного модального откна
 *
 * объединил функции загрузки данных
 */
/**
 *
 * Получение данных по определенной КТ
 */
// const loadControlPointEquipmentsHandler = ({data, params}) => {
// 	const newData = {...data, controlPointsId: Row.controlPointId};
// 	return apiGetFlatDataByConfigName('controlPointsEquipments')({
// 		data: newData,
// 		params,
// 	});
// };

/**
 *
 * Получение данных по определенной КТ
 */
// const loadControlPointTechMapsHandler = ({data, params}) => {
// 	const newData = {...data, controlPointsId: Row.controlPointId};
// 	return apiGetFlatDataByConfigName('controlPointsTechMaps')({
// 		data: newData,
// 		params,
// 	});
// };

export const routeMapsControlPointViewModal = (history) => {
	let Row;
	let historyChange =
		history.location.pathname === '/detours-configurator/control-points';
	const loadData = (callBack, row) => {
		Row = row;
		console.log(Row);
		if (Row.jsonEquipments) Row.equipments = JSON.parse(Row.jsonEquipments);
		callBack(row);
	};

	/**
 	*  предлагаю рассмотреть  такой вариант для обоих случаев 	
	это из документации
	 */
	const loadRowsHandler = (catalogName, sRow, {params, data}) => {
		const newData = {...data, controlPointsId: sRow.controlPointId};
		return apiGetFlatDataByConfigName(catalogName)({
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
							name: historyChange ? 'code' : 'controlPointCode',
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
							name: historyChange ? 'name' : 'controlPointName',
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
							name: 'parentName',
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
											name: 'controlPointRfidName',
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
											name: 'controlPointRfidCode',
											className: 'mb-0',
											child: {componentType: 'Text'},
										},
									],
								},
							],
						},
					],
				},
				historyChange // убрал раздел Местоположение для КТ, пока нет ясности в необходимости данной информации
					? {}
					: {
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
													name: 'coordinates',
													className: 'mb-0 ml-8',
													child: {
														componentType: 'Text',
													},
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
						requestLoadRows: (info) =>
							loadRowsHandler(
								'controlPointsEquipments',
								Row,
								info
							),
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
						requestLoadRows: (info) =>
							loadRowsHandler('controlPointsTechMaps', Row, info),
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
