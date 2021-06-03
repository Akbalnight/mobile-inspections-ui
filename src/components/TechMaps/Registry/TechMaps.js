import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {mainCustomColumnProps, TechMapsTableHeader} from '../tableProps';

const {Form, FormBody, Table} = classic;

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
						]}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};
export default TechMaps;
