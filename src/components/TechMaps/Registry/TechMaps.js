import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form, FormBody, Table} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {mainCustomColumnProps, TechMapsTableHeader} from '../tableProps';

/**
 * Main registry by Tech Maps section. Two action by add/edit object did in TechMap.js(like simple create form), two action by
 * add/edit group of object in modal form
 * */
const TechMaps = () => {
	return (
		<BasePage>
			<Form>
				<TechMapsTableHeader
					catalogName={'techMaps'}
					mainWay={'techMaps'}
					unique={'технологической карты'}
				/>
				<FormBody noPadding={true}>
					<Table
						customColumnProps={mainCustomColumnProps}
						searchParamName={'name'}
						dispatch={{path: 'techMaps.techMapsTable.table'}}
						requestLoadRows={apiGetHierarchicalDataByConfigName(
							'techMaps'
						)}
						requestLoadConfig={apiGetConfigByName('techMaps')}
						subscribe={[
							/** Action add group of object*/
							{
								name: 'addOnGroupModal',
								path: `rtd.techMaps.techMapsTable.modal.events.addOnGroupModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},
							/** Action edit group of object*/
							{
								name: 'editOnGroupModal',
								path: `rtd.techMaps.techMapsTable.modal.events.editOnGroupModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},
							/**Action search*/
							{
								name: 'searchOnTable',
								path: `rtd.techMaps.techMapsTable.table.events.onSearch`,
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
									'rtd.techMaps.techMapsTable.table.events.onReload',
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
export default TechMaps;
