import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';

import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {CatalogTableHeader} from './tableProps';
import {code} from '../Base/customColumnProps';
// import {StatusIcon} from "../Defects/tableProps";
import {CreditCardOutlined} from '@ant-design/icons';

const {Form, FormBody, Table} = classic;

// import {
//     addGroupOnServer,
//     editGroupOnServer,
// } from '../Base/Modals/GroupOnServer';
// import {modalGroupView} from './Modals/modalGroupView';
// import {modalObjectView} from './Modals/modalObjectView';
// import {headerControlPointsTable} from './fdgsd.js';
// import {logoutUrl} from "mobile-inspections-base-ui/lib/constants/auth.constants";

const customColumnProps = [
	{...code},
	{
		name: 'rfidCode',
		cellRenderer: ({cellData}) =>
			cellData ? <CreditCardOutlined style={{color: '#98B8E3'}} /> : null,
	},
];
/**
 * нейминг подписки некорректный, сейчас использована подписка на catalog
 * нужно пееделать в подписку по разделам
 * */
const ControlPointsBase = () => {
	return (
		<BasePage>
			<Form>
				<CatalogTableHeader
					catalogName={'controlPoints'}
					unique={'контрольных точек'}
				/>
				<FormBody noPadding={true}>
					<Table
						footerShow={true}
						customColumnProps={customColumnProps}
						requestLoadRows={apiGetHierarchicalDataByConfigName(
							'controlPoints'
						)}
						requestLoadConfig={apiGetConfigByName('controlPoints')}
						dispatchPath={'catalog.controlPointsTable.table'}
						subscribe={[
							/**Событие добавления КТ*/
							{
								name: 'addOnModal',
								path: `rtd.catalog.controlPointsTable.modal.events.addOnModal`,
								onChange: ({reloadTable}) => {
									// addRow(value.value);
									reloadTable({});
								},
							},

							/**Событие изменение КТ*/
							{
								name: 'editOnModal',
								path: `rtd.catalog.controlPointsTable.modal.events.editOnModal`,
								onChange: ({reloadTable}) => {
									// editRow(value.value);
									reloadTable({});
								},
							},

							/**Событие удаления КТ*/
							{
								name: 'deleteOnModal',
								path: `rtd.catalog.controlPointsTable.modal.events.deleteOnModal`,
								// onChange: ({value, removeRow}) => {
								//     // console.log(value.value);
								//     removeRow();
								// },
								onChange: ({reloadTable}) => {
									reloadTable({});
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
