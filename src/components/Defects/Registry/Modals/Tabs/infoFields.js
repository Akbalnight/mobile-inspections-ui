import {apiGetConfigByName} from '../../../../../apis/catalog.api';
import React from 'react';
import {classic} from 'rt-design';
import {customColumnProps, GetCurrentMode} from '../../../tableProps';

/**
 * информационная вкладка, скорректировать вывод статуса панели
 */
const {Layout, Table, Title, Text, Checkbox, DateText} = classic;

export const InfoTabFields = () => {
	const currentMode = GetCurrentMode();
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
				{currentMode === 'defects' ? (
					<Text
						itemProps={{
							label: 'Статус',
							name: 'statusProcessName',
							className: 'mb-0',
						}}
					/>
				) : (
					<Text
						itemProps={{
							label: 'Статус',
							name: 'statusPanelName',
							className: 'mb-0',
						}}
					/>
				)}
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
					customColumnProps={customColumnProps}
					requestLoadConfig={apiGetConfigByName(
						'defectExtraDataColumns'
					)}
				/>
			</Layout>
		</>
	);
};
