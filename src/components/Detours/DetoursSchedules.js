import {ControlOutlined} from '@ant-design/icons';
import {BasePage} from 'mobile-inspections-base-ui';
import React, {useState} from 'react';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {configFilterPanel, customColumnProps} from './tableProps';

/**
 * Данный компонет был создан для реализации концепции повторения Обходов с определенной периодичностью.
 * В дальнейшем возможна переработка в формате Microsoft Outlock, но этовопрос будет задан аналитику для уточнения
 * необходимости
 *
 *
 * посмотреть размещение, вероятнее всего необходимо будет исправить.
 */
export default function DetoursSchedules() {
	const [hidden, setHidden] = useState({
		day: true,
		month: true,
		year: true,
		radio: true,
	});

	const rows = [
		{
			id: 'day',
			name: 'Ежедневно',
		},
		{
			id: 'month',
			name: 'Ежемесячно',
		},
		{
			id: 'year',
			name: 'Ежегодно',
		},
	];

	const footerInputLayout = {
		labelCol: {span: 16},
		wrapperCol: {span: 8},
	};

	const radioStyle = {
		display: 'block',
		height: '56px',
		lineHeight: '56px',
	};
	const radioGroupFields = [
		{
			componentType: 'Row',
			hidden: hidden.radio,
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
												className: 'ml-16',
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

	const everyDayFields = [
		{
			componentType: 'Item',
			label: 'Интервал, дней',
			name: 'dayCount',
			hidden: hidden.day,
			child: {
				componentType: 'InputNumber',
			},
		},
	];

	const everyMonthFields = [
		{
			componentType: 'Col',
			hidden: hidden.month,
			children: [
				{
					componentType: 'Item',
					label: 'Интервал, месяцев',
					name: 'monthCount',
					child: {
						componentType: 'InputNumber',
						max: 12,
					},
				},
				{
					componentType: 'Item',
					label: 'День выполнения',
					name: 'dayCount',
					child: {
						componentType: 'InputNumber',
						max: 31,
					},
				},
			],
		},
	];
	const everyYearFields = [
		{
			componentType: 'Col',
			hidden: hidden.year,
			children: [
				{
					componentType: 'Item',
					label: 'Интервал, лет',
					name: 'yearCount',
					child: {
						componentType: 'InputNumber',
					},
				},
				{
					componentType: 'Item',
					label: 'День выполнения',
					name: 'dayCount',
					child: {
						componentType: 'DatePicker',
						format: 'MMMM DD',
					},
				},
			],
		},
	];

	const detoursSchedulesFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Повторение обхода',
				className: 'ml-16 mt-8',
				level: 5,
			},
		},
		{
			componentType: 'Item',
			label: 'Повторение:',
			name: 'repeatBy',
			child: {
				componentType: 'SingleSelect',
				rowRender: 'name',
				widthControl: 0,
				widthPopup: 250,
				rows: rows,
				onChangeKeys: (value, option) => {
					switch (option && option.join('')) {
						case 'day':
							setHidden((state) => ({
								day: false,
								month: true,
								year: true,
								radio: false,
							}));
							break;
						case 'month':
							setHidden((state) => ({
								day: true,
								month: false,
								year: true,
								radio: false,
							}));
							break;
						case 'year':
							setHidden((state) => ({
								day: true,
								month: true,
								year: false,
								radio: false,
							}));
							break;

						default:
							setHidden((state) => state);
							break;
					}
				},
			},
		},
		...everyDayFields,
		...everyMonthFields,
		...everyYearFields,
		...radioGroupFields,
	];
	/**
	 * не вынес данное модально окно, на него завязан весь файл, фактически без нее тут останется только таблица.
	 * Уже имеется опыт привращения в функцию, таких модальных окон. Надо будет обсудить когда вернемся к этому вопросу.
	 */
	const buttonRepeat = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Modal',
				buttonProps: {
					icon: <ControlOutlined />,
					className: 'ml-8',
					type: 'default',
				},
				modalConfig: {
					type: 'select',
					title: `Выбор периодичности обхода`,
					width: 760,
					bodyStyle: {
						height: 478,
					},
					onFinish: (values) =>
						setHidden({
							day: true,
							month: true,
							year: true,
							radio: true,
						}),
					form: {
						name: 'detourSelectRepeatForm',
						loadInitData: (callBack, row) => callBack(row),
						noPadding: true,
						labelCol: {span: 8},
						wrapperCol: {span: 8},
						body: [...detoursSchedulesFields],
					},
				},
			},
		},
	];
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
							// fixWidthColumn: true,
							customColumnProps: customColumnProps,
							commandPanelProps: {
								leftCustomSideElement: [...buttonRepeat],
							},
							filterPanelProps: {
								configFilter: [...configFilterPanel],
							},
							dispatchPath:
								'detourSchedules.mainTable.detoursSchedules',
							requestLoadRows: apiGetFlatDataByConfigName(
								'detours'
							),
							requestLoadConfig: apiGetConfigByName('detours'),
							footerProps: {
								rightCustomSideElement: [
									{
										componentType: 'Item',
										name: 'tableCount',
										child: {
											componentType: 'Text',
											subscribe: {
												name:
													'tableCountDetourSchedules',
												path:
													'rtd.detourSchedules.mainTable.detoursSchedules',
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													value &&
														value.selected &&
														setSubscribeProps({
															label: `Выделено: ${value.selected.length} Всего: ${value.rows.length}`,
														});
												},
											},
										},
									},
								],
							},
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
