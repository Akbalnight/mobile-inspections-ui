import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {paths} from '../../../constants/paths';
import {duration} from '../../Base/customColumnProps';

/**
 *
 * Информационное модальное окно
 */
export const routeViewModal = (history) => {
	let Row;

	const loadData = (callBack, row) => {
		Row = row;
		callBack(row);
	};

	const loadControlPointsHandler = ({data, params}) => {
		const newData = {...data, routeId: Row.id};
		return apiGetFlatDataByConfigName('routeControlPoints')({
			data: newData,
			params,
		});
	};

	/**
	 *
	 * нужно поменять loadControlPointsTechMapsHandler, в данный момент это лишь временное решение
	 */
	const loadControlPointsTechMapsHandler = ({data, params}) => {
		const newData = {...data, routeId: Row.id};
		return apiGetFlatDataByConfigName('routeMaps')({
			data: newData,
			params,
		});
	};

	const infoFields = [
		{
			componentType: 'Row',
			justify: 'space-between',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Описание',
						level: 5,
					},
				},

				{
					componentType: 'Item',
					child: {
						componentType: 'Button',
						label: 'Редактировать',
						size: 'small',
						type: 'link',
						onClick: () => {
							history.push(
								`${paths.DETOURS_CONFIGURATOR_ROUTES.path}/${Row.id}`
							);
						},
					},
				},
			],
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'Наименование',
							name: 'name',
							child: {componentType: 'Text'},
						},
					],
				},
				{
					componentType: 'Col',
					span: 6,
					children: [
						{
							componentType: 'Item',
							label: 'Код',
							name: 'code',
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
							label: 'Продолжительность',
							name: 'duration',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
			],
		},
	];

	const tableFields = [
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
						componentType: 'LocalTable',
						customColumnProps: [{...duration}],
						style: {height: '180px'},
						requestLoadRows: loadControlPointsHandler,
						requestLoadConfig: apiGetConfigByName(
							'routeControlPoints'
						),
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
		 * тут вероятнее всего будет custom  решение
		 */
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'controlPointsTable',
					child: {
						componentType: 'LocalTable',
						style: {height: '180px'},
						requestLoadRows: loadControlPointsTechMapsHandler,
						requestLoadConfig: apiGetConfigByName('routeMaps'),
					},
				},
			],
		},
	];

	return {
		type: 'viewObject',
		title: 'Информация о маршруте',
		width: 900,
		bodyStyle: {height: 700},
		form: {
			name: 'routeDataView',
			loadInitData: loadData,
			body: [...infoFields, ...tableFields],
		},
	};
};
