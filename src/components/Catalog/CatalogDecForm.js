import React from 'react';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';

import {customColumnPropsEquipments} from './tableProps';
import {CatalogTableHeader} from './tableProps';

const {Form, FormBody, Table} = classic;
export const CatalogDecForm = (props) => {
	const {catalogName, hierarchical, unique} = props;

	return (
		<Form>
			<FormBody noPadding={true} name={'catalogSideFormDec'}>
				<CatalogTableHeader catalogName={catalogName} unique={unique} />
				<Table
					itemProps={{name: 'table'}}
					fixWidthColumn={true}
					dispatchPath={`catalog.${catalogName}Table.table`}
					requestLoadRows={
						hierarchical
							? apiGetHierarchicalDataByConfigName(catalogName)
							: apiGetFlatDataByConfigName(catalogName)
					}
					requestLoadConfig={apiGetConfigByName(catalogName)}
					customColumnProps={customColumnPropsEquipments}
					subscribe={[
						/** Событие создания оборудования*/
						{
							name: 'onAddModal',
							path: `rtd.catalog.${catalogName}Table.modal.events.addOnModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Событие редактирования оборудования*/
						{
							name: 'onEditModal',
							path: `rtd.catalog.${catalogName}Table.modal.events.editOnModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Событие создания Группы оборудования*/
						{
							name: 'onAddGroupModal',
							path: `rtd.catalog.${catalogName}Table.modal.events.addOnGroupModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Событие редактирования Группы оборудования*/
						{
							name: 'onEditGroupModal',
							path: `rtd.catalog.${catalogName}Table.modal.events.editOnGroupModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Событие удаления оборудования*/
						{
							name: 'onDeleteModal',
							path: `rtd.catalog.${catalogName}Table.modal.events.deleteOnModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
					]}
				/>
			</FormBody>
		</Form>
	);
};
