import React from 'react';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/application.api';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form, Table, FormBody} from 'rt-design';
import {schedulesCustomColumn, SchedulesTableHeader} from '../tableProps';

/***
 *
 * @returns {JSX.object}
 * @desc This is component to show repeat of detours by time.
 */
const Schedules = () => {
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true} scrollable={false}>
					<SchedulesTableHeader />
					<Table
						infinityMode={true}
						fixWidthColumn={true}
						searchParamName={'name'}
						requestLoadRows={apiGetFlatDataByConfigName(
							'repeaters'
						)}
						requestLoadConfig={apiGetConfigByName('repeaters')}
						customColumnProps={schedulesCustomColumn}
						dispatch={{path: 'schedules.table'}}
						subscribe={[
							/** Action add new event*/
							{
								name: 'onEditModal',
								path: 'rtd.schedules.table.events.editOnModal',
								onChange: ({reloadTable}) => reloadTable({}),
							},
							/** Action search*/
							{
								name: 'onSearch',
								path: 'rtd.schedules.table.events.onSearch',
								onChange: ({value, reloadTable}) => {
									reloadTable({
										searchValue: value,
									});
								},
							},
							/** Action reload*/
							{
								name: 'onReload',
								path: 'rtd.schedules.table.events.onReload',
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

export default Schedules;
