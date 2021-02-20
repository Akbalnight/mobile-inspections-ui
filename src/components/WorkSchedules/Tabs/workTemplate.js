import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {tableTabHeader} from './tableProps';

export const workTemplateFields = () => {
	return [
		{
			componentType: 'Layout',
			children: [
				...tableTabHeader('template'),
				{
					componentType: 'Item',
					child: {
						componentType: 'Table',
						dispatchPath: 'workSchedules.workTemplateTab.table',
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
									'rtd.workSchedules.workTemplateTab.modal.events.onAddModal',
								onChange: ({value, addRow}) => {
									addRow(value.value);
								},
							},
							/** Событие редактирвания */
							{
								name: 'onEditModal',
								path:
									'rtd.workSchedules.workTemplateTab.modal.events.onEditModal',
								onChange: ({value, editRow}) => {
									editRow(value.value);
								},
							},
							/** Событие удаления */
							{
								name: 'onDeleteModal',
								path:
									'rtd.workSchedules.workTemplateTab.modal.events.onDeleteModal',
								onChange: ({value, removeRow}) => {
									removeRow();
								},
							},
							/** Событие поиска в таблице по знацению name */
							{
								name: 'onSearch',
								path:
									'rtd.workSchedules.workTemplateTab.modal.events.onSearch',
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
