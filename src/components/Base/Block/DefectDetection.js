import React from 'react';
import {apiGetFlatDataByConfigName} from '../../../apis/application.api';
import {Input, Select, DatePicker, Checkbox, TextArea} from 'rt-design';

export const DefectDetection = () => {
	return (
		<>
			<DatePicker
				itemProps={{
					label: 'Дата обнаружения',
					name: 'dateDetectDefect',
					className: 'mb-8',
					// rules: [
					// 	{
					// 		required: true,
					// 		message: 'Заполните причину',
					// 	},
					// ],
				}}
				showTime={true}
				format={'DD.MM.YYYY HH:mm'}
			/>
			<Checkbox
				itemProps={{
					label: 'Отклонение от КПЭ',
					name: 'kpi',
					className: 'mb-8',
					valuePropName: 'checked',
					rules: [
						{
							type: 'boolean',
						},
					],
				}}
			/>
			<Select
				itemProps={{
					label: 'Оборудование',
					name: 'equipmentId',
					className: 'mb-8',
				}}
				showSearch={true}
				mode={'single'}
				allowClear={true}
				requestLoadRows={apiGetFlatDataByConfigName(
					'equipmentsAutoQuery'
				)}
				optionConverter={(option) => ({
					label: <span>{option.name}</span>,
					value: option.id,
					className: '',
					disabled: undefined,
				})}
			/>
			<Select
				itemProps={{
					label: 'Обнаружил',
					name: 'staffDetectId',
					className: 'mb-8',
				}}
				showSearch={true}
				mode={'single'}
				allowClear={true}
				requestLoadRows={apiGetFlatDataByConfigName('staff')} //apiGetHierarchicalDataByConfigName
				optionConverter={(option) => ({
					label: <span>{option.username}</span>,
					value: option.id,
					className: '',
					disabled: undefined,
				})}
			/>
			<TextArea
				itemProps={{
					label: 'Описание дефекта',
					name: 'description',
					className: 'mb-8',
				}}
			/>
			<Input
				itemProps={{
					label: 'Причина возникновения',
					name: 'descriptionCauses',
					className: 'mb-8',
				}}
			/>
		</>
	);
};
