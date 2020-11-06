import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import {Form} from 'rt-design';
import {apiGetFlatDataByConfigName} from '../../apis/catalog.api';
// import {Input} from 'antd'

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
		{
			componentType: 'Row',
			gutter: [0, 0],
			children: [
				{
					componentType: 'Col',
					span: 16,
					children: [
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
								requestLoadRows: apiGetFlatDataByConfigName(
									'routes'
								),
							},
						},
					],
				},
			],
		},
	];

	// Исполнитель
	const executorFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Исполнитель',
				level: 5,
			},
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 16,
					children: [
						{
							componentType: 'Item',
							label: 'Исполнитель',
							name: 'staffId',
							rules: [
								{
									message: 'Заполните исполнителя',
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
								requestLoadRows: apiGetFlatDataByConfigName(
									'staff'
								),
							},
						},
					],
				},
			],
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

	// версия - Никогда
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
							name: 'bypassDetour',
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
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 16,
					children: [
						{
							componentType: 'Item',
							label: 'Интервал, дней',
							name: 'inetrval',
							rules: [
								{
									message: 'Заполните интервал',
									required: true,
								},
							],

							child: {
								componentType: 'InputNumber',
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
	// 	 	{
	// 		componentType: 'Row',
	// 		children: [
	// 			{
	// 				componentType: 'Col',
	// 				span: 12,
	// 				children: [
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
	// 				],
	// 			},
	// 		],
	// 	},
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
	// 		{
	// 		componentType: 'Row',
	// 		children: [
	// 			{
	// 				componentType: 'Col',
	// 				span: 12,
	// 				children: [
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
	// 				],
	// 			},
	// 		],
	// 	},
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
			name: 'Ежеднемно',
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
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 16,
					children: [
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
							},
						},
					],
				},
			],
		},
		...everydayFields,
		// ...everyweekFields,
		// ...everyyearFields,
	];

	const formConfig = {
		name: 'DetoursConfiguratorDetourSchedulesForm',
		labelCol: {span: 8},
		wrapperCol: {span: 16},
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
			...repeatTimeFields,
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
