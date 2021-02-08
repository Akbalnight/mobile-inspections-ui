import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import {Form, notificationError} from 'rt-design';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../apis/catalog.api';

import {paths} from '../../constants/paths';
import {buttonExecutorDetour} from './Modals/modalButtonDetours';

/**
 * Данная форма может быть представлена виде страницы или модального окна
 */
export default function DetoursForm() {
	const pageParams = useParams();
	const history = useHistory();

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({
				name: null,
				duration: null,
				// repeatBy: '1',//нет необходимости в данный момент. вынесен элемент обрабатывающий параметр
			});
		} else {
			apiGetFlatDataByConfigName('detours')({
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

	/**
	 * Основные поля формы создания/редактирования дефекта
	 */
	const headFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				className: 'mt-16',
				level: 5,
			},
		},
		pageParams.id === 'new'
			? {}
			: {
					componentType: 'Item',
					label: 'Код',
					name: 'code',
					child: {
						componentType: 'Text',
					},
			  },
		{
			componentType: 'Item',
			label: 'Наименование обхода',
			name: 'name',
			rules: [
				{
					message: 'Заполните наименование',
					required: true,
				},
			],
			child: {
				componentType: 'Input',
				maxLength: 100,
			},
		},
		{
			componentType: 'Item',
			label: 'Дата начала',
			name: 'dateStartPlan',
			rules: [
				{
					message: 'Заполните дату начала обхода',
					required: true,
				},
			],
			child: {
				componentType: 'DatePicker',
				format: 'DD.MM.YYYY HH:mm:ss',
				showTime: true,
			},
		},
		{
			componentType: 'Item',
			label: 'Дата окончания',
			name: 'dateFinishPlan',
			rules: [
				{
					message: 'Заполните дату окончания обхода',
					required: true,
				},
			],
			child: {
				componentType: 'DatePicker',
				format: 'DD.MM.YYYY HH:mm:ss',
				showTime: true,
			},
		},

		{
			componentType: 'Item',
			label: 'Маршрут',
			name: 'routeId',
			rules: [
				{
					message: 'Заполните маршрут',
					required: true,
				},
			],
			child: {
				componentType: 'SingleSelect',
				widthControl: 0,
				widthPopup: 350,
				heightPopup: 350,
				commandPanelProps: {
					systemBtnProps: {search: {}},
				},
				searchParamName: 'name',
				rowRender: 'name',
				requestLoadRows: apiGetFlatDataByConfigName('routes'),
			},
		},
	];

	// Исполнитель
	const executorFields = [
		/**
		 * тут сделал небольшую подписку на селектор внутри модалки, для отображения исполнителся
		 * обхода.
		 * позже можно подписать на таблицу Исполнителей внутри модального окна
		 */
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Исполнитель',
				className: 'mt-16',
				level: 5,
				subscribe: {
					name: 'controlPointTechMap',
					path:
						'rtd.detourSchedules.executorTableChoise.executor.selected',
					onChange: ({value, setSubscribeProps}) =>
						value &&
						setSubscribeProps({
							label: `Исполнитель обхода ${value[0].positionName}`,
						}),
				},
			},
		},
		buttonExecutorDetour(pageParams),
		{
			componentType: 'Item',
			hidden: true,
			name: 'staffId',
			child: {
				componentType: 'Input',
				subscribe: {
					name: 'controlPointTechMap',
					path:
						'rtd.detourSchedules.executorTableChoise.executor.selected',
					onChange: ({value, setSubscribeProps}) =>
						value &&
						setSubscribeProps({
							value: value[0].id,
						}),
				},
			},
		},
	];

	const footerCheckboxLayout = {
		labelCol: {span: 22},
		wrapperCol: {span: 2},
	};
	const footerInputLayout = {
		labelCol: {span: 16},
		wrapperCol: {span: 8},
	};

	// Подвал
	const footer = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Допуски по обходу',
				className: 'mt-16',
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
							label: 'Учитывать порядок обхода',
							name: 'saveOrderControlPoints',
							valuePropName: 'checked',
							...footerCheckboxLayout,
							child: {
								componentType: 'Checkbox',
							},
						},
					],
				},
			],
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
							name: 'takeIntoAccountTimeLocation',
							label: 'Учитывать время обхода',
							valuePropName: 'checked',
							...footerCheckboxLayout,
							child: {
								componentType: 'Checkbox',
								dispatchPath:
									'detourSchedulesForm.takeIntoAccountTimeLocation',
							},
						},
					],
				},
				{
					componentType: 'Col',
					span: 10,
					children: [
						{
							componentType: 'Item',
							name: 'possibleDeviationLocationTime',
							label: 'Допустимое откл. на точке, мин',
							...footerInputLayout,
							child: {
								componentType: 'InputNumber',
								subscribe: {
									name: 'takeIntoAccountTimeLocation',
									path:
										'rtd.detourSchedulesForm.takeIntoAccountTimeLocation',
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabled: !value,
										});
									},
								},
							},
						},
					],
				},
			],
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
							name: 'takeIntoAccountDateStart',
							label: 'Учитывать время начала',
							valuePropName: 'checked',
							...footerCheckboxLayout,
							child: {
								componentType: 'Checkbox',
								dispatchPath:
									'detourSchedulesForm.takeIntoAccountDateStart',
							},
						},
					],
				},
				{
					componentType: 'Col',
					span: 10,
					children: [
						{
							componentType: 'Item',
							name: 'possibleDeviationDateStart',
							label: 'Допустимое откл., мин',
							...footerInputLayout,
							child: {
								componentType: 'InputNumber',
								subscribe: {
									name: 'takeIntoAccountDateStart',
									path:
										'rtd.detourSchedulesForm.takeIntoAccountDateStart',
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabled: !value,
										});
									},
								},
							},
						},
					],
				},
			],
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
							name: 'takeIntoAccountDateFinish',
							label: 'Учитывать время окончания',
							valuePropName: 'checked',
							...footerCheckboxLayout,
							child: {
								componentType: 'Checkbox',
								dispatchPath:
									'detourSchedulesForm.takeIntoAccountDateFinish',
							},
						},
					],
				},
				{
					componentType: 'Col',
					span: 10,
					children: [
						{
							componentType: 'Item',
							name: 'possibleDeviationDateFinish',
							label: 'Допустимое откл., мин',
							...footerInputLayout,
							child: {
								componentType: 'InputNumber',
								subscribe: {
									name: 'takeIntoAccountDateFinish',
									path:
										'rtd.detourSchedulesForm.takeIntoAccountDateFinish',
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabled: !value,
										});
									},
								},
							},
						},
					],
				},
			],
		},
	];

	const formConfig = {
		name: 'DetoursConfiguratorDetourSchedulesForm',
		labelCol: {span: 10},
		wrapperCol: {span: 8},
		loadInitData: loadData,
		requestSaveForm: apiSaveByConfigName('saveDetourForm'),
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		onFinish: (values) =>
			history.push(paths.DETOURS_CONFIGURATOR_DETOURS.path),
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					level: 4,
					label:
						pageParams.id === 'new'
							? 'Создание обхода'
							: 'Редактирование обхода',
				},
			},
		],
		body: [...headFields, ...executorFields, ...footer],
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
