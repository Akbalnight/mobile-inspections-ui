import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

export const routeViewModal = () => {
	let Row;

	const loadData = (callBack, row) => {
		Row = row;
		callBack(row);
	};

	const loadControlPointsHandler = ({data, params}) => {
		const newData = {...data, controlPointsId: Row.id};
		return apiGetFlatDataByConfigName('controlPointsEquipments')({
			//поставить верный конфиг
			data: newData,
			params,
		});
	};
	const loadControlPointsTechMapsHandler = ({data, params}) => {
		const newData = {...data, controlPointsId: Row.id};
		return apiGetFlatDataByConfigName('controlPointsTechMaps')({
			data: newData,
			params,
		});
	};
	/**
	 * поставил тех карты и оборудование на контрольной точке, для проверки доставки ROW.id
	 * Выдает оборудование по каждой точке. Нужно запрос заменить на подходящий
	 */

	const allFields = [
		/**
		 * ниже описан варивнт Есть Title и Button, в фигме эта кнопка нарисована в footer, но приработе с
		 * footer, на придется вручную делать остальные кнопки. В данной систуации кнопака загрыть исполняет
		 * свои инструкции без дополнительных действий. При этом возможно юзеру будет комфорнее понять что будет редактировать он Маршрут.
		 *
		 */

		//headFields
		{
			componentType: 'Row',
			gutter: [8, 8],
			children: [
				{
					componentType: 'Col',
					span: 3,
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Описание',
								level: 5,
							},
						},
					],
				},
				{
					componentType: 'Col',
					span: 3,
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Button',
								label: 'Редактировать',
								size: 'small',
								// icon: 'edit',
								type: 'link',
								onClick: () => {
									console.log('Edit');
								},
							},
						},
					],
				},
			],
		},

		/**
		 * ниже описан вариант где в шапке только Title
		 */
		// {
		// 	componentType: 'Item',
		// 	child: {
		// 		componentType: 'Title',
		// 		label: 'Описание',
		// 		level: 5,
		// 	},
		// },

		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 8, // в этом столбце по фигме мало инфы
					children: [
						{
							componentType: 'Item',
							label: 'Код',
							name: 'code',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Продолжительность',
							name: 'duration',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
				{
					componentType: 'Col',
					span: 12, // возможно Наименование будет длинным
					children: [
						{
							componentType: 'Item',
							label: 'Наименование',
							name: 'name',
							className: 'md-16',
							child: {componentType: 'Text'},
						},
					],
				},
			],
		},

		//controlPointsFields
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Контрольные точки',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			className: 'mb-16',
			children: [
				{
					componentType: 'Item',
					name: 'controlPointsTable',
					child: {
						componentType: 'LocalTable', // всего одна загрузка инфы с сервера

						requestLoadRows: loadControlPointsHandler,
						requestLoadConfig: apiGetConfigByName('controlPoints'), // нужно поставить конфиг
					},
				},
			],
		},

		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Маршрутные карты',
				level: 5,
			},
		},
		/**
		 * Участок ниже сделан для компановкеи макета, на его место встнет новый компонент
		 * В котором мы сможем увидеть отображение Маршрутных карт
		 */

		// routeMapsFields
		{
			componentType: 'Layout',
			className: 'mb-16',
			children: [
				{
					componentType: 'Item',
					name: 'controlPointsTable',
					child: {
						componentType: 'LocalTable', // всего одна загрузка инфы с сервера
						requestLoadRows: loadControlPointsTechMapsHandler,
						requestLoadConfig: apiGetConfigByName(
							'techMaps' // поставить правильный конфиг
						),
					},
				},
			],
		},
	];

	return {
		type: 'viewObject',
		title: 'Информация о маршруте',
		width: 783,
		bodyStyle: {
			height: 682,
		},
		form: {
			name: 'routeDataView',
			loadInitData: loadData,
			body: [...allFields],
		},
	};
};
