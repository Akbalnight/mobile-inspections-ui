import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';

export const defectDetection = {
	componentType: 'Layout',
	className: 'mb-0',
	children: [
		{
			componentType: 'Col',
			span: 16,
			children: [
				{
					componentType: 'Item',
					label: 'Дата обнаружения',
					name: 'dateDiscovery',
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
					name: 'deviationKPE',
					className: 'mb-8',
					child: {
						componentType: 'SingleSelect',
						widthControl: 0,
						rowRender: 'name',
						requestLoadRows: apiGetFlatDataByConfigName(
							'techMapsStatuses' //временно
						),
						requestLoadDefault: apiGetFlatDataByConfigName(
							'techMapsStatuses' //временно
						),
					},
				},
				{
					componentType: 'Item',
					label: 'Оборудование',
					name: 'equipment',
					className: 'mb-8',
					child: {
						componentType: 'SingleSelect',
						widthControl: 0,
						rowRender: 'name',
						requestLoadRows: apiGetFlatDataByConfigName(
							'equipments' //временно
						),
						requestLoadDefault: apiGetFlatDataByConfigName(
							'equipments' //временно
						),
					},
				},
				{
					componentType: 'Item',
					label: 'Обнаружил',
					name: 'staffDiscovered',
					className: 'mb-8',
					rules: [
						{
							required: true,
							message: 'Заполните сотрудника',
							pattern: /[a-zA-Z\s]+|[а-яА-Я\s]+/g,
						},
					],
					child: {
						componentType: 'Input',
					},
				},
				{
					componentType: 'Item',
					label: 'Описание',
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
					name: 'occurrence',

					child: {
						componentType: 'Input',
					},
				},
			],
		},
	],
};
