import React from 'react';
import {components} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {headerTable} from './tableProps';

const {Form} = components;
/**
 *
 * @param {catalogName, SaveForm, SaveGroup} props
 * @param catalogName -string, configName
 * @param SaveForm- string, configName
 * @param SaveGroup- string, configName
 * @returns Component
 */
export const CatalogForm = (props) => {
	const {catalogName, hierarchical, unique} = props;

	const tableFields = [
		{
			componentType: 'Layout',
			children: [
				headerTable(catalogName, unique),
				{
					componentType: 'Item',
					child: {
						componentType: 'Table',
						fixWidthColumn: true,
						dispatchPath: `catalog.${catalogName}Table.table`,
						requestLoadRows: hierarchical
							? apiGetHierarchicalDataByConfigName(catalogName)
							: apiGetFlatDataByConfigName(catalogName),
						requestLoadConfig: apiGetConfigByName(catalogName),
						subscribe: [
							/** Событие создания */
							{
								name: 'onAddModal',
								path: `rtd.catalog.${catalogName}Table.modal.events.onAddModal`,
								onChange: ({value, addRow}) => {
									addRow(value.value);
								},
							},
							/** Событие редактирования */
							{
								name: 'onEditModal',
								path: `rtd.catalog.${catalogName}Table.modal.events.onEditModal`,
								onChange: ({value, editRow}) => {
									editRow(value.value);
								},
							},
							/** Событие удаления */
							{
								name: 'onDeleteModal',
								path: `rtd.catalog.${catalogName}Table.modal.events.onDeleteModal`,
								onChange: ({value, removeRow}) => {
									console.log(value.value);
									removeRow();
								},
							},
						],
					},
				},
			],
		},
	];
	const formConfig = {
		noPadding: true,
		name: 'catalogSideForm',
		body: [...tableFields],
	};
	return (
		<>
			<Form {...formConfig} />
		</>
	);
};
