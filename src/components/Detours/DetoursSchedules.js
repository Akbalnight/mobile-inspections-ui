import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';

export default function DetoursSchedules() {
	const formConfig = {
		noPadding: true,
		name: 'DetourSchedulesForm',
		onFinish: (values) => {
			console.log('Values', values);
		},

		body: [
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						child: {
							componentType: 'ServerTable',
							selectable: true,
							fixWidthColumn: true,
							// showSelection: true,
							// rowRenderShowSelection: ({rowData, rowIndex}) =>{
							//     console.log(rowData)
							// return (
							// 	<div>
							// 		<div>{rowData.name}</div>

							// 	</div>
							// );},
							requestLoadRows: apiGetFlatDataByConfigName(
								'detours'
							),
							requestLoadConfig: apiGetConfigByName('detours'),
						},
					},
				],
			},
		],
	};
	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
// const radioStyle = {
// 	display: 'block',
// 	height: '56px',
// 	lineHeight: '56px',
// };
// //версия - Ежедневно
// const everydayFields = [
// 	{
// 		componentType: 'Item',
// 		label: 'Интервал, дней',
// 		name: 'interval',
// 		// hidden: Boolean(hidden.day),
// 		// rules: [
// 		// 	{
// 		// 		message: 'Заполните интервал',
// 		// 		required: true,
// 		// 	},
// 		// ],
// 		// subscribe: {
// 		// 	name: 'interval',
// 		// 	path: 'rtd.detourSchedulesForm.selectRepeat.repeat.selected',
// 		// 	onChange: ({value, setSubscribeProps}) => {
// 		// 		// console.log(value.id);
// 		// 		value &&
// 		// 			setSubscribeProps({
// 		// 				hidden: !(value.id === 2),
// 		// 			});
// 		// 	},
// 		// },
// 		child: {
// 			componentType: 'InputNumber',
// 		},
// 	},

// 	{
// 		componentType: 'Row',
// 		// hidden: `${hidden.day}`,
// 		children: [
// 			{
// 				componentType: 'Col',
// 				span: 16,
// 				children: [
// 					{
// 						componentType: 'Row',
// 						children: [
// 							{
// 								componentType: 'Col',
// 								span: 8,
// 								children: [
// 									{
// 										componentType: 'Item',
// 										child: {
// 											componentType: 'Text',
// 											label: 'Завершить повторение:',
// 										},
// 									},
// 								],
// 							},
// 							{
// 								componentType: 'Col',
// 								span: 4,
// 								children: [
// 									{
// 										componentType: 'Item',
// 										name: 'finishRepeatType',
// 										child: {
// 											componentType: 'RadioGroup',
// 											dispatchPath:
// 												'detourSchedulesForm.finishRepeatType',
// 											options: [
// 												{
// 													label: 'Никогда',
// 													value: 'never',
// 													style: radioStyle,
// 												},
// 												{
// 													label: 'Повторять до',
// 													value: 'repeatDate',
// 													style: radioStyle,
// 												},
// 												{
// 													label: 'После',
// 													value: 'repeatCount',
// 													style: radioStyle,
// 												},
// 											],
// 										},
// 									},
// 								],
// 							},
// 							{
// 								componentType: 'Col',
// 								style: {marginTop: '68px'},
// 								span: 12,
// 								children: [
// 									{
// 										componentType: 'Item',
// 										name: 'finishRepeatDate',
// 										label: 'Выберите дату',
// 										...footerInputLayout,
// 										child: {
// 											componentType: 'DatePicker',
// 											subscribe: {
// 												name: 'finishRepeatType',
// 												path:
// 													'rtd.detourSchedulesForm.finishRepeatType',
// 												onChange: ({
// 													value,
// 													setSubscribeProps,
// 												}) => {
// 													if (
// 														value !==
// 														'repeatDate'
// 													)
// 														setSubscribeProps({
// 															disabled: true,
// 														});
// 													else
// 														setSubscribeProps({
// 															disabled: false,
// 														});
// 												},
// 											},
// 										},
// 									},
// 									{
// 										componentType: 'Item',
// 										name: 'finishRepeatCount',
// 										label: 'Количество',
// 										...footerInputLayout,
// 										child: {
// 											componentType: 'InputNumber',
// 											subscribe: {
// 												name: 'finishRepeatType',
// 												path:
// 													'rtd.detourSchedulesForm.finishRepeatType',
// 												onChange: ({
// 													value,
// 													setSubscribeProps,
// 												}) => {
// 													if (
// 														value !==
// 														'repeatCount'
// 													)
// 														setSubscribeProps({
// 															disabled: true,
// 														});
// 													else
// 														setSubscribeProps({
// 															disabled: false,
// 														});
// 												},
// 											},
// 										},
// 									},
// 								],
// 							},
// 						],
// 					},
// 				],
// 			},
// 		],
// 	},
// ];

// // итоговый вариант

// const rows = [
// 	{
// 		id: 'never',
// 		name: 'Никогда',
// 	},
// 	{
// 		id: 'day',
// 		name: 'Ежедневно',
// 	},
// 	{
// 		id: 'month',
// 		name: 'Ежемесячно',
// 	},
// 	{
// 		id: 'year',
// 		name: 'Ежегодно',
// 	},
// ];
// const repeatTimeFields = [
// 	{
// 		componentType: 'Item',
// 		child: {
// 			componentType: 'Title',
// 			label: 'Повторение',
// 			level: 5,
// 		},
// 	},
// 	{
// 		componentType: 'Item',
// 		label: 'Повторение:',
// 		name: 'repeatBy',
// 		rules: [
// 			{
// 				message: 'Заполните вариант повторения',
// 				required: true,
// 			},
// 		],
// 		child: {
// 			componentType: 'SingleSelect',
// 			rowRender: 'name',
// 			widthControl: 0,
// 			widthPopup: 280,
// 			rows: rows,
// 			// dispatchPath: 'detourSchedulesForm.selectRepeat.repeat',
// 			// onChangeKeys: (value,option)=> {
// 			// 	if (option==='day') {
// 			// 		setHidden(state=>{return{day: false, ...state}})
// 			// 	}
// 			// }
// 		},
// 	},

// 	...everydayFields,
// 	// ...everyweekFields,
// 	// ...everyyearFields,
// ];

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
