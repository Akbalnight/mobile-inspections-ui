import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {btnFilterSettings} from '../../Base/Block/btnFilterSettings';
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
					style: {
						justifyContent: 'space-between',
					},
					children: [
						{
							componentType: 'Space',
							children: [
								addShiftModal(),
								editShiftModal(),
								deleteButton('shift'),
							],
						},
						{
							componentType: 'Space',
							children: [
								{
									componentType: 'Item',
									name: 'searchInput',
									child: {
										componentType: 'Search',
										placeholder: 'Введите наименование',
										dispatch: {
											path:
												'workSchedules.workShiftTab.modal.events.onSearch',
											type: 'event',
										},
									},
								},
								...btnFilterSettings,
							],
						},
					],
				},
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
