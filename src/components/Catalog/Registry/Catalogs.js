import React from 'react';
import {Form, FormBody, Table} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';

import {customColumnPropsEquipments} from '../tableProps';
import {TableHeader} from '../../Base/TableHeader';

export const Catalogs = (props) => {
	const {mainWay, catalogName, hierarchical, unique} = props;

	return (
		<Form>
			<FormBody noPadding={true} name={'catalogSideFormDec'}>
				<TableHeader
					mainWay={mainWay}
					catalogName={catalogName}
					unique={unique}
				/>
				<Table
					fixWidthColumn={true}
					searchParamName={
						catalogName !== 'staff' ? 'name' : 'username'
					}
					dispatch={{path: `${mainWay}.${catalogName}Table.table`}}
					requestLoadRows={
						hierarchical
							? apiGetHierarchicalDataByConfigName(catalogName)
							: apiGetFlatDataByConfigName(catalogName)
					}
					requestLoadConfig={apiGetConfigByName(catalogName)}
					customColumnProps={customColumnPropsEquipments}
					subscribe={[
						/** Action add object*/
						{
							name: 'onAddModal',
							path: `rtd.${mainWay}.${catalogName}Table.modal.events.addOnModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Action edit object*/
						{
							name: 'onEditModal',
							path: `rtd.${mainWay}.${catalogName}Table.modal.events.editOnModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Action add group of object*/
						{
							name: 'onAddGroupModal',
							path: `rtd.${mainWay}.${catalogName}Table.modal.events.addOnGroupModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Action edit group of object*/
						{
							name: 'onEditGroupModal',
							path: `rtd.${mainWay}.${catalogName}Table.modal.events.editOnGroupModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Action delete object*/
						/** We won't have a decision for this question*/
						{
							name: 'onDeleteModal',
							path: `rtd.${mainWay}.${catalogName}Table.modal.events.deleteOnModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Action search by name*/
						{
							name: 'onSearch',
							path: `rtd.${mainWay}.${catalogName}Table.table.events.onSearch`,
							onChange: ({value, reloadTable}) => {
								reloadTable({searchValue: value});
							},
						},
						/** Action reload table after search*/
						{
							name: 'onReload',
							path: `rtd.${mainWay}.${catalogName}Table.table.events.onReload`,
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
