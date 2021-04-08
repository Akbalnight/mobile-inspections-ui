import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {components, cLassic, classic} from 'rt-design';
import {useHistory, useParams} from 'react-router';

import {defectDetection} from '../Base/Block/DefectDetection';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../apis/catalog.api';
import {disabledEndDate, disabledStartDate} from '../Base/Functions/DateLimits';

const {Form, FormBody, Table, Button, Title} = classic;

/**
 * этот компонент необязателен он представлен для вариативности. В данном контексте дефекты будут создаваться в мобильном приложении,
 * но данный путь нужно было пройти в web варианте
 *
 *
 * Можно в короткие сроки переделать на редактирование
 */

const {Form} = components;
export default function DefectsFormJsx() {
	const history = useHistory();
	const pageParams = useParams();

	const loadData = (callBack, row) => {
		if (pageParams.id === 'new') {
			console.log('new');
		}
		callBack(null);
	};

	const defectDetectionField = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Информация о дефекте',
				level: 5,
			},
		},
		{...defectDetection},
	];

	const defectEliminationInfo = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Устранение дефекта',
				level: 5,
			},
		},

		{
			componentType: 'Col',
			children: [
				{
					componentType: 'Item',
					label: 'Ответственный',
					name: 'staffEliminationId',
					className: 'mb-8',
					rules: [
						{
							required: true,
							message: 'Заполните оборудование',
						},
					],
					child: {
						componentType: 'Select',
						autoClearSearchValue: true,
						showSearch: true,
						searchParamName: 'userName',
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
					label: 'Статус обработки',
					name: 'statusProcessId',
					className: 'mb-8',
					rules: [
						{
							required: true,
							message: 'Заполните оборудование',
						},
					],
					child: {
						componentType: 'Select',
						autoClearSearchValue: true,
						showSearch: true,
						searchParamName: 'name',
						showArrow: true,
						filterOption: false,
						// widthControl: 0,
						dropdownMatchSelectWidth: 200,
						mode: 'single',
						allowClear: true,
						infinityMode: true,
						requestLoadRows: apiGetFlatDataByConfigName(
							'defectStatusesProcess'
						),
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
					label: 'Приоритет панели проблем',
					name: 'priorityPanelId',
					className: 'mb-8',
					rules: [
						{
							required: true,
							message: 'Заполните оборудование',
						},
					],
					child: {
						componentType: 'Select',
						autoClearSearchValue: true,
						showSearch: true,
						searchParamName: 'name',
						showArrow: true,
						filterOption: false,
						// widthControl: 0,
						dropdownMatchSelectWidth: 200,
						mode: 'single',
						allowClear: true,
						infinityMode: true,
						requestLoadRows: apiGetFlatDataByConfigName(
							'panelProblemsPriorities'
						),
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
					name: 'viewOnPanel',
					label: 'Показать в панели проблем',
					className: 'mb-0',
					valuePropName: 'checked',
					child: {
						componentType: 'Checkbox',
					},
				},

				{
					componentType: 'Item',
					label: 'План действий',
					name: 'actionPlan',
					className: 'mb-8',
					rules: [
						{
							required: true,
							message: 'Заполните оборудование',
						},
					],
					child: {
						componentType: 'TextArea',
					},
				},
				{
					componentType: 'Item',
					label: 'Дата начала устранения',
					name: 'dateEliminationPlan',
					className: 'mb-8',
					rules: [
						{
							required: true,
							message: 'Заполните оборудование',
						},
					],
					child: {
						componentType: 'DatePicker',
						showTime: true,
						dispatch: {
							path: 'defects.defectsForm.eliminateStartDate',
						},
						subscribe: [
							{
								name: 'endDate',
								path:
									'rtd.defects.defectsForm.eliminateEndDate',
								onChange: ({value, setSubscribeProps}) => {
									setSubscribeProps({
										disabledDate: (startValue) =>
											disabledStartDate(
												startValue,
												value
											),
									});
								},
							},
						],
					},
				},
				{
					componentType: 'Item',
					label: 'Дата окончания устранения',
					name: 'dateEliminationFact',
					className: 'mb-8',
					rules: [
						{
							required: true,
							message: 'Заполните оборудование',
						},
					],
					child: {
						componentType: 'DatePicker',
						showTime: true,
						dispatch: {
							path: 'defects.defectsForm.eliminateEndDate',
						},
						subscribe: [
							{
								name: 'endDate',
								path:
									'rtd.defects.defectsForm.eliminateStartDate',
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
				{
					componentType: 'Item',
					label: 'Стадия устранения',
					name: 'actionDescription',
					className: 'mb-8',
					rules: [
						{
							required: true,
							message: 'Заполните оборудование',
						},
					],
					child: {
						componentType: 'Input',
					},
				},
				{
					componentType: 'Item',
					label: 'Примечание',
					name: 'note',
					className: 'mb-8',
					rules: [
						{
							required: true,
							message: 'Заполните оборудование',
						},
					],
					child: {
						componentType: 'TextArea',
					},
				},
			],
		},
	];

	const formConfig = {
		noPadding: false,
		name: 'DefectEditForm',
		labelCol: {span: 8},
		wrapperCol: {span: 6},
		loadInitData: loadData,
		methodSaveForm: 'POST',
		requestSaveForm: apiSaveByConfigName('saveNewDefect'),
		onFinish: (values) => {
			console.log('Values', values);
		},
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					className: 'mb-0',
					level: 3,
					label: 'Создание дефекта',
				},
			},
		],
		body: [...defectDetectionField, ...defectEliminationInfo],
		footer: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Закрыть',
					className: 'mr-8',
					onClick: () => {
						history.goBack();
					},
				},
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Сохранить',
					type: 'primary',
					htmlType: 'submit',
				},
			},
		],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
