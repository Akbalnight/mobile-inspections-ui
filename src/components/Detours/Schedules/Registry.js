import React from 'react';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {AddDetourButton, EditDetourButton} from './Modals/EditModal';
import {dateTime} from '../../Base/customColumnProps';
const {Form, Table, FormBody, Space} = classic;

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
					<Space className={'m-8'}>
						<AddDetourButton />
						<EditDetourButton />
					</Space>
					<Table
						infinityMode={true}
						fixWidthColumn={true}
						requestLoadRows={apiGetFlatDataByConfigName(
							'repeaters'
						)}
						requestLoadConfig={apiGetConfigByName('repeaters')}
						customColumnProps={columnProps}
						dispatch={{path: 'detours.schedules.registry'}}
						subscribe={[
							{
								name: 'onEditModal',
								path:
									'rtd.detours.schedules.registry.events.onEditModal',
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
