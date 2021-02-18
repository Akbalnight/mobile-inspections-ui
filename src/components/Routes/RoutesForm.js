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
import {routeControlPointViewModal} from './Modals/routeControlPointView';
import {
	addControlPointToRoute,
	editControlPointToRoute,
} from './Modals/routeControlPointEdit';
import {duration, position} from '../Base/customColumnProps';
import {codeInput} from '../Base/Inputs/CodeInput';

/**
 * компонент создания/редактирования маршрута.
 * loadData - позволяет получать данные о конкретном маршруте и обрабатывать их в файле
 *
 *  paths.DETOURS_CONFIGURATOR_ROUTE_MAPS.path+'/'+`${pageParams.id==='new'? '': pageParams.id}`
 *  как один из возможных вариантов переадресации в конструктор маршрутных карт
 *
 * routeMapsControlPointViewModal(history) - временное решение пока не обсудили входные данные с сервера
 */
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
						pageParams.id === 'new' ? {} : codeInput,
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
								maxLength: 100, //в документации, ограничение 100 символов
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
						history,
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
							routeControlPointViewModal(history),
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
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		loadInitData: loadData,
		requestSaveForm: apiSaveByConfigName('routes'),
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		processBeforeSaveForm: processBeforeSaveForm,
		onFinish: (values) => {
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
