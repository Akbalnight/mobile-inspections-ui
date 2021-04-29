import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {ControlPointsTableHeader, customColumnProps} from '../tableProps';

const {Form, FormBody, Table} = classic;

/**
 * нейминг подписки некорректный, сейчас использована подписка на catalog
 * нужно пееделать в подписку по разделам
 * */
const ControlPoints = () => {
	return (
		<BasePage>
			<Form>
				<ControlPointsTableHeader
					mainWay={'controlPoints'}
					catalogName={'controlPoints'}
					unique={'контрольных точек'}
				/>
				<FormBody noPadding={true}>
					<Table
						footerShow={true}
						searchParamName={'name'}
						customColumnProps={customColumnProps}
						requestLoadRows={apiGetHierarchicalDataByConfigName(
							'controlPoints'
						)}
						requestLoadConfig={apiGetConfigByName('controlPoints')}
						dispatch={{
							path: 'controlPoints.controlPointsTable.table',
						}}
						subscribe={[
							/**Action add*/
							{
								name: 'addOnModal',
								path: `rtd.controlPoints.controlPointsTable.modal.events.addOnModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},

							/**Action edit*/
							{
								name: 'editOnModal',
								path: `rtd.controlPoints.controlPointsTable.modal.events.editOnModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},

							/**Action delete*/
							{
								name: 'deleteOnModal',
								path: `rtd.controlPoints.controlPointsTable.modal.events.deleteOnModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},
							/**Action search*/
							{
								name: 'searchOnTable',
								path: `rtd.controlPoints.controlPointsTable.table.events.onSearch`,
								onChange: ({value, reloadTable}) => {
									reloadTable({
										searchValue: value,
									});
								},
							},
							/**Action reload*/
							{
								name: 'onReload',
								path:
									'rtd.controlPoints.controlPointsTable.table.events.onReload',
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
export default ControlPoints;
