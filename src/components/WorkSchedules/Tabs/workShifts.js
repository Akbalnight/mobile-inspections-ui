import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {deleteButton} from '../Modals/modalButtonDelete';
import {addShiftModal, editShiftModal} from '../Modals/modalShiftTab';

export const workShiftsFields = () => {
	return [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Space',
					className: 'p-8',

					children: [
						addShiftModal(),
						editShiftModal(),
						deleteButton('shift'),
					],
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'Table',
						dispatchPath: 'workSchedules.workShiftTab.table',
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
									console.log(value);
									removeRow();
								},
							},
						],
					},
				},
			],
		},
	];
};
