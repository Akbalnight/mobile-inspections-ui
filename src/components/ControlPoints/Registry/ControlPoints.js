import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form, FormBody, Table} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {ControlPointsTableHeader, customColumnProps} from '../tableProps';

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
						className={'control-points-registry'}
						footerShow={true}
						searchParamName={'name'}
						customColumnProps={customColumnProps}
						requestLoadRows={apiGetHierarchicalDataByConfigName(
							'controlPoints'
						)}
						requestLoadConfig={apiGetConfigByName('controlPoints')}
						dispatch={{
							path: 'controlPoints.table',
						}}
						subscribe={[
							/**Action add group of object*/
							{
								name: 'addOnModal',
								path: `rtd.controlPoints.table.events.addOnGroupModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},

							/**Action edit group of object*/
							{
								name: 'editOnModal',
								path: `rtd.controlPoints.table.events.editOnGroupModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},

							/**Action delete object*/
							{
								name: 'deleteOnModal',
								path: `rtd.controlPoints.table.events.deleteOnModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},
							/**Action search*/
							{
								name: 'searchOnTable',
								path: `rtd.controlPoints.table.events.onSearch`,
								onChange: ({value, reloadTable}) => {
									reloadTable({
										searchValue: value,
									});
								},
							},
							/**Action reload*/
							{
								name: 'onReload',
								path: 'rtd.controlPoints.table.events.onReload',
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
