import {notification} from 'antd';
import React from 'react';
import {useHistory, useParams} from 'react-router';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveTechMap,
} from '../../../apis/catalog.api';
import {Form} from 'rt-design';
import {paths} from '../../../constants/paths';

/**
 * Компонент не закончен
 */

export default function DetoursConfiguratorRoutesForm() {
	let history = useHistory();
	const pageParams = useParams();

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({
				name: null,
				duration: null,
			});
		} else {
			apiGetFlatDataByConfigName('techMaps')({
				data: {id: pageParams.id},
			})
				.then((response) => {
					// console.log("loadData => response ", response.data);
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

	const customFields = [
		{
			name: 'name',
			value: (row) => `${row.name}`,
		},
		{
			name: 'duration',
			value: (row) => parseInt(row.hours * 60) + parseInt(row.minutes),
		},
	];

	const loadTechMapsHandler = ({data, params}) => {
		const newData = {
			...data,
			techMapId: pageParams.id === 'new' ? null : pageParams.id,
		};
		return apiGetFlatDataByConfigName('techOperations')({
			data: newData,
			params,
		});
	};

	const formConfig = {
		name: 'DetoursConfiguratorRoutes',
		noPadding: true,
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		loadInitData: loadData,
		requestSaveForm: apiSaveTechMap,
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		onFinish: () => {
			history.push(paths.DETOURS_CONFIGURATOR_ROUTES.path);
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
					className: 'mb-0',
					level: 3,
				},
			},
		],
		body: [
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						children: [],
					},
					{
						componentType: 'Item',
						children: [
							{
								componentType: 'Item',
								child: {
									componentType: 'Title',
									label: 'Контрольные точки',
								},
								className: 'mb-0',
								level: 5,
							},
							{
								componentType: 'ServerTable',
								customFields: customFields,
								requestLoadConfig: apiGetConfigByName(
									'techOperations'
								),
								requestLoadRows: loadTechMapsHandler,
							},
						],
					},
				],
			},
		],
		footer: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Закрыть',
					className: 'mr-8',
					onClick: () =>
						history.push(paths.DETOURS_CONFIGURATOR_ROUTES.path),
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
