import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';

import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {CatalogTableHeader} from './tableProps';
import {code} from '../Base/customColumnProps';

import {Checkbox} from 'antd';

const {Form, FormBody, Table} = classic;

const customColumnProps = [
	{...code},
	{
		name: 'rfidCode',
		cellRenderer: ({cellData}) =>
			cellData ? <Checkbox checked={true} disabled={true} /> : '---',
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
						dispatch={{path: 'catalog.controlPointsTable.table'}}
						subscribe={[
							/**Событие добавления КТ*/
							{
								name: 'addOnModal',
								path: `rtd.catalog.controlPointsTable.modal.events.addOnModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},

							/**Событие изменение КТ*/
							{
								name: 'editOnModal',
								path: `rtd.catalog.controlPointsTable.modal.events.editOnModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},

							/**Событие удаления КТ*/
							{
								name: 'deleteOnModal',
								path: `rtd.catalog.controlPointsTable.modal.events.deleteOnModal`,
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
