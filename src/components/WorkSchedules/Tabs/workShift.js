import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {tableTabHeader} from './tableProps';

export const workShiftsFields = () => {
	return [
		{
			componentType: 'Layout',
			children: [
				...tableTabHeader('shift'),
				{
					componentType: 'Item',
					child: {
						componentType: 'Table',
						dispatchPath: 'workSchedules.workShiftTab.table',
						searchParamName: 'name',
						requestLoadRows: apiGetFlatDataByConfigName(
							'routes' //'workSchedules'
						),
						requestLoadConfig: apiGetConfigByName(
							'routes' //'workSchedules'
						),
						subscribe: [
							/** Событие добавления */
							{
								name: 'onAddModal',
								path:
									'rtd.workSchedules.workShiftTab.modal.events.onAddModal',
								onChange: ({value, addRow}) => {
									addRow(value.value);
								},
							},
							/** Событие редактирвания */
							{
								name: 'onEditModal',
								path:
									'rtd.workSchedules.workShiftTab.modal.events.onEditModal',
								onChange: ({value, editRow}) => {
									editRow(value.value);
								},
							},
							/** Событие удаления */
							{
								name: 'onDeleteModal',
								path:
									'rtd.workSchedules.workShiftTab.modal.events.onDeleteModal',
								onChange: ({value, removeRow}) => {
									removeRow();
								},
							},

							/** Событие поиска в таблице по знацению name */
							{
								name: 'onSearch',
								path:
									'rtd.workSchedules.workShiftTab.modal.events.onSearch',
								onChange: ({value, extraData, reloadTable}) => {
									reloadTable({
										searchValue: value.value,
									});
								},
							},
						],
					},
				},
			],
		},
	];
};
