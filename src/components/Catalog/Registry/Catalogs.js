import React from 'react';
import {Form, FormBody, Table} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/application.api';

import {customColumnPropsEquipments, TableHeader} from '../tableProps';
import {changeStorePath} from '../../Base/Functions/ChangeStorePath';

export const Catalogs = (props) => {
	const {mainWay, catalogName, hierarchical} = props;

	return (
		<Form>
			<FormBody noPadding={true} name={'catalogSideFormDec'}>
				<TableHeader mainWay={mainWay} catalogName={catalogName} />
				<Table
					fixWidthColumn={true}
					searchParamName={
						catalogName !== 'staff' ? 'name' : 'username'
					}
					dispatch={{
						path: `${changeStorePath(mainWay, catalogName)}`,
					}}
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
							path: `rtd.${changeStorePath(
								mainWay,
								catalogName
							)}.events.addOnModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Action edit object*/
						{
							name: 'onEditModal',
							path: `rtd.${changeStorePath(
								mainWay,
								catalogName
							)}.events.editOnModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Action add group of object*/
						{
							name: 'onAddGroupModal',
							path: `rtd.${changeStorePath(
								mainWay,
								catalogName
							)}.events.addOnGroupModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Action edit group of object*/
						{
							name: 'onEditGroupModal',
							path: `rtd.${changeStorePath(
								mainWay,
								catalogName
							)}.events.editOnGroupModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Action delete object*/
						/** We won't have a decision for this question*/
						{
							name: 'onDeleteModal',
							path: `rtd.${changeStorePath(
								mainWay,
								catalogName
							)}.events.deleteOnModal`,
							onChange: ({reloadTable}) => {
								reloadTable({});
							},
						},
						/** Action search by name*/
						{
							name: 'onSearch',
							path: `rtd.${changeStorePath(
								mainWay,
								catalogName
							)}.events.onSearch`,
							onChange: ({value, reloadTable}) => {
								reloadTable({searchValue: value});
							},
						},
						/** Action reload table after search*/
						{
							name: 'onReload',
							path: `rtd.${changeStorePath(
								mainWay,
								catalogName
							)}.events.onReload`,
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
