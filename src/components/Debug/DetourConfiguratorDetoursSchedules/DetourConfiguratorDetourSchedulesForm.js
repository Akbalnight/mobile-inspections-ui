import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import {Form} from 'rt-design';

export default function DetourConfiguratorDetourSchedulesForm() {
	const pageParams = useParams();
	const history = useHistory();

	const headFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				level: 5,
				style: {
					marginLeft: 20, // костыль с отображение были проблемы
					marginTop: 20, // костыль с отображение были проблемы
				},
			},
		},
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Наименование обхода',
							name: 'nameSchedule',
							rules: [
								{
									message: 'Заполните наименование',
									required: true,
								},
							],
							child: {
								componentType: 'Input',
								maxLength: 100,
							},
						},
						{
							componentType: 'Item',
							label: 'Дата начала',
							name: 'dateStart',
							rules: [
								{
									message: 'Заполните дату начала обхода',
									required: true,
								},
							],
							child: {
								componentType: 'DatePicker',
							},
						},
						{
							componentType: 'Item',
							label: 'Дата окончания',
							name: 'dateEnd',
							rules: [
								{
									message: 'Заполните дату окончания обхода',
									required: true,
								},
							],
							child: {
								componentType: 'DatePicker',
							},
						},

						{
							componentType: 'Item',
							label: 'Наименование обхода',
							name: 'routeName',
							rules: [
								{
									message: 'Заполните маршрут',
									required: true,
								},
							],
							child: {
								componentType: 'SingleSelect',
							},
						},
					],
				},
			],
		},
	];

	const executorFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Исполнитель',
				level: 5,
				style: {
					marginLeft: 20, // костыль с отображение были проблемы
					marginTop: 20, // костыль с отображение были проблемы
				},
			},
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Исполнитель',
							name: 'executorName',
							rules: [
								{
									message: 'Заполните исполнителя',
									required: true,
								},
							],
							child: {
								componentType: 'SingleSelect',
							},
						},
					],
				},
			],
		},
	];

	const repeatTimeFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Повторение',
				level: 5,
				style: {
					marginLeft: 20, // костыль с отображение были проблемы
					marginTop: 20, // костыль с отображение были проблемы
				},
			},
		},
		{
			componentType: 'Row',
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Повторение:',
							name: 'repeatCase',
							rules: [
								{
									message: 'Заполните вариант повторения',
									required: true,
								},
							],
							child: {
								componentType: 'SingleSelect',
							},
						},
					],
				},
			],
		},
	];

	const formConfig = {
		noPadding: true,
		name: 'DetoursConfiguratorDetourSchedules',
		labelCol: {span: 16},
		wrapperCol: {span: 24},
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		onFinish: (values) => {
			console.log('Values', values);
		},
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					level: 4,
					label:
						pageParams.id === 'new'
							? 'Создание обхода'
							: 'Редактирование обхода',
				},
			},
		],
		body: [...headFields, ...executorFields, ...repeatTimeFields],
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
