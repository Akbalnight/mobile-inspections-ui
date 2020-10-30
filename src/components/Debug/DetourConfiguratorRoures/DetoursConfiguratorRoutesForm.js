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
import {codeInput} from '../../Base/Inputs/CodeInput';

/**
 * Компонент не закончен
 */

export default function DetoursConfiguratorRoutesForm() {
	const history = useHistory();
	const pageParams = useParams();

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({
				name: null,
				duration: null,
			});
		} else {
			apiGetConfigByName('techMaps')({
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
					'margin-left': 20, // костыль с отображение были проблемы
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
								edit: {actionType: ['page', 'modal']},
								delete: {},
								up: {},
								down: {},
							},
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

	const techMapsFields = [
		{
			componentType: 'Row',
			gutter: [8, 0],
			children: [
				{
					componentType: 'Col',
					span: 3,
					children: [
						{
							componentType: 'Item',
							child: {
								style: {
									'margin-left': 20, // костыль с отображение были проблемы
								},
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
					label:
						pageParams.id === 'new'
							? 'Создание маршрута'
							: 'Редактирование маршрута',

					level: 4,
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
