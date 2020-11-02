import React from 'react';
import {notification} from 'antd';
import {Form} from 'rt-design';
import {useHistory, useParams} from 'react-router';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
// import {paths} from '../../../constants/paths';
import {codeInput} from '../Base/Inputs/CodeInput';
import {controlPointViewModal} from './Modals/routeControlPointView';
import {
	addControlPointToRoute,
	editControlPointToRoute,
} from './Modals/routeControlPointEdit';

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
			apiGetConfigByName('routes')({
				data: {id: pageParams.id},
			})
				.then((response) => {
					// console.log('loadData => response ', response.data);
					callBack(response.data[0]);
				})
				.catch((error) => {
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						notification.error({
							message:
								'Произошла ошибка при загрузки данных формы',
						});
					}
				});
		}
	};

	const loadControlPointsForRoute = ({params, data}) => {
		const newData = {
			...data,
			id: pageParams.id === 'new' ? null : pageParams.id,
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
			style: {
				margin: '20px 0px',
			}, //очень не красиво, с классами гридов сегодня не получилось отодвинуть от header
			children: [
				{
					componentType: 'Col',
					span: 16,
					children: [
						pageParams.id === 'new' ? {} : codeInput,
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

	const controlPointsFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				style: {
					marginLeft: 20, // костыль с отображение были проблемы
				},
				label: 'Контрольные точки',
				level: 5,
			},
		},

		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'LocalTable',
						history, // необходимо проверить проавльные двнные приходят
						style: {
							margin: 10, // костыль с отображение были проблемы
						},
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
			gutter: [8, 0],
			style: {
				marginLeft: 20,
				marginTop: 10, // костыль с отображение были проблемы
			},
			children: [
				{
					componentType: 'Col',
					span: 5,
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Маршрутные карты',
								level: 5,
							},
						},
					],
				},
				{
					componentType: 'Col',
					span: 2,
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Button',
								label: 'В конструктор...',
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
				{
					componentType: 'Col',
					span: 1,
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Button',
								label: 'Удаление',
								size: 'small',
								danger: true,
								// icon: 'delete',
								type: 'link',
								onClick: () => {
									console.log('Delete');
								},
							},
						},
					],
				},
			],
		},
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					style: {
						marginTop: 10, // костыль с отображение были проблемы
					},
					child: {
						componentType: 'LocalTable',
						history, // необходимо проверить проавльные двнные приходят
						style: {
							margin: 10, // костыль с отображение были проблемы
						},
						requestLoadRows: apiGetFlatDataByConfigName(
							'controlPoints'
						),
						requestLoadConfig: apiGetConfigByName('controlPoints'),
					},
				},
			],
		},
	];

	const formConfig = {
		name: 'DetoursConfiguratorRoutes',
		noPadding: true,
		labelCol: {span: 16},
		wrapperCol: {span: 24},
		loadInitData: loadData,
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		onFinish: (values) => {
			console.log('Values', values);
			// history.push(paths.DETOURS_CONFIGURATOR_ROUTES.path);
		},
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					level: 4,
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
