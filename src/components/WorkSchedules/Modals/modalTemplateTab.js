import React from 'react';
import {
	CloseOutlined,
	CopyOutlined,
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import {TimePicker} from 'antd';

const {RangePicker} = TimePicker;

export const addTemplateModal = () => OperationOnServer('add', 'template');

export const editTemplateModal = () => OperationOnServer('edit', 'template');

/**
 *
 * @param {string} type - all modal operations TYPE
 * @param {object} info - extra code
 * @returns {object}
 *
 * поменять цвета селекта в ListItem
 */
const OperationOnServer = (type, info) => {
	const toCapitalize = info[0].toUpperCase() + info.substring(1);
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};

	const exampleFields = [
		{
			label: 'Дневная',
			color: '#FFCC80',
		},
		{
			label: 'Вечерная',
			color: '#b7b7a4',
		},
		{
			label: 'Выходной',
			color: '#DFDFDF',
		},
	];
	const mainFields = [
		{
			componentType: 'ListItems',
			name: 'templateForm',
			children: [
				{
					componentType: 'Space',
					style: {
						justifyContent: 'center',
						alignItems: 'center',
					},
					children: [
						{
							componentType: 'Item',
							label: 'Наименование шаблона',
							className: 'mb-0',
							name: 'name',
							rules: [
								{
									required: true,
									message: 'Введите поле шаблона',
								},
							],
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							child: {
								componentType: 'Button',
								label: 'Добавить шаблон',
								type: 'primary',
								icon: <PlusOutlined />,
								onClick: (e, {fields, operation}) => {
									operation.add();
								},
							},
						},
					],
				},
				{
					componentType: 'Item',
					child: {
						className: 'mt-16 mb-8',
						componentType: 'Divider',
					},
				},
				{
					componentType: 'Space',
					style: {
						justifyContent: 'space-around',
					},
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Text',
								label: 'Смена/выходной',
								style: {
									color: '#818181',
								},
							},
						},
						{
							componentType: 'Item',
							child: {
								componentType: 'Text',
								label: 'Начало:',
								style: {
									color: '#818181',
								},
							},
						},
						{
							componentType: 'Item',
							child: {
								componentType: 'Text',
								label: 'Завершение:',
								style: {
									color: '#818181',
								},
							},
						},
						{
							componentType: 'Item',
							child: {
								componentType: 'Text',
								label: 'Обед:',
								style: {
									color: '#818181',
								},
							},
						},

						{
							componentType: 'Item',
							hidden: true,
							child: {
								componentType: 'Text',
								label: 'Обед:',
								style: {
									color: '#818181',
								},
							},
						},
						{
							componentType: 'Item',
							hidden: true,
							child: {
								componentType: 'Text',
								label: 'Обед:',
								style: {
									color: '#818181',
								},
							},
						},
						{
							componentType: 'Item',
							hidden: true,
							child: {
								componentType: 'Text',
								label: 'Обед:',
								style: {
									color: '#818181',
								},
							},
						},
						{
							componentType: 'Item',
							hidden: true,
							child: {
								componentType: 'Text',
								label: 'Обед:',
								style: {
									color: '#818181',
								},
							},
						},
					],
				},

				{
					componentType: 'Item',
					child: {
						componentType: 'Divider',
						className: 'mb-0 mt-8',
					},
				},
				{
					componentType: 'ListItem',
					children: [
						{
							componentType: 'Space',
							className: 'p-8',
							style: {
								justifyContent: 'space-around',
								width: '100%',
							},
							children: [
								// {
								// 	componentType: 'Item',
								// 	name: `count`, // чтобы автоматичеки получать длинну массива сюда, но пока не получилость
								// 	child: {
								// 		componentType: 'Text',
								// 		dispatch: {
								// 			path:
								// 				'workSchedules.templates.listItem',
								// 		},
								// 	},
								// },
								{
									componentType: 'Item',
									name: 'shiftTemplate',
									child: {
										componentType: 'Select',
										autoClearSearchValue: true,
										showSearch: true,
										// searchParamName: '',
										showArrow: true,
										filterOption: false,
										widthControl: 130,
										dropdownMatchSelectWidth: 200,
										mode: 'single',
										allowClear: true,
										infinityMode: true,
										options: exampleFields,
									},
								},
								{
									componentType: 'Item',
									name: 'timeStart',
									child: {
										componentType: 'Custom',
										render: ({
											onChange,
											defaultValue,
											value,
										}) => {
											return (
												<TimePicker
													format={'HH:mm'}
													placeholder={'Начало'}
													onChange={(
														time,
														timeString
													) => {
														onChange(time);
													}}
												/>
											);
										},
									},
								},
								{
									componentType: 'Item',
									name: 'timeFinish',
									child: {
										componentType: 'Custom',
										render: ({
											onChange,
											defaultValue,
											value,
										}) => {
											return (
												<TimePicker
													format={'HH:mm'}
													placeholder={'Завершение'}
													onChange={(
														time,
														timeString
													) => {
														onChange(time);
													}}
												/>
											);
										},
									},
								},
								{
									componentType: 'Item',
									name: 'breakTime',
									child: {
										componentType: 'Custom',
										render: ({
											onChange,
											defaultValue,
											value,
										}) => {
											return (
												<RangePicker
													format={'HH:mm'}
													onChange={(
														dates,
														dateString
													) => {
														onChange(dates);
													}}
													placeholder={['с', 'до']}
												/>
											);
										},
									},
								},
								{
									componentType: 'Item',
									child: {
										componentType: 'Button',

										icon: <DeleteOutlined />,
										onClick: (e, {field, operation}) => {
											operation.remove(field.name);
										},
									},
								},
								{
									componentType: 'Item',
									child: {
										componentType: 'Button',
										icon: <CloseOutlined />,
										onClick: (e, {field, operation}) => {
											operation.remove(field.name);
										},
									},
								},
								{
									componentType: 'Item',
									child: {
										componentType: 'Button',
										icon: <CopyOutlined />,
										onClick: (e, {field, operation}) => {
											operation.move(field.name);
										},
									},
								},
							],
						},
					],
				},
			],
		},
	];

	return {
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type === 'add' ? false : true,
			},
			modalConfig: {
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} шаблона`,
				width: 850,
				bodyStyle: {height: 700},
				form: {
					name: `${type + toCapitalize}ModalForm`,
					loadInitData: loadData,
					body: [...mainFields],
				},
			},
			dispatch: {
				path: `workSchedules.work${toCapitalize}Tab.modal.events.on${
					type[0].toUpperCase() + type.substring(1)
				}Modal`,
				type: 'event',
			},
			subscribe: [
				{
					name: `work${toCapitalize}TabTableInfo`,
					path: `rtd.workSchedules.work${toCapitalize}Tab.table.selected`,
					onChange: ({value, setModalData, setButtonProps}) => {
						value && setModalData && setModalData(value);
						type !== 'add' &&
							setButtonProps &&
							setButtonProps({disabled: !value});
					},
				},
			],
		},
	};
};
