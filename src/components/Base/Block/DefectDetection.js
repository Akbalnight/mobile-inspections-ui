import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';

export const defectDetection = {
	componentType: 'Col',
	children: [
		{
			componentType: 'Item',
			label: 'Дата обнаружения',
			name: 'dateDetectDefect',
			className: 'mb-8',
			rules: [
				{
					required: true,
					message: 'Заполните дату обнаружения',
				},
			],
			child: {
				componentType: 'DatePicker',
				showTime: true,
			},
		},
		{
			componentType: 'Item',
			label: 'Отклонение от КПЭ',
			name: 'kpi',
			className: 'mb-8',
			valuePropName: 'checked',
			rules: [
				{
					type: 'boolean',
				},
			],
			child: {
				componentType: 'Checkbox',
			},
		},
		{
			componentType: 'Item',
			label: 'Оборудование',
			name: 'equipmentId',
			className: 'mb-8',
			rules: [
				{
					required: true,
					message: 'Заполните оборудование',
				},
			],
			child: {
				componentType: 'Select',
				// widthControl: 300,
				rowRender: 'name',
				expandColumnKey: 'id',
				autoClearSearchValue: true,
				showSearch: true,
				searchParamName: 'name',
				showArrow: true,
				filterOption: false,
				dropdownMatchSelectWidth: 200,
				mode: 'single',
				allowClear: true,
				infinityMode: true,
				requestLoadRows: apiGetFlatDataByConfigName(
					'equipmentsAutoQuery'
				), //apiGetHierarchicalDataByConfigName
				optionConverter: (option) => ({
					label: <span>{option.name}</span>,
					value: option.id,
					className: '',
					disabled: undefined,
				}),
			},
		},
		{
			componentType: 'Item',
			label: 'Обнаружил',
			name: 'staffDetectId',
			className: 'mb-8',
			rules: [
				{
					required: true,
					message: 'Заполните сотрудника',
				},
			],
			child: {
				componentType: 'Select',
				autoClearSearchValue: true,
				showSearch: true,
				searchParamName: 'username',
				showArrow: true,
				filterOption: false,
				// widthControl: 0,
				dropdownMatchSelectWidth: 200,
				mode: 'single',
				allowClear: true,
				infinityMode: true,
				requestLoadRows: apiGetFlatDataByConfigName('staff'),
				optionConverter: (option) => ({
					label: <span>{option.username}</span>,
					value: option.id,
					className: '',
					disabled: undefined,
				}),
			},
		},
		{
			componentType: 'Item',
			label: 'Описание дефекта',
			name: 'description',
			className: 'mb-8',
			rules: [
				{
					required: true,
					message: 'Заполните описание',
				},
			],
			child: {
				componentType: 'TextArea',
			},
		},
		{
			componentType: 'Item',
			label: 'Причина возникновения',
			name: 'descriptionCauses',
			rules: [
				{
					required: true,
					message: 'Заполните описание',
				},
			],
			child: {
				componentType: 'Input',
			},
		},
	],
};
