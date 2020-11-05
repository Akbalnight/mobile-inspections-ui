import React, {useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import {Form} from 'rt-design';
import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';

export default function DetourConfiguratorDetourSchedulesForm() {
	//версия Никогда
	const [timeDetourCount, setTimeDetourCount] = useState(true);
	const [timeStartDetourCount, setTimeStartDetourCount] = useState(true);
	const [timeEndDetourCount, setTimeEndDetourCount] = useState(true);
	//версия Ежедневно
	// const [repeatTo, setRepeatTo] = useState(true);
	// const [repeatCount, setRepeatCount] = useState(true);
	//Версия Еженедельно
	// const [repeatTo, setRepeatTo] = useState(true);
	//Версия Ежемесячно
	// const [repeatTo, setRepeatTo] = useState(true);

	const pageParams = useParams();
	const history = useHistory();

	const headFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				level: 5,
				style: {
					marginLeft: 20, // костыль с отображение были проблемы
					marginTop: 20, // костыль с отображение были проблемы
				},
			},
		},
		{
			componentType: 'Row',
			gutter: [8, 8],
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Наименование обхода',
							name: 'nameSchedule',
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
							name: 'dateStart',
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
							name: 'dateEnd',
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
							name: 'routeName',
							rules: [
								{
									message: 'Заполните маршрут',
									required: true,
								},
							],
							child: {
								componentType: 'SingleSelect',
							},
						},
					],
				},
			],
		},
	];

	const executorFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Исполнитель',
				level: 5,
				style: {
					marginLeft: 20, // костыль с отображение были проблемы
					marginTop: 20, // костыль с отображение были проблемы
				},
			},
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Исполнитель',
							name: 'executorName',
							rules: [
								{
									message: 'Заполните исполнителя',
									required: true,
								},
							],
							child: {
								componentType: 'SingleSelect',
								rowRender: 'name',
								widthControl: 0,
							},
						},
					],
				},
			],
		},
	];
	// версия - Никогда
	const neverFields = [
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Col',
							span: 12,
							children: [
								{
									componentType: 'Item',
									label: 'Учитывать порядок обхода',
									name: 'bypassDetour',
									valuePropName: 'checked',
									child: {
										componentType: 'Checkbox',
									},
								},
							],
						},
						{
							componentType: 'Row',
							children: [
								{
									componentType: 'Col',
									span: 12,
									children: [
										{
											componentType: 'Item',
											label: 'Учитывать время обхода',
											valuePropName: 'checked',
											child: {
												componentType: 'Checkbox',
												onChange: () => {
													setTimeDetourCount(
														(state) => !state
													);
												},
											},
										},
									],
								},
								{
									componentType: 'Col',
									span: 12,
									children: [
										{
											componentType: 'Item',
											name: 'timeDetourCount',
											label:
												'Допустимое откл. на точке, мин:',
											child: {
												componentType: 'InputNumber',
												disabled: timeDetourCount, // надо обнулять при true
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
									span: 12,
									children: [
										{
											componentType: 'Item',
											label: 'Учитывать время начала',
											valuePropName: 'checked',
											child: {
												componentType: 'Checkbox',
												onChange: () => {
													setTimeStartDetourCount(
														(state) => !state
													);
												},
											},
										},
									],
								},
								{
									componentType: 'Col',
									span: 12,
									children: [
										{
											componentType: 'Item',
											name: 'timeStartDetourCount',
											label: 'Допустимое откл., мин:',
											child: {
												componentType: 'InputNumber',
												disabled: timeStartDetourCount, // надо обнулять при true
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
									span: 12,
									children: [
										{
											componentType: 'Item',
											label: 'Учитывать время окончания',
											valuePropName: 'checked',
											child: {
												componentType: 'Checkbox',
												onChange: () => {
													setTimeEndDetourCount(
														(state) => !state
													);
												},
											},
										},
									],
								},
								{
									componentType: 'Col',
									span: 12,
									children: [
										{
											componentType: 'Item',
											name: 'timeEndDetourCount',
											label: 'Допустимое откл., мин:',
											child: {
												componentType: 'InputNumber',
												disabled: timeEndDetourCount, // надо обнулять при true
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

	// //версия - Ежедневно
	// const everydayFields = [
	//  	{
	// 		componentType: 'Row',
	// 		children: [
	// 			{
	// 				componentType: 'Col',
	// 				className: 'md-4',
	// 				span: 12,
	// 				children: [
	// 					{
	// 						componentType: 'Item',
	// 						label: 'Интервал, дней',
	// 						name: 'repeatCase',
	// 						rules: [
	// 							{
	// 								message: 'Заполните интервал',
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
	// 							componentType: 'Text',
	// 							label: 'Завершить повторение:',
	// 						},
	// 					},
	// 				],
	// 			},

	// 			// сюда надо поставить RadioGroup
	// 			{
	// 				componentType: 'Col',
	// 				span: 12,
	// 				children: [
	// 					{
	// 						componentType: 'Row',
	// 						className: 'mb-16',
	// 						children: [
	// 							{
	// 								componentType: 'Item',

	// 								child: {
	// 									componentType: 'Radio',
	// 									label: 'Никогда',
	// 								},
	// 							},
	// 						],
	// 					},
	// 					{
	// 						componentType: 'Row',
	// 						className: 'mb-16',
	// 						children: [
	// 							{
	// 								componentType: 'Item',
	// 								child: {
	// 									componentType: 'Radio',
	// 									label: 'Повторять до',
	// 									onChange: () => {
	// 										setRepeatTo((state) => !state);
	// 									},
	// 									style: {
	// 										marginTop: 10,
	// 									},
	// 								},
	// 							},
	// 							{
	// 								componentType: 'Item',
	// 								name: 'repeatDate',

	// 								label: 'Выберите дату',
	// 								child: {
	// 									componentType: 'DatePicker',

	// 									disabled: repeatTo,
	// 								},
	// 							},
	// 						],
	// 					},
	// 					{
	// 						componentType: 'Row',
	// 						className: 'mb-16',
	// 						children: [
	// 							{
	// 								componentType: 'Row',
	// 								className: 'mb-16',
	// 								children: [
	// 									{
	// 										componentType: 'Item',
	// 										child: {
	// 											componentType: 'Radio',
	// 											label: 'После',
	// 											onChange: () => {
	// 												setRepeatCount(
	// 													(state) => !state
	// 												);
	// 											},
	// 										},
	// 									},
	// 								],
	// 							},

	// 							{
	// 								componentType: 'Item',
	// 								name: 'repeatDate',
	// 								label: 'Количество',
	// 								child: {
	// 									componentType: 'InputNumber',
	// 									disabled: repeatCount,
	// 								},
	// 							},
	// 						],
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// ];

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

	const repeatTimeFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Повторение',
				level: 5,
				style: {
					marginLeft: 20, // костыль с отображение были проблемы
					marginTop: 20, // костыль с отображение были проблемы
				},
			},
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Повторение:',
							name: 'repeatCase',
							rules: [
								{
									message: 'Заполните вариант повторения',
									required: true,
								},
							],
							child: {
								componentType: 'SingleSelect',
								rowRender: 'name', // поменять на необходимое название 'repeatCase'
								widthControl: 0,
								onChangeKeys: (value, option) => {
									console.log(option);
								},
								// временное решение
								requestLoadDefault: apiGetFlatDataByConfigName(
									'techMapsStatuses'
								),
								requestLoadRows: apiGetFlatDataByConfigName(
									'techMapsStatuses'
								),
							},
						},
					],
				},
			],
		},
		...neverFields,
		// ...everydayFields,
		// ...everyweekFields,
		// ...everyyearFields,
	];

	const formConfig = {
		noPadding: true,
		name: 'DetoursConfiguratorDetourSchedulesForm',
		labelCol: {span: 16},
		wrapperCol: {span: 24},
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
		body: [...headFields, ...executorFields, ...repeatTimeFields],
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
