import React from 'react';
import {Form, notificationError} from 'rt-design';
import {useHistory, useParams} from 'react-router';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../apis/catalog.api';
import {paths} from '../../constants/paths';
import {controlPointViewModal} from './Modals/routeControlPointView';
import {
	addControlPointToRoute,
	editControlPointToRoute,
} from './Modals/routeControlPointEdit';
import {duration, position} from '../Base/customColumnProps';

export default function RoutesForm() {
	const history = useHistory();
	const pageParams = useParams();

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({
				name: null,
				duration: null,
			});
		} else {
			apiGetFlatDataByConfigName('routes')({
				data: {id: pageParams.id},
			})
				.then((response) => {
					// console.log('loadData => response ', response.data);
					callBack(response.data[0]);
				})
				.catch((error) =>
					notificationError(error, 'Ошибка загрузки данных формы')
				);
		}
	};

	const loadControlPointsForRoute = ({params, data}) => {
		const newData = {
			...data,
			routeId: pageParams.id === 'new' ? null : pageParams.id,
		};
		return apiGetFlatDataByConfigName('routeControlPoints')({
			data: newData,
			params,
		});
	};

	const headFields = [
		{
			componentType: 'Row',
			gutter: [0, 0],
			children: [
				{
					componentType: 'Col',
					span: 16,
					children: [
						// pageParams.id === 'new' ? {} : codeInput,
						//nameInput,// количество символов не ограниченно
						{
							componentType: 'Item',
							label: 'Наименование:',
							name: 'name',
							rules: [
								{
									message: 'Заполните наименование',
									required: true,
								},
							],
							child: {
								componentType: 'Input',
								maxLength: 100, //в документации для чего-то ограничение 100 символов
							},
						},
						{
							componentType: 'Item',
							label: 'Продолжительность, мин:',
							name: 'duration',
							child: {
								componentType: 'InputNumber',
							},
						},
					],
				},
			],
		},
	];

	const customFields = [
		{
			name: 'jsonEquipments',
			value: (row) => JSON.stringify(row.equipments),
		},
		{
			name: 'position',
			value: (row, rows) => {
				// console.log(row);
				return rows.length + 1;
			},
		},
	];

	const controlPointsFields = [
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
					name: 'controlPoints',
					child: {
						componentType: 'LocalTable',
						history, // необходимо проверить проавльные двнные приходят
						customFields: customFields,
						customColumnProps: [{...position}, {...duration}],
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								edit: {actionType: ['modal', 'page']},
								delete: {},
								up: {},
								down: {},
							},
						},
						requestLoadRows: loadControlPointsForRoute,
						requestLoadConfig: apiGetConfigByName(
							'routeControlPoints'
						),
						modals: [
							addControlPointToRoute('controlPoints'),
							editControlPointToRoute('controlPoints'),
							controlPointViewModal(),
						],
					},
				},
			],
		},
	];

	const techMapsFields = [
		{
			componentType: 'Row',
			justify: 'space-between',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Маршрутные карты',
						level: 5,
					},
				},

				{
					componentType: 'Item',
					child: {
						componentType: 'Button',
						label: 'В конструктор',
						size: 'small',
						type: 'link',
						onClick: () => {
							history.push(
								paths.DETOURS_CONFIGURATOR_ROUTE_MAPS.path
							);
						},
					},
				},
			],
		},
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'LocalTable',
						history, // необходимо проверить проавльные двнные приходят
						requestLoadRows: apiGetFlatDataByConfigName(
							'routeMaps'
						),
						requestLoadConfig: apiGetConfigByName('routeMaps'),
					},
				},
			],
		},
	];

	const processBeforeSaveForm = (rawValues) => {
		const values = {...rawValues};
		// console.log('typeof values.equipments', typeof values.equipments);
		// if(typeof values.equipments === 'string')
		// 	values.equipments = JSON.parse(values.equipments);
		return values;
	};

	const formConfig = {
		name: 'DetoursConfiguratorRoutes',
		// noPadding: true,
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		loadInitData: loadData,
		requestSaveForm: apiSaveByConfigName('routes'),
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		processBeforeSaveForm: processBeforeSaveForm,
		onFinish: (values) => {
			// console.log('Values', values);
			history.push(paths.DETOURS_CONFIGURATOR_ROUTES.path);
		},
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					className: 'mb-0',
					level: 3,
					label:
						pageParams.id === 'new'
							? 'Создание маршрута'
							: 'Редактирование маршрута',
				},
			},
		],
		body: [...headFields, ...controlPointsFields, ...techMapsFields],
		footer: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Закрыть',
					className: 'mr-8',
					onClick: () => {
						history.goBack();
					},
				},
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Сохранить',
					type: 'primary',
					htmlType: 'submit',
				},
			},
		],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
