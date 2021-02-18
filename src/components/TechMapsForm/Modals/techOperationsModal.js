import {codeInput} from '../../Base/Inputs/CodeInput';

const loadData = (callBack, row, type) => {
	const newData = {
		...row,
		hours: row.duration && parseInt(row.duration / 60),
		minutes: row.duration && row.duration % 60,
	};
	callBack(type === 'edit' ? newData : null);
};

const TechOperationOnLocal = (type) => {
	return {
		type: `${type}OnLocal`,
		title: `${
			type === 'edit' ? 'Изменение' : 'Создание'
		} техологической операции`,
		form: {
			name: 'TechOperationOnLocal',
			labelAlign: 'left',
			labelCol: {span: 10},
			wrapperCol: {span: 14},
			loadInitData: (callBack, row) => loadData(callBack, row, type),
			body: [
				{
					componentType: 'Row',
					gutter: [16, 16],
					children: [
						{
							componentType: 'Col',
							span: 24,
							children: [
								type === 'edit' ? codeInput : {},
								{
									componentType: 'Item',
									label: 'Наименование',
									name: 'name',
									rules: [
										{
											message: 'Заполните наименование',
											required: true,
										},
									],
									child: {
										componentType: 'TextArea',
										autoSize: true,
										size: 'small',
									},
								},
								{
									componentType: 'Item',
									label: 'Ввод данных',
									name: 'needInputData',
									valuePropName: 'checked',
									child: {
										componentType: 'Checkbox',
										dispatchPath:
											'techOperations.modal.needInputData',
									},
								},
								{
									componentType: 'Item',
									label: 'Подпись ввода данных',
									name: 'labelInputData',
									child: {
										componentType: 'Input',
										subscribe: {
											name: 'needInputData',
											path:
												'rtd.techOperations.modal.needInputData',
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												// console.log('needInputData => value', value);
												setSubscribeProps({
													disabled: !value,
												});
											},
										},
									},
								},
								{
									componentType: 'Item',
									label: 'Остановка оборудования',
									name: 'equipmentStop',
									valuePropName: 'checked',
									child: {componentType: 'Checkbox'},
								},
								{
									componentType: 'Item',
									label: 'Повышенная опасность',
									name: 'increasedDanger',
									valuePropName: 'checked',
									child: {componentType: 'Checkbox'},
								},
								{
									componentType: 'Row',
									gutter: [0, 0],
									children: [
										{
											componentType: 'Col',
											span: 10,
											children: [
												{
													componentType: 'Item',
													child: {
														componentType: 'Text',
														label:
															'Продолжительность:',
														style: {
															color:
																'rgba(0, 0, 0, 0.85)',
															fontSize: '12px',
														},
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
													noStyle: true,
													name: 'hours',
													child: {
														componentType:
															'InputNumber',
														placeholder: 'Часы',
														size: 'small',
														min: 0,
														max: 12,
													},
												},
											],
										},
										{
											componentType: 'Col',
											span: 3,
											children: [
												{
													componentType: 'Item',
													style: {
														textAlign: 'center',
													},
													child: {
														componentType: 'Text',
														label: 'часы',
														level: 6,
														style: {
															lineHeight: '24px',
															marginLeft: '8px',
														},
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
													noStyle: true,
													name: 'minutes',
													child: {
														componentType:
															'InputNumber',
														placeholder: 'Минуты',
														size: 'small',
														min: 0,
														max: 59,
													},
												},
											],
										},
										{
											componentType: 'Col',
											span: 3,
											children: [
												{
													componentType: 'Item',
													style: {
														textAlign: 'center',
													},
													child: {
														componentType: 'Text',
														label: 'минуты',
														level: 6,
														style: {
															lineHeight: '24px',
															marginLeft: '8px',
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
			],
		},
	};
};

export const addTechOperation = TechOperationOnLocal('add');

export const editTechOperation = TechOperationOnLocal('edit');
