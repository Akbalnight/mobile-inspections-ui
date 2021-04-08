import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import {Form, notificationError} from 'rt-design';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';

import {paths} from '../../../constants/paths';
// import {buttonExecutorDetour} from './Modals/modalButtonDetours';

export const DetoursAdd = () => {
	return (
		<BasePage>
			<DetoursForm />
		</BasePage>
	);
};
export const DetoursEdit = () => {
	const pageParams = useParams();

	return (
		<BasePage>
			<DetoursForm detourId={pageParams.id} />
		</BasePage>
	);
};
/**
 * Данная форма может быть представлена виде страницы или модального окна
 */
const DetoursForm = (props) => {
	const {detourId} = props;
	const history = useHistory();

	const loadData = (callBack) => {
		if (detourId) {
			apiGetFlatDataByConfigName('detours')({
				data: {id: detourId},
			})
				.then((response) => {
					callBack(response.data[0]);
				})
				.catch((error) =>
					notificationError(error, 'Ошибка загрузки данных формы')
				);
		} else {
			callBack({
				name: null,
				duration: null,
				// repeatBy: '1',//нет необходимости в данный момент. вынесен элемент обрабатывающий параметр
			});
		}
	};
	/**
	 * Ограничиваем StartDate piker
	 */
	const disabledStartDate = (startValue, endValue) => {
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	};

	/**
	 * Ограничиваем EndDate piker
	 */
	const disabledEndDate = (startValue, endValue) => {
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
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
		detourId
			? {
					componentType: 'Item',
					label: 'Код',
					name: 'code',
					child: {
						componentType: 'Text',
					},
			  }
			: {},
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
				dispatchPath: 'detourSchedules.form.startDate',
				subscribe: {
					name: 'endDate',
					path: 'rtd.detourSchedules.form.endDate',
					onChange: ({value, setSubscribeProps}) => {
						setSubscribeProps({
							disabledDate: (startValue) =>
								disabledStartDate(startValue, value),
						});
					},
				},
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
				dispatchPath: 'detourSchedules.form.endDate',
				subscribe: {
					name: 'endDate',
					path: 'rtd.detourSchedules.form.startDate',
					onChange: ({value, setSubscribeProps}) => {
						setSubscribeProps({
							disabledDate: (endValue) =>
								disabledEndDate(value, endValue),
						});
					},
				},
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
		{
			componentType: 'Item',
			label: 'Доступные испольнители',
			name: 'staffId',
			child: {
				componentType: 'SingleSelect',
				widthControl: 0,
				rowRender: 'username',
				expandColumnKey: 'id',
				heightPopup: 300,
				widthPopup: 450,
				requestLoadRows: apiGetFlatDataByConfigName('staff'),
				requestLoadDefault: apiGetFlatDataByConfigName('staff'),
			},
		},
		// buttonExecutorDetour(detourId),
		// {
		// 	componentType: 'Item',
		// 	hidden: true,
		// 	name: 'staffId',
		// 	child: {
		// 		componentType: 'Input',
		// 		subscribe: {
		// 			name: 'controlPointTechMap',
		// 			path:
		// 				'rtd.detourSchedules.executorTableChoise.executor.selected',
		// 			onChange: ({value, setSubscribeProps}) =>
		// 				value &&
		// 				setSubscribeProps({
		// 					value: value[0].id,
		// 				}),
		// 		},
		// 	},
		// },
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
								min: 0,
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
								// subscribe: {
								// 	name: 'takeIntoAccountTimeLocation',
								// 	path:
								// 		'rtd.detourSchedulesForm.takeIntoAccountTimeLocation',
								// 	onChange: ({value, setSubscribeProps}) => {
								// 		setSubscribeProps({
								// 			disabled: !value,
								// 		});
								// 	},
								// },
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
								min: 0,
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
								// subscribe: {
								// 	name: 'takeIntoAccountDateStart',
								// 	path:
								// 		'rtd.detourSchedulesForm.takeIntoAccountDateStart',
								// 	onChange: ({value, setSubscribeProps}) => {
								// 		setSubscribeProps({
								// 			disabled: !value,
								// 		});
								// 	},
								// },
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
								min: 0,
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
		wrapperCol: {span: 6},
		loadInitData: loadData,
		requestSaveForm: apiSaveByConfigName('saveDetourForm'),
		methodSaveForm: detourId ? 'PUT' : 'POST',
		onFinish: (values) =>
			history.push(paths.DETOURS_CONFIGURATOR_DETOURS.path),
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					level: 4,
					label: detourId
						? 'Редактирование обхода'
						: 'Создание обхода',
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

	return <Form {...formConfig} />;
};
