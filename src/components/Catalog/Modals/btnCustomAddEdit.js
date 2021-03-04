import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {
	apiGetFlatDataByConfigName,
	// apiSaveByConfigName,
} from '../../../apis/catalog.api';
import {disabledEndDate, disabledStartDate} from '../../Base/baseFunctions';

export const addCustomButton = (catalogName, unique) =>
	operationOnServer('add', catalogName, unique);
export const editCustomButton = (catalogName, unique) =>
	operationOnServer('edit', catalogName, unique);

const operationOnServer = (type, catalogName, unique) => {
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};

	const mainFields = [
		{
			componentType: 'Item',
			name: 'nameType', //Change
			label: 'Тип',
			className: 'mb-0',
			child: {
				componentType: 'Input',
			},
		},
		{
			componentType: 'Item',
			name: 'sapId',
			label: 'SAP код',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'InputNumber',
				min: 0,
			},
		},
		{
			componentType: 'Item',
			name: 'name',
			label: 'Наименование',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'Input',
			},
		},
		{
			componentType: 'Item',
			name: 'codeTechPlace',
			label: 'Код технического места',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'Text',
				subscribe: [
					{
						name: `${catalogName}TextArea`,
						path: `rtd.catalog.${catalogName}Table.modal.addModalSelect`,
						onChange: ({value, setSubscribeProps}) => {
							value &&
								setSubscribeProps &&
								setSubscribeProps({value: value});
						},
					},
				],
			},
		},

		{
			componentType: 'Item',
			name: 'nameTechPlace',
			label: 'Техническое место',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'Select',
				autoClearSearchValue: true,
				showSearch: true,
				searchParamName: 'name',
				showArrow: true,
				filterOption: false,
				mode: 'single',
				allowClear: true,
				infinityMode: true,
				requestLoadRows: apiGetFlatDataByConfigName('equipmentMarks'),
				optionConverter: (option) => ({
					label: option.name,
					value: option.name, //change
				}),
				dispatch: {
					path: `catalog.${catalogName}Table.modal.${type}ModalSelect`,
				},
			},
		},
		{
			componentType: 'Item',
			name: 'typeOfConstruction', //change
			label: 'Тип конструкции',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'Input',
			},
		},
		{
			componentType: 'Item',
			name: 'material', //change
			label: 'Материал',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'Input',
			},
		},
		{
			componentType: 'Item',
			name: 'sizeCount', //change
			label: 'Величина/размер',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'Input', //'TextArea' возмоно описание будет большим
			},
		},
		{
			componentType: 'Item',
			name: 'weight',
			label: 'Вес',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'InputNumber', //'Input'
				min: 0,
				// defaultValue: 1,
				step: 0.1,
				formatter: (value) => `${value} кг.`,
			},
		},
		{
			componentType: 'Item',
			name: 'productedId', //change
			label: 'Изготовитель',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'Input',
			},
		},
		{
			componentType: 'Item',
			name: 'deleted', //change
			label: 'Метка удаления',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'Checkbox',
			},
		},
		{
			componentType: 'Item',
			name: 'validUntil', //change
			label: 'Действителен до',
			className: 'mt-8',
			child: {
				componentType: 'DatePicker',
			},
		},
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Точки измерений',
				level: 5,
			},
		},
		{
			componentType: 'Item',
			name: 'producted', //change
			label: 'Изготовитель',
			child: {
				componentType: 'Input',
			},
		},
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Гарантии',
				level: 5,
			},
		},
		{
			componentType: 'Item',
			name: 'startDate', //change
			label: 'Начало гарантии',
			className: 'mb-0',
			child: {
				componentType: 'DatePicker',
				dispatch: {
					path: `catalog.${catalogName}Table.modal.${type}ModalStartDate`,
				},
				subscribe: [
					{
						name: `${catalogName}StartDate`,
						path: `rtd.catalog.${catalogName}Table.modal.${type}ModalEndDate`,
						onChange: ({value, setSubscribeProps}) => {
							setSubscribeProps({
								disabledDate: (startValue) =>
									disabledStartDate(startValue, value),
							});
						},
					},
				],
			},
		},
		{
			componentType: 'Item',
			name: 'endDate', //change
			label: 'Окончание гарантии',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'DatePicker',
				dispatch: {
					path: `catalog.${catalogName}Table.modal.${type}ModalEndDate`,
				},
				subscribe: [
					{
						name: 'endDate',
						path: `rtd.catalog.${catalogName}Table.modal.${type}ModalStartDate`,
						onChange: ({value, setSubscribeProps}) => {
							setSubscribeProps({
								disabledDate: (endValue) =>
									disabledEndDate(value, endValue),
							});
						},
					},
				],
			},
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
					type === 'add' ? 'Создать' : 'Редактировать'
				} ${unique}`,
				width: 550,
				bodyStyle: {height: 900},
				// requestSaveRow: apiSaveByConfigName(
				// 	`${catalogName}CatalogSave`
				// ), //не забыть поставить
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					onFinish: (values) => {
						console.log('values', values);
					},
					labelCol: {span: 10},
					wrapperCol: {span: 12},
					body: [...mainFields],
				},
			},
			dispatch: {
				path: `catalog.${catalogName}Table.modal.events.on${
					type[0].toUpperCase() + type.substring(1)
				}Modal`,
				type: 'event',
			},
			subscribe: [
				{
					name: `${catalogName}TableInfo`,
					path: `rtd.catalog.${catalogName}Table.table.selected`,
					onChange: ({value, setModalData, setButtonProps}) => {
						value && setModalData && setModalData(value);
						type !== 'add' &&
							setButtonProps &&
							setButtonProps({
								disabled: !value,
							});
					},
				},
			],
		},
	};
};
