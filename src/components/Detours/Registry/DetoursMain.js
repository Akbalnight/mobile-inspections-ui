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
										'rtd.detours.mainForm.table.events.addOnModal',
									onChange: ({reloadTable}) => {
										reloadTable({});
									},
								},
								/** Action edit detour*/
								{
									name: 'editDetourOnServer',
									path:
										'rtd.detours.mainForm.table.events.editOnModal',
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
								/** Событие фильтрации в таблице по параметрам */
								{
									name: 'onApplyFilter',
									path:
										'rtd.detours.mainForm.filter.onApplyFilter',
									extraData:
										'rtd.detours.mainForm.filter.events',
									onChange: ({extraData, reloadTable}) => {
										console.log(
											'Table onApplyFilter',
											extraData
										);
										reloadTable({filter: extraData});
									},
								},
								{
									/** Обработчик события на кнопку Reload */
									name: 'onReload',
									path:
										'rtd.detour.mainForm.filter.events.onReload',
									onChange: ({reloadTable}) => {
										reloadTable({filter: {}});
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
