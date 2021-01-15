import {
	CloseOutlined,
	CopyOutlined,
	DeleteOutlined,
	PlusOutlined,
} from '@ant-design/icons';

export const addTemplateModal = () => operationOnServer('add', {});

export const editTemplateModal = () => operationOnServer('edit', {});

const operationOnServer = (type, code) => {
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};
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
										onClick: (e, {operation}) => {
											console.log(
												'Add ',
												operation.add()
											);
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
							children: [
								{
									componentType: 'Col',
									children: [
										{
											componentType: 'Item',
											child: {
												componentType: 'Button',

												icon: <CloseOutlined />,
												onClick: (
													e,
													{field, operation}
												) => {
													operation.add(field.name);
												},
											},
										},
									],
								},
								{
									componentType: 'Col',
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
													operation.copy(field.name);
												},
											},
										},
									],
								},
								{
									componentType: 'Col',
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
		// {
		// 	componentType: 'Layout',
		// 	children: [
		// 	],
		// },
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
