import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import {Form, notificationError} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {ReactComponent as ExecutorIcon} from '../../imgs/detour/executor-btn.svg';

export default function DetourSchedulesForm() {
	//версия Ежедневно
	// const [repeatTo, setRepeatTo] = useState(true);
	// const [repeatCount, setRepeatCount] = useState(true);
	//Версия Еженедельно
	// const [repeatTo, setRepeatTo] = useState(true);
	//Версия Ежемесячно
	// const [repeatTo, setRepeatTo] = useState(true);

	const pageParams = useParams();
	const history = useHistory();

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({
				name: null,
				duration: null,
				repeatBy: '1',
			});
		} else {
			apiGetFlatDataByConfigName('detours')({
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
	const configFilterPanel = [
		{
			componentType: 'SingleSelect',
			name: 'staffIds',
			className: 'mr-16',
			rowRender: 'positionName',
			title: 'Сотрудник',
			widthControl: 150,
			widthPopup: 300,
			heightPopup: 200,
			requestLoadRows: apiGetFlatDataByConfigName('staff'),
			requestLoadConfig: apiGetConfigByName('staff'),
		},
	];

	const selectFields = [
		{
			componentType: 'Item',
			name: 'structuralUnits', // ввел это понятие, прокинул по модалке дальше
			label: 'Структурное подразделение',
			rules: [
				{
					message: 'Заполните вариант подразделения',
					required: true,
				},
			],
			child: {
				componentType: 'SingleSelect',
				expandColumnKey: 'id',
				rowRender: 'name',
				widthControl: 0,
				widthPopup: 300,
				heightPopup: 200,
				dispatchPath: 'schedules.selectEmployeModal.structuralUnits',
				requestLoadRows: apiGetHierarchicalDataByConfigName(
					'departments'
				),
				requestLoadDefault: apiGetFlatDataByConfigName('departments'),
			},
		},
		{
			componentType: 'Item',
			name: 'workShift', // ввел это понятие, прокинул по модалке дальше
			label: 'Рабочая смена',
			rules: [
				{
					message: 'Заполните вариант смены',
					required: true,
				},
			],
			child: {
				componentType: 'SingleSelect',
				expandColumnKey: 'id',
				rowRender: 'positionName',
				widthControl: 0,
				widthPopup: 300,
				heightPopup: 200,
				defaultFilter: {departmentName: null},
				dispatchPath: 'schedules.selectEmployeModal.workShift',
				subscribe: {
					name: 'schedulesWorkShift',
					path:
						'rtd.schedules.selectEmployeModal.structuralUnits.selected',
					onChange: ({value, setReloadTable}) =>
						value &&
						setReloadTable &&
						setReloadTable({
							filter: {departmentName: value.name}, // настроить фильтрацио по сменам
						}),
				},
				requestLoadRows: apiGetFlatDataByConfigName('staff'), // поставить правильный запрос
				requestLoadDefault: apiGetFlatDataByConfigName('staff'), // поставить правильный запрос
			},
		},
	];

	const executorTableFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Исполнитель:',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'executor',
					child: {
						componentType: 'ServerTable',
						filterPanelProps: {
							configFilter: [...configFilterPanel],
						},
						requestLoadRows: apiGetFlatDataByConfigName('staff'),
						requestLoadConfig: apiGetConfigByName('staff'),
						subscribe: {
							name: 'executor',
							path:
								'rtd.schedules.selectEmployeModal.workShift.selected',
							onChange: ({value, setReloadTable}) =>
								value &&
								setReloadTable &&
								setReloadTable({
									filter: {departmentName: value.name},
								}),
						},
					},
				},
			],
		},
	];

	// Описание
	const headFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
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
				format: 'DD.MM.YYYY',
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
				format: 'DD.MM.YYYY',
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
		 * тут сделал небольшую подписку на селектор внутри модалки, для красивого отображения исполнителся
		 * обхода.
		 * позже можно подписать на таблицу Исполнителей внутри модального окна
		 */
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Исполнитель',
				level: 5,
				subscribe: {
					name: 'controlPointTechMap',
					path: 'rtd.schedules.selectEmployeModal.workShift.selected',
					onChange: ({value, setSubscribeProps}) =>
						value &&
						setSubscribeProps({
							label: `Исполнитель обхода ${value.positionName}`,
						}),
				},
			},
		},
		{
			componentType: 'Item',
			label: 'Доступные исполнители',
			name: 'staffId',
			rules: [
				{
					message: 'Заполните исполнителя',
					required: true,
				},
			],
			child: {
				componentType: 'Modal',
				buttonProps: {
					label: 'Выбрать',
					icon: <ExecutorIcon />,
					type: 'default',
				},
				modalConfig: {
					type: `${pageParams.id === 'new' ? 'add' : 'edit'}OnLocal`,
					title: 'Выбор исполнителя',
					width: 576,
					bodyStyle: {
						height: 496,
					},
					okText: 'Выбрать',
					form: {
						name: `${
							pageParams.id === 'new' ? 'add' : 'edit'
						}ModalForm`,
						labelCol: {span: 8},
						wrapperCol: {span: 12},
						loadInitData: (callBack, row) => {
							pageParams.id === 'new'
								? callBack(null)
								: callBack(row);
						},
						body: [...selectFields, ...executorTableFields],
					},
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

	const radioStyle = {
		display: 'block',
		height: '56px',
		lineHeight: '56px',
	};

	// Подвал
	const footer = [
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

	// //версия - Ежедневно
	const everydayFields = [
		{
			componentType: 'Item',
			label: 'Интервал, дней',
			name: 'interval',
			rules: [
				{
					message: 'Заполните интервал',
					required: true,
				},
			],

			// hidden: true,

			subscribe: {
				name: 'finishRepeatType',
				path: 'rtd.schedules.selectRepeat.repeat.selected',
				onChange: ({value, setSubscribeProps}) => {
					console.log(value);
					value &&
						setSubscribeProps({
							hidden: !(value.name === 'Ежедневно'),
						});
				},
			},
			child: {
				componentType: 'InputNumber',
			},
		},

		{
			componentType: 'Row',
			hidden: true,
			children: [
				{
					componentType: 'Col',
					span: 16,
					children: [
						{
							componentType: 'Row',
							children: [
								{
									componentType: 'Col',
									span: 8,
									children: [
										{
											componentType: 'Item',
											child: {
												componentType: 'Text',
												label: 'Завершить повторение:',
											},
										},
									],
								},
								{
									componentType: 'Col',
									span: 4,
									children: [
										{
											componentType: 'Item',
											name: 'finishRepeatType',
											child: {
												componentType: 'RadioGroup',
												dispatchPath:
													'detourSchedulesForm.finishRepeatType',
												options: [
													{
														label: 'Никогда',
														value: 'never',
														style: radioStyle,
													},
													{
														label: 'Повторять до',
														value: 'repeatDate',
														style: radioStyle,
													},
													{
														label: 'После',
														value: 'repeatCount',
														style: radioStyle,
													},
												],
											},
										},
									],
								},
								{
									componentType: 'Col',
									style: {marginTop: '68px'},
									span: 12,
									children: [
										{
											componentType: 'Item',
											name: 'finishRepeatDate',
											label: 'Выберите дату',
											...footerInputLayout,
											child: {
												componentType: 'DatePicker',
												subscribe: {
													name: 'finishRepeatType',
													path:
														'rtd.detourSchedulesForm.finishRepeatType',
													onChange: ({
														value,
														setSubscribeProps,
													}) => {
														if (
															value !==
															'repeatDate'
														)
															setSubscribeProps({
																disabled: true,
															});
														else
															setSubscribeProps({
																disabled: false,
															});
													},
												},
											},
										},
										{
											componentType: 'Item',
											name: 'finishRepeatCount',
											label: 'Количество',
											...footerInputLayout,
											child: {
												componentType: 'InputNumber',
												subscribe: {
													name: 'finishRepeatType',
													path:
														'rtd.detourSchedulesForm.finishRepeatType',
													onChange: ({
														value,
														setSubscribeProps,
													}) => {
														if (
															value !==
															'repeatCount'
														)
															setSubscribeProps({
																disabled: true,
															});
														else
															setSubscribeProps({
																disabled: false,
															});
													},
												},
											},
										},
									],
								},
							],
						},
					],
				},
			],
		},
	];

	// //версия - Еженедельно
	// const everyweekFields = [
	// 					{
	// 						componentType: 'Item',
	// 						label: 'Интервал, месяцев',
	// 						name: 'monthCount',
	// 						rules: [
	// 							{
	// 								message: 'Заполните вариант интервала',
	// 								required: true,
	// 							},
	// 						],
	// 						child: {
	// 							componentType: 'InputNumber',
	// 							max: 12,
	// 						},
	// 					},

	// 	{
	// 		componentType: 'Row',
	// 		children: [
	// 			{
	// 				componentType: 'Col',
	// 				span: 12,
	// 				children: [
	// 					{
	// 						componentType: 'Item',
	// 						label: 'День выполнения',
	// 						name: 'dayCount',
	// 						rules: [
	// 							{
	// 								message: 'Заполните вариант дня',
	// 								required: true,
	// 							},
	// 						],
	// 						child: {
	// 							componentType: 'InputNumber',
	// 							max: 31,
	// 						},
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		componentType: 'Row',
	// 		gutter: [8, 8],
	// 		children: [
	// 			{
	// 				componentType: 'Col',
	// 				span: 4,
	// 				children: [
	// 					{
	// 						componentType: 'Item',
	// 						child: {
	// 							style: {
	// 								marginLeft: 100,
	// 							},
	// 							componentType: 'Divider',
	// 							// componentType: 'Text',// раскомментировать как заработает
	// 							label: 'Завершить повторение:',
	// 						},
	// 					},
	// 				],
	// 			},
	// 			// сюда надо поставить RadioGroup
	// 						{
	// 							componentType: 'Col',
	// 							span: 12,
	// 							children: [
	// 								{
	// 									componentType: 'Row',
	// 									className: 'mb-16',
	// 									children: [
	// 										{
	// 											componentType: 'Item',

	// 											child: {
	// 												componentType: 'Radio',
	// 												label: 'Никогда',
	// 											},
	// 										},
	// 									],
	// 								},
	// 								{
	// 									componentType: 'Row',
	// 									className: 'mb-16',
	// 									children: [
	// 										{
	// 											componentType: 'Item',
	// 											child: {
	// 												componentType: 'Radio',
	// 												label: 'Повторять до',
	// 												checked: !repeatTo,//странно
	// 												onChange: () => {
	// 													setRepeatTo((state) => !state);
	// 												},
	// 												style: {
	// 													marginTop: 10,
	// 												},
	// 											},
	// 										},
	// 										{
	// 											componentType: 'Item',
	// 											name: 'repeatDate',

	// 											label: 'Выберите дату',
	// 											child: {
	// 												componentType: 'DatePicker',

	// 												disabled: repeatTo,
	// 											},
	// 										},
	// 									],
	// 								},
	// 							]
	// 						}
	// 		],
	// 	},
	// ];

	// // версия Ежегодно
	// const everyyearFields = [
	// 					{
	// 						componentType: 'Item',
	// 						label: 'Интервал',
	// 						name: 'monthCount',
	// 						rules: [
	// 							{
	// 								message: 'Заполните вариант интервала',
	// 								required: true,
	// 							},
	// 						],
	// 						child: {
	// 							componentType: 'InputNumber',
	// 						},
	// 					},

	// 	{
	// 		componentType: 'Row',
	// 		children: [
	// 			{
	// 				componentType: 'Col',
	// 				span: 12,
	// 				children: [
	// 					{
	// 						componentType: 'Item',
	// 						label: 'Дата выполнения',
	// 						name: 'dayCount',
	// 						rules: [
	// 							{
	// 								message: 'Заполните вариант дата',
	// 								required: true,
	// 							},
	// 						],
	// 						child: {
	// 							componentType: 'DatePicker',
	// 							// picker: 'date',
	// 						},
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// 		{
	// 			componentType: 'Row',
	// 			gutter: [8, 8],
	// 			children: [
	// 				{
	// 					componentType: 'Col',
	// 					span: 4,
	// 					children: [
	// 						{
	// 							componentType: 'Item',
	// 							child: {
	// 								style: {
	// 									marginLeft: 100,
	// 								},
	// 								componentType: 'Divider',
	// 								// componentType: 'Text',// раскомментировать как заработает
	// 								label: 'Завершить повторение:',
	// 							},
	// 						},
	// 					],
	// 				},
	// 				// сюда надо поставить RadioGroup
	// 							{
	// 								componentType: 'Col',
	// 								span: 12,
	// 								children: [
	// 									{
	// 										componentType: 'Row',
	// 										className: 'mb-16',
	// 										children: [
	// 											{
	// 												componentType: 'Item',

	// 												child: {
	// 													componentType: 'Radio',
	// 													label: 'Никогда',
	// 												},
	// 											},
	// 										],
	// 									},
	// 									{
	// 										componentType: 'Row',
	// 										className: 'mb-16',
	// 										children: [
	// 											{
	// 												componentType: 'Item',
	// 												child: {
	// 													componentType: 'Radio',
	// 													label: 'Повторять до',
	// 													checked: !repeatTo,//странно
	// 													onChange: () => {
	// 														setRepeatTo((state) => !state);
	// 													},
	// 													style: {
	// 														marginTop: 10,
	// 													},
	// 												},
	// 											},
	// 											{
	// 												componentType: 'Item',
	// 												name: 'repeatDate',

	// 												label: 'Выберите дату',
	// 												child: {
	// 													componentType: 'DatePicker',

	// 													disabled: repeatTo,
	// 												},
	// 											},
	// 										],
	// 									},
	// 								]
	// 							}
	// 			],
	// 		},
	// ];

	// итоговый вариант

	const rows = [
		{
			id: '1',
			name: 'Никогда',
		},
		{
			id: '2',
			name: 'Ежедневно',
		},
		{
			id: '3',
			name: 'Ежемесячно',
		},
		{
			id: '4',
			name: 'Ежегодно',
		},
	];
	const repeatTimeFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Повторение',
				level: 5,
			},
		},
		{
			componentType: 'Item',
			label: 'Повторение:',
			name: 'repeatBy',
			rules: [
				{
					message: 'Заполните вариант повторения',
					required: true,
				},
			],
			child: {
				componentType: 'SingleSelect',
				rowRender: 'name',
				widthControl: 0,
				widthPopup: 280,
				rows: rows,
				dispatchPath: 'schedules.selectRepeat.repeat',
			},
		},

		...everydayFields,
		// ...everyweekFields,
		// ...everyyearFields,
	];

	const formConfig = {
		name: 'DetoursConfiguratorDetourSchedulesForm',
		labelCol: {span: 10},
		wrapperCol: {span: 8},
		loadInitData: loadData,
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		onFinish: (values) => {
			console.log('Values', values);
		},
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
		body: [
			...headFields,
			...executorFields,
			//экспериментальная версия
			...(pageParams.id === 'new' ? repeatTimeFields : []),
			//рабочая версия
			// ...repeatTimeFields,
			...footer,
		],
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
