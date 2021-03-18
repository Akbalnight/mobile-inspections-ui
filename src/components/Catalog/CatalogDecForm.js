import React from 'react';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
// import {AddObjectButton, EditObjectButton} from './Modals/btnDecCustomObject';
import {AddGroupButton, EditGroupButton} from './Modals/btnDecCustomGroup';
import {DeleteButton} from './Modals/btnDecDelete';
import {ModalObjectView} from './Modals/modalObjectView';
import {ModalGroupView} from './Modals/modalGroupView';
import {customColumnPropsEquipments} from './tableProps';
import {
	AddCustomObjectButton,
	EditCustomObjectButton,
} from './Modals/btnCustomObject';
// import {CatalogTableHeader} from "./tableProps";

const {Form, FormBody, Table, Row} = classic;
export const CatalogDecForm = (props) => {
	const {catalogName, hierarchical, unique} = props;

	//({data,params})=>apiGetHierarchicalDataByConfigName(catalogName)({data:{...data,deleted:true},params})
	/**
	 * CatalogTableHeader - done, uncomment and catalogConfigs.js change
	 */
	return (
		<Form>
			<FormBody noPadding={true} name={'catalogSideFormDec'}>
				{/*<CatalogTableHeader catalogName={catalogName} unique={unique}/>*/}

				<Row className={'p-8'}>
					<AddCustomObjectButton
						catalogName={catalogName}
						unique={unique}
					/>
					{/*<AddObjectButton*/}
					{/*	catalogName={catalogName}*/}
					{/*	unique={unique}*/}
					{/*/>*/}
					<AddGroupButton catalogName={catalogName} unique={unique} />
					<EditCustomObjectButton
						catalogName={catalogName}
						unique={unique}
					/>
					{/*<EditObjectButton*/}
					{/*	catalogName={catalogName}*/}
					{/*	unique={unique}*/}
					{/*/>*/}
					<EditGroupButton
						catalogName={catalogName}
						unique={unique}
					/>
					<DeleteButton catalogName={catalogName} unique={unique} />
					<ModalObjectView catalogName={catalogName} />
					<ModalGroupView catalogName={catalogName} />
				</Row>

				<Table
					itemProps={{name: 'table'}}
					// defaultFilter={{deleted: true}}
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
