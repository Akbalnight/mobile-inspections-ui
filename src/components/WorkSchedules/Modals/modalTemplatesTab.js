import {CopyOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {TimePicker} from 'antd';

const {RangePicker} = TimePicker;

export const addTemplateModal = () => operationOnServer('add', {});

export const editTemplateModal = () => operationOnServer('edit', {});

const operationOnServer = (type, code) => {
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};

	const exampleFields = [
		{
			name: 'Дневная',
			color: '#FFCC80',
		},
		{
			name: 'Вечерная',
			color: '#b7b7a4',
		},
		{
			name: 'Выходной',
			color: '#DFDFDF',
		},
	];
	const mainFields = [
		{
			componentType: 'ListItems',
			name: 'templatesForm',
			children: [
				{
					componentType: 'Row',
					className: 'mb-0',
					style: {
						paddingBottom: 0,
					},
					children: [
						{
							componentType: 'Col',
							span: 20,
							style: {
								display: 'flex',
								justifyContent: 'center',
							},
							children: [
								{
									componentType: 'Item',
									label: 'Наименование шаблона',
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
							],
						},
						{
							componentType: 'Col',
							span: 4,
							style: {
								display: 'flex',
								justifyContent: 'flex-end',
							},
							children: [
								{
									componentType: 'Item',
									child: {
										componentType: 'Button',
										label: 'Добавить шаблон',
										type: 'primary',
										icon: <PlusOutlined />,
										onClick: (e, {fields, operation}) => {
											operation.add();
											console.log(fields);
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
							componentType: 'Item',
							child: {
								className: 'mt-0 mb-8',
								componentType: 'Divider',
							},
						},
						{
							componentType: 'Col',
							span: 9,
							style: {
								display: 'flex',
								justifyContent: 'center',
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
							],
						},
						{
							componentType: 'Col',
							style: {
								display: 'flex',
								justifyContent: 'flex-start',
							},
							span: 3,
							children: [
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
							],
						},
						{
							componentType: 'Col',
							style: {
								display: 'flex',
								justifyContent: 'flex-start',
							},
							span: 3,
							children: [
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
							],
						},
						{
							componentType: 'Col',
							style: {
								display: 'flex',
								justifyContent: 'flex-start',
							},
							span: 3,
							children: [
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
							],
						},
						{
							componentType: 'Item',
							child: {
								componentType: 'Divider',
								className: 'mb-0 mt-8',
							},
						},
					],
				},
				{
					componentType: 'ListItem',
					children: [
						{
							componentType: 'Row',
							dispatchPath: 'workSchedules.templates.listItem',
							className: 'mt-8',
							children: [
								{
									componentType: 'Col',
									span: 2,
									children: [
										{
											componentType: 'Item',
											child: {
												name: `field.name`, // чтобы автоматичеки получать длинну массива сюда, но пока не получилость
												componentType: 'Text',
											},
										},
									],
								},
								{
									componentType: 'Col',
									span: 6,
									className: 'mr-8',
									children: [
										{
											componentType: 'Item',
											name: 'shiftTemplate',
											child: {
												componentType: 'SingleSelect',
												widthControl: 0,
												heightPopup: 250,
												widthPopup: 200,
												placeholder: 'Выберите смену',
												rows: exampleFields,
												// onChangeKeys:(value, option)=> option,
												rowRender: ({rowData}) => (
													<div
														style={{
															color:
																rowData.color,
														}}
													>
														{rowData.name}
													</div>
												),
											},
										},
									],
								},
								{
									componentType: 'Col',
									span: 3,
									className: 'mr-8',
									children: [
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
															placeholder={
																'Начало'
															}
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
									],
								},
								{
									componentType: 'Col',
									span: 3,
									className: 'mr-8',
									children: [
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
															placeholder={
																'Завершение'
															}
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
									],
								},
								{
									componentType: 'Col',
									span: 5,
									className: 'mr-8',
									children: [
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
															placeholder={[
																'с',
																'до',
															]}
														/>
													);
												},
											},
										},
									],
								},
								/**
								 * кнопка ниже без полноценной функиции, активные кнопки удалени(remove) и копирования(move). Только возможно копирование полей в одном
								 * ListItem не имеет смысла.
								 * у ListItems ({add, move, remove}), исходные функции
								 */
								// {
								// 	componentType: 'Col',
								// 	className: 'mr-8',
								// 	children: [
								// 		{
								// 			componentType: 'Item',
								// 			child: {
								// 				componentType: 'Button',
								// 				icon: <CloseOutlined />,
								// 				onClick: (
								// 					e,
								// 					{field, operation}
								// 				) => {
								// 					operation.remove(field.name);
								// 				},
								// 			},
								// 		},
								// 	],
								// },
								{
									componentType: 'Col',
									className: 'mr-8',
									children: [
										{
											componentType: 'Item',
											child: {
												componentType: 'Button',

												icon: <CopyOutlined />,
												onClick: (
													e,
													{field, operation}
												) => {
													operation.move(field.name);
												},
											},
										},
									],
								},
								{
									componentType: 'Col',
									className: 'mr-8',
									children: [
										{
											componentType: 'Item',
											child: {
												componentType: 'Button',

												icon: <DeleteOutlined />,
												onClick: (
													e,
													{field, operation}
												) => {
													operation.remove(
														field.name
													);
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
	return {
		type: `${type}OnServer`,
		title: `${type === 'add' ? 'Создание' : 'Редактирование'} шаблона`,
		width: 850,
		bodyStyle: {height: 700},
		form: {
			name: `${type}TemplateModalForm`,
			loadInitData: loadData,
			body: [...mainFields],
		},
	};
};
