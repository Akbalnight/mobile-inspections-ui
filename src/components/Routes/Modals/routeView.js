import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {paths} from '../../../constants/paths';
import {duration} from '../../Base/customColumnProps';

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
	const loadControlPointsTechMapsHandler = ({data, params}) => {
		const newData = {...data, routeId: Row.id};
		return apiGetFlatDataByConfigName('routeMaps')({
			data: newData,
			params,
		});
	};

	const allFields = [
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
							child: {componentType: 'Text'},
						},
					],
				},
			],
		},
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
						customColumnProps: [{...duration}],
						requestLoadRows: loadControlPointsHandler,
						requestLoadConfig: apiGetConfigByName(
							'routeControlPoints'
						), // нужно поставить конфиг
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
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'controlPointsTable',
					child: {
						componentType: 'LocalTable', // всего одна загрузка инфы с сервера
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
			body: [...allFields],
		},
	};
};
