import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form, notificationError} from 'rt-design';
import {useHistory, useParams} from 'react-router';
import {apiGetFlatDataByConfigName} from '../../apis/catalog.api';
import {defectDetection} from '../Base/Block/DefectDetection';
/**
 * этот компонент необязателен он представлен для вариативности с модальными окнами
 * если в дальнейшем представится выборpage or modal. У нас есть оба рабочих решения
 * modal defectRdit.js
 * page  в этом файле
 */
export default function DefectsForm() {
	const pageParams = useParams();
	const history = useHistory();

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({
				name: null,
				duration: null,
			});
		} else {
			apiGetFlatDataByConfigName('defects')({
				data: {id: pageParams.id},
			})
				.then((response) => {
					// console.log('loadData => response ', response.data);
					callBack(response.data[0]);
				})
				.catch((error) =>
					notificationError(error, 'Ошибка загрузки данных формы')
				);
		}
	};

	const defectDetectionField = [
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 24,
					children: [
						{
							componentType: 'Item',
							name: 'id',
							label: '№ в журнале',
							className: 'mb-8',
							child: {
								componentType: 'Text',
							},
						},
					],
				},
			],
		},
		{...defectDetection},
	];

	const defectSapFields = [
		{
			componentType: 'Layout',
			style: {
				marginTop: -70, // костыль, это решение неверное
			},
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Данные из SAP',
						level: 5,
					},
				},

				{
					componentType: 'Col',
					children: [
						{
							componentType: 'Item',
							label: '№ из SAP',
							name: 'sapMessageId',
							className: 'mb-8',
							child: {
								componentType: 'Text', // 'Text' ведь номер в сап может и не будет меняться
							},
						},
						{
							componentType: 'Item',
							label: 'План действий',
							name: 'actionCorrect', // найминг тут неверный
							className: 'mb-8',
							child: {
								componentType: 'TextArea',
							},
						},
						{
							componentType: 'Item',
							label: 'Что происходит',
							name: 'whatsUp', // найминг тут неверный
							className: 'mb-8',
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							label: 'Статус из SAP',
							name: 'statusSAP', // найминг тут неверный
							className: 'mb-8',
							child: {
								componentType: 'Input',
							},
						},
						{
							componentType: 'Item',
							label: 'Дата начала устранения',
							name: 'dateEliminationPlan',
							className: 'mb-8',
							child: {
								componentType: 'DatePicker',
								showTime: true,
							},
						},
						{
							componentType: 'Item',
							label: 'Дата окончания устранения',
							name: 'dateEliminationFact',
							className: 'mb-8',
							child: {
								componentType: 'DatePicker',
								showTime: true,
							},
						},
					],
				},
			],
		},
	];

	const exampleTableFields = [
		{
			componentType: 'Row',
			className: 'mr-0',
			children: [
				{
					componentType: 'Col',
					children: [
						{
							componentType: 'Item',
							label: 'Приоритет',
							name: 'priorityField',
							child: {
								componentType: 'RadioGroup',
								optionType: 'button',
								size: 'small',
								options: [
									{
										label: '1',
										value: '1',
										style: {
											color: 'white',
											backgroundColor: '#FF4040',
										},
									},
									{
										label: '2',
										value: '2',
										style: {
											color: 'white',
											backgroundColor: '#F2C94C',
										},
									},
									{
										label: '3',
										value: '3',
										style: {
											color: 'white',
											backgroundColor: '#9DCE5B',
										},
									},
									{
										label: '4',
										value: '4',
										style: {
											color: 'white',
											backgroundColor: '#98B8E3',
										},
									},
								],
							},
						},
					],
				},
			],
		},
	];

	const formConfig = {
		noPadding: false,
		name: 'DefectEditForm',
		labelCol: {span: 8},
		wrapperCol: {span: 10},
		loadInitData: loadData,
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		// надо указать метот сохранения дефекта
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
					label: `
						${pageParams.id === 'new' ? 'Создание' : 'Редактирование'}
							  дефекта`,
				},
			},
		],
		body: [
			...defectDetectionField,
			...defectSapFields,
			...exampleTableFields,
		],
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
