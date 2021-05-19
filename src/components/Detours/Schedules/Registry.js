import React from 'react';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {Access, BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {AddDetourButton, EditDetourButton} from './Modals/EditModal';
import {dateTime} from '../../Base/customColumnProps';
import {DetourSchedulesView} from './Modals/ViewModal';
const {Form, Table, FormBody, Space, Search, Button} = classic;

const columnProps = [
	{
		name: 'interval',
		cellRenderer: ({rowData, cellData}) => {
			let period =
				cellData > 1 ? rowData.periodName + 's' : rowData.periodName;

			return cellData + ' ' + period;
		},
	},

	{...dateTime('dateStart')},
	{...dateTime('nextExecution')},
	{...dateTime('dateFinish')},
];

const Registry = () => {
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true} scrollable={false}>
					<Space>
						<Access
							roles={[
								'ROLE_ADMIN',
								'ROLE_MOBILE_APP',
								'ROLE_MI_ADMIN',
							]}
						>
							<Space className={'m-8'}>
								<AddDetourButton />
								<EditDetourButton />
							</Space>
						</Access>
						<DetourSchedulesView />
						<Button />
						<Search />
					</Space>
					<Table
						infinityMode={true}
						fixWidthColumn={true}
						requestLoadRows={apiGetFlatDataByConfigName(
							'repeaters'
						)}
						requestLoadConfig={apiGetConfigByName('repeaters')}
						customColumnProps={columnProps}
						dispatch={{path: 'detours.schedulesTable.table'}}
						subscribe={[
							{
								name: 'onEditModal',
								path:
									'rtd.detours.schedulesTable.table.events.onEditModal',
								onChange: ({reloadTable}) => reloadTable({}),
							},
						]}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};

export default Registry;
