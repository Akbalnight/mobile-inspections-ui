import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {customColumnProps, TableHeader} from '../tableProps';
import React from 'react';
import DetoursCalendar from '../DetoursCalendar';

const {Form, FormBody, Table, Switcher} = classic;
export const DetoursMain = () => {
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true}>
					<TableHeader />
					<Switcher
						subscribe={[
							{
								name: 'detourMainForm',
								path:
									'rtd.detours.mainForm.table.events.viewMode',
								onChange: ({value, setSubscribeProps}) => {
									console.log('Switcher value', value);
									setSubscribeProps({value: value});
								},
							},
						]}
					>
						<Table
							selectable={true}
							fixWidthColumn={true}
							searchParamName={'name'}
							dispatchPath={'detours.mainForm.table'}
							customColumnProps={customColumnProps}
							requestLoadRows={apiGetFlatDataByConfigName(
								'detours'
							)}
							requestLoadConfig={apiGetConfigByName('detours')}
							subscribe={[
								/** Action add detour*/
								{
									name: 'addDetourOnServer',
									path:
										'rtd.detours.mainForm.modal.events.addOnModal',
									onChange: ({reloadTable}) => {
										reloadTable({});
									},
								},
								/** Action edit detour*/
								{
									name: 'addDetourOnServer',
									path:
										'rtd.detours.mainForm.modal.events.addOnModal',
									onChange: ({reloadTable}) => {
										reloadTable({});
									},
								},
								/** Action search by detour name*/
								{
									name: 'onSearch',
									path:
										'rtd.detours.mainForm.table.events.onSearch',
									onChange: ({value, reloadTable}) => {
										console.log(value);
										reloadTable({
											searchValue: value.value,
										});
									},
								},
							]}
						/>
						<DetoursCalendar />
					</Switcher>
				</FormBody>
			</Form>
		</BasePage>
	);
};
