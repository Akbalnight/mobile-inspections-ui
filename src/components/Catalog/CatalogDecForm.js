import React from 'react';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {AddObjectButton, EditObjectButton} from './Modals/btnDecCustomObject';
import {AddGroupButton, EditGroupButton} from './Modals/btnDecCustomGroup';
import {DeleteButton} from './Modals/btnDecDelete';
import {ModalObjectView} from './Modals/modalObjectView';
import {ModalGroupView} from './Modals/modalGroupView';

const {Form, FormBody, Table, Row} = classic;
export const CatalogDecForm = (props) => {
	const {catalogName, hierarchical, unique} = props;
	// const [tableRef, setTableRef] = useState({});
	// const _setTableRef = (ref) => setTableRef(ref);

	return (
		<Form>
			<FormBody noPadding={true} name={'catalogSideFormDec'}>
				<Row className={'p-8'}>
					<AddObjectButton
						catalogName={catalogName}
						unique={unique}
					/>
					<AddGroupButton catalogName={catalogName} unique={unique} />
					<EditObjectButton
						catalogName={catalogName}
						unique={unique}
					/>
					<EditGroupButton
						catalogName={catalogName}
						unique={unique}
					/>
					<DeleteButton catalogName={catalogName} unique={unique} />
					<ModalObjectView catalogName={catalogName} />
					<ModalGroupView catalogName={catalogName} />
				</Row>

				<Table
					// ref={_setTableRef}
					itemProps={{name: 'table'}}
					fixWidthColumn={true}
					dispatchPath={`catalog.${catalogName}Table.table`}
					requestLoadRows={
						hierarchical
							? apiGetHierarchicalDataByConfigName(catalogName)
							: apiGetFlatDataByConfigName(catalogName)
					}
					requestLoadConfig={apiGetConfigByName(catalogName)}
					subscribe={[
						/** Событие создания */
						{
							name: 'onAddModal',
							path: `rtd.catalog.${catalogName}Table.modal.events.addOnModal`,
							onChange: ({value, addRow}) => {
								console.log('add');
								addRow(value.value);
							},
						},
						/** Событие редактирования */
						{
							name: 'onEditModal',
							path: `rtd.catalog.${catalogName}Table.modal.events.editOnModal`,
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
					]}
				/>
			</FormBody>
		</Form>
	);
};
