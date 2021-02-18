import {
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';

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
				componentType: 'SingleSelect',
				widthControl: 0,
				rowRender: 'name',
				expandColumnKey: 'id',
				requestLoadRows: apiGetHierarchicalDataByConfigName(
					'equipmentsAutoQuery'
				),
				requestLoadDefault: apiGetFlatDataByConfigName(
					'equipmentsAutoQuery'
				),
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
				componentType: 'SingleSelect',
				widthControl: 0,
				rowRender: 'positionName',
				requestLoadRows: apiGetFlatDataByConfigName('staff'),
				requestLoadDefault: apiGetFlatDataByConfigName('staff'),
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
