import React from 'react';
import {Layout, Space, Title, FormItems} from 'rt-design';
import {paths} from '../../../../constants/paths';
import {LeftOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router';

import {resolveToObject} from './parseFunc';

export const TemplatesForm = ({analyticId}: {analyticId: string}) => {
	// плохо
	// console.log(analyticId)
	const history = useHistory();

	const onBackPage = () => history.push(`${paths.ANALYTICS_MAIN.path}`);

	/**
     * export const getObjectExcludedProps = (object, exclude) => {
    let returnObject = {};
    Object.keys(object).forEach((key) =>
        !exclude.includes(key) ? (returnObject[key] = object[key]) : undefined // было null
    );
    return returnObject;
};
     *
     * */

	const settingsConfig = [
		{
			componentType: 'Layout',
			style: {
				width: '100%',
			},
			className: 'mt-16',
			children: [
				{
					componentType: 'Title',
					label: 'Параметры отчета',
					level: 4,
					className: 'mt-16',
				},
				{
					componentType: 'Space',
					direction: 'vertical',
					className: 'p-8',
					children: [
						{
							componentType: 'Text',
							label: 'Период обнаружения',
						},
						{
							componentType: 'Space',
							children: [
								{
									componentType: 'Col',
									children: [
										{
											componentType: 'DatePicker',
											itemProps: {
												name: 'startDate',
												label: 'c',
												className: 'mb-0',
											},
											format: 'DD.MM.YYYY HH:mm',
											dispatch: {
												path: 'analytics.filter.data.startDate',
											},
											subscribe: {
												reload: true,
												dateFinish: true,
											},
										},
									],
								},
								{
									componentType: 'Col',
									children: [
										{
											componentType: 'DatePicker',
											itemProps: {
												name: 'finishDate',
												label: 'по',
												className: 'mb-0',
											},
											format: 'DD.MM.YYYY HH:mm',
											dispatch: {
												path: 'analytics.filter.data.finishDate',
											},
											subscribe: {
												dateStart: true,
												reload: true,
											},
										},
									],
								},
							],
						},
					],
				},
				{
					componentType: 'Space',
					direction: 'vertical',
					className: 'p-8',
					children: [
						{
							componentType: 'Text',
							label: 'Приоритет Панели проблем',
						},
						{
							componentType: 'Select',
							itemProps: {
								name: 'panelProblemPriority',
							},
							mode: 'single',
							placeholder: 'Выберите маршрут',
							allowClear: true,
							showSearch: true,
							filterOption: false,
							searchParamName: 'name',
							loadRows: 'panelProblemsPriorities',
							dispatch: {
								path: 'analytics.filter.data.panelProblemPriority',
							},
							subscribe: {
								reload: true,
							},
						},
					],
				},
				{
					componentType: 'Space',
					direction: 'vertical',
					className: 'p-8',
					children: [
						{
							componentType: 'Text',
							label: 'Типовой дефект',
						},
						{
							componentType: 'Select',
							itemProps: {
								name: 'defectTypicalId',
							},
							mode: 'single',
							placeholder: 'Выберите типовой дефект',
							allowClear: true,
							showSearch: true,
							filterOption: false,
							searchParamName: 'name',
							loadRows: 'defectTypical',
							dispatch: {
								path: 'analytics.filter.data.defectTypical',
							},
							subscribe: {
								reload: true,
							},
						},
					],
				},
				{
					componentType: 'Space',
					direction: 'vertical',
					className: 'p-8',
					children: [
						{
							componentType: 'Text',
							label: 'Обнаружил',
						},
						{
							componentType: 'Select',
							itemProps: {
								name: 'staffDetectId',
							},
							mode: 'single',
							placeholder: 'Выберите сотрудника',
							allowClear: true,
							showSearch: true,
							filterOption: false,
							searchParamName: 'username',
							loadRows: 'staff',
							dispatch: {
								path: 'analytics.filter.data.staffDetectId',
							},
							subscribe: {
								reload: true,
							},
						},
					],
				},
				{
					componentType: 'Space',
					direction: 'vertical',
					className: 'p-8',
					children: [
						{
							componentType: 'Text',
							label: 'Ответственный',
						},
						{
							componentType: 'Select',
							itemProps: {
								name: 'staffEliminationId',
							},
							mode: 'single',
							placeholder: 'Выберите сотрудника',
							allowClear: true,
							showSearch: true,
							filterOption: false,
							searchParamName: 'username',
							loadRows: 'staff',
							dispatch: {
								path: 'analytics.filter.data.staffEliminationId',
							},
							subscribe: {
								reload: true,
							},
						},
					],
				},
				{
					componentType: 'Space',
					direction: 'vertical',
					className: 'p-8',
					children: [
						{
							componentType: 'Text',
							label: 'Статус обработки',
						},
						{
							componentType: 'Select',
							itemProps: {
								name: 'selectId',
							},
							mode: 'single',
							placeholder: 'Выберите статус',
							allowClear: true,
							showSearch: true,
							filterOption: false,
							searchParamName: 'name',
							loadRows: 'defectStatusesProcess',
							dispatch: {
								path: 'analytics.filter.data.defectStatusesProcess',
							},
							subscribe: {
								reload: true,
							},
						},
					],
				},
				{
					componentType: 'Space',
					direction: 'vertical',
					className: 'p-8',
					children: [
						{
							componentType: 'Text',
							label: 'Оборудование',
						},
						{
							componentType: 'TreeSelect',
							style: {width: '100%'},
							itemProps: {
								name: 'equipmentId',
							},
							mode: 'single',
							placeholder: 'Выберите оборудование',
							treeCheckStrictly: false,
							treeDefaultExpandAll: true,
							searchParamName: 'name',
							loadRows: 'equipments',
							dispatch: {
								path: 'analytics.filter.data.equipmentsId',
							},
							subscribe: {
								reload: true,
							},
						},
					],
				},
				{
					componentType: 'Space',
					direction: 'vertical',
					className: 'p-8',
					children: [
						{
							componentType: 'Text',
							label: 'Маршрут',
						},
						{
							componentType: 'Select',
							itemProps: {
								name: 'routeId',
							},
							mode: 'single',
							placeholder: 'Выберите оборудование',
							allowClear: true,
							showSearch: true,
							filterOption: false,
							searchParamName: 'name',
							loadRows: 'routes',
							dispatch: {
								path: 'analytics.filter.data.routeId',
							},
							subscribe: {
								reload: true,
							},
						},
					],
				},
				{
					componentType: 'Space',
					direction: 'vertical',
					className: 'p-8',
					children: [
						{
							componentType: 'Text',
							label: 'Обходчик',
						},
						{
							componentType: 'Select',
							itemProps: {
								name: 'staffId',
							},
							mode: 'single',
							placeholder: 'Выберите сотрудника',
							allowClear: true,
							showSearch: true,
							filterOption: false,
							searchParamName: 'username',
							loadRows: 'staff',
							dispatch: {
								path: 'analytics.filter.data.staffId',
							},
							subscribe: {
								reload: true,
							},
						},
					],
				},
			],
		},
	];

	const items = resolveToObject(settingsConfig);

	return (
		<Layout>
			<div style={{display: 'flex', margin: '12px 0'}}>
				<Space
					style={{position: 'absolute', cursor: 'pointer'}}
					className={'ant-typography ant-typography-secondary ml-16'}
					onClick={onBackPage}
				>
					<LeftOutlined style={{fontSize: '16px'}} />
					<Title
						level={5}
						type='secondary'
						style={{marginBottom: '2px'}}
					>
						Назад
					</Title>
				</Space>
			</div>
			<FormItems items={items} />
		</Layout>
	);
};
