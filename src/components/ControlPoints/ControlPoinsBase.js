import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
// import {
//     addGroupOnServer,
//     editGroupOnServer,
// } from '../Base/Modals/GroupOnServer';
// import {modalGroupView} from './Modals/modalGroupView';
// import {modalObjectView} from './Modals/modalObjectView';
// import {headerControlPointsTable} from './tableProps';
// import {logoutUrl} from "mobile-inspections-base-ui/lib/constants/auth.constants";
import {CatalogTableHeader} from '../Catalog/tableProps';

const {Form, FormBody, Divider, FormHeader, Table} = classic;

const ControlPointsBase = (props) => {
	const {catalogName, unique} = props;

	return (
		<BasePage>
			<Form>
				<FormHeader>
					<CatalogTableHeader
						catalogName={catalogName}
						unique={unique}
					/>
				</FormHeader>
				<FormBody noPadding={true}>
					<Divider />
					<Table
						footerShow={true}
						requestLoadRows={apiGetHierarchicalDataByConfigName(
							'controlPoints'
						)}
						requestLoadConfig={apiGetConfigByName('controlPoints')}
						dispatchPath={'controlPoints.mainTable.table'}
						subscribe={[
							/**Событие добавления КТ*/
							{
								name: 'addOnModal',
								path: `rtd.controlPoints.mainTable.modal.events.addOnModal`,
								onChange: ({value, addRow}) => {
									addRow(value.value);
								},
							},

							/**Событие изменение КТ*/
							{
								name: 'editOnModal',
								path: `rtd.controlPoints.mainTable.modal.events.editOnModal`,
								onChange: ({value, editRow}) => {
									editRow(value.value);
								},
							},

							/**Событие удаления КТ*/
							{
								name: 'deleteOnModal',
								path: `rtd.controlPoints.mainTable.modal.events.deleteOnModal`,
								onChange: ({value, removeRow}) => {
									console.log(value.value);
									removeRow();
								},
							},
						]}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};
export default ControlPointsBase;
