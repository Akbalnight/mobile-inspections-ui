import {apiGetConfigByName} from '../../../apis/catalog.api';
import React from 'react';
import {classic} from 'rt-design';
/**
 * информационная вкладка, переделать после обновления
 */
const {Layout, Table, Title, Text, Checkbox, DateText} = classic;

export const InfoTabFields = () => {
	return (
		<>
			<Layout className={'p-8'}>
				<Text
					itemProps={{
						label: '№ в Журнале Дефектов',
						name: 'code',
						className: 'mb-0',
					}}
				/>
				<Text
					itemProps={{
						label: 'Статус',
						name: 'statusProcessName',
						className: 'mb-0',
					}}
				/>
				<Title level={5}>Выявление дефекта</Title>
				<DateText
					itemProps={{
						label: 'Дата обнаружения',
						name: 'dateDetectDefect',
						className: 'mb-0',
					}}
					format={'DD.MM.YYYY HH:mm'}
				/>
				<Text
					itemProps={{
						label: 'Оборудование',
						name: 'equipmentName',
						className: 'mb-0',
					}}
				/>
				<Text
					itemProps={{
						label: 'Описание',
						name: 'description',
						className: 'mb-0',
					}}
				/>
				<Text
					itemProps={{
						label: 'Обнаружил',
						name: 'staffDetectName',
						className: 'mb-0',
					}}
				/>
				<Title level={5}>План устранения</Title>
				<DateText
					itemProps={{
						label: 'Плановый срок устранения',
						name: 'dateEliminationPlan',
						className: 'mb-0',
					}}
					format={'DD.MM.YYYY HH:mm'}
				/>
				<Text
					itemProps={{
						label: 'Диспетчер',
						name: 'staffEliminationName',
						className: 'mb-0',
					}}
				/>
				<Checkbox
					disabled={true}
					className={'mb-0'}
					itemProps={{
						label: 'Отклонение от КПЭ',
						name: 'kpi',
						valuePropName: 'checked',
						className: 'mb-0',
					}}
				/>
				<Text
					itemProps={{
						label: 'Причина возникновения',
						name: 'descriptionCauses',
						className: 'mb-0',
					}}
				/>
				<Text
					itemProps={{
						label: 'План действий',
						name: 'actionPlan',
						className: 'mb-0',
					}}
				/>
				<Title level={5}>Дополнительная информация</Title>

				<Table
					itemProps={{name: 'extraData'}}
					rowKey={'dateDetectDefect'}
					// style={{height: '150px'}}
					// infinityMode={true}
					requestLoadConfig={apiGetConfigByName(
						'defectExtraDataColumns'
					)}
				/>
			</Layout>
		</>
	);
};

export const infoTabFields = () => {
	return {
		componentType: 'Layout',
		className: 'ml-16',
		children: [
			{
				componentType: 'Col',
				children: [
					{
						componentType: 'Item',
						label: '№ в Журнале Дефектов',
						name: 'code',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Статус',
						name: 'statusProcessName',
						className: 'mb-0',
						child: {
							componentType: 'Text',
						},
					},
				],
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					label: 'Выявление дефекта',
					level: 5,
				},
			},

			{
				componentType: 'Col',
				children: [
					{
						componentType: 'Item',
						label: 'Дата обнаружения',
						name: 'dateDetectDefect',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Оборудование',
						name: 'equipmentName',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Описание',
						name: 'description',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Обнаружил',
						name: 'staffDetectName',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
				],
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					label: 'План устранения',
					level: 5,
				},
			},
			{
				componentType: 'Col',
				children: [
					{
						componentType: 'Item',
						label: 'Плановый срок устранения',
						name: 'dateEliminationPlan',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Диспетчер',
						name: 'staffEliminationId',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Отклонение от КПЭ',
						name: 'kpi',
						className: 'mb-0',
						valuePropName: 'checked',
						rules: [
							{
								type: 'boolean',
							},
						],
						child: {
							componentType: 'Checkbox',
							disabled: true,
						},
					},

					{
						componentType: 'Item',
						label: 'Причина возникновения',
						name: 'descriptionCauses',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'План действий',
						name: 'actionPlan',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
				],
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					label: 'Дополнительная информация',
					level: 5,
				},
			},
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						name: 'extraData',
						child: {
							componentType: 'Table',
							// componentType: 'Title',
							// label: 'Дополнительная информация',
							requestLoadConfig: apiGetConfigByName(
								'defectExtraDataColumns'
							),
							// filter:{controlPointId:'ddd'}
						},
					},
				],
			},
		],
	};
};
