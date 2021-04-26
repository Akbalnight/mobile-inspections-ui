import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';

import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {TechMapsTableHeader} from './tableProps';
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
const TechMaps = () => {
	return (
		<BasePage>
			<Form>
				<TechMapsTableHeader
					catalogName={'techMaps'}
					unique={'технологической карты'}
				/>
				<FormBody noPadding={true}>
					<Table
						footerShow={true}
						customColumnProps={customColumnProps}
						requestLoadRows={apiGetHierarchicalDataByConfigName(
							'techMaps'
						)}
						requestLoadConfig={apiGetConfigByName('techMaps')}
						dispatchPath={'techMaps.mainForm.table'}
						subscribe={[
							/**Событие добавления ТК*/
							{
								name: 'addOnModal',
								path: `rtd.techMaps.mainForm.modal.events.addOnModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},

							/**Событие изменение ТК*/
							{
								name: 'editOnModal',
								path: `rtd.techMaps.mainForm.modal.events.editOnModal`,
								onChange: ({reloadTable}) => {
									reloadTable({});
								},
							},

							/**Событие удаления ТК*/
							{
								name: 'deleteOnModal',
								path: `rtd.techMaps.mainForm.modal.events.deleteOnModal`,
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
