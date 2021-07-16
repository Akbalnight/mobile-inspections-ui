import {BasePage} from 'mobile-inspections-base-ui';
import {Form, FormBody, Table, Switcher} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {customColumnProps, DetoursMainTableHeader} from '../tableProps';
import React from 'react';
import DetoursCalendar from './DetoursCalendar';

/**
 *
 * @returns {JSX.object}
 * @desc Detour main component. You see 2 view blocks, table(full info) and calendar(short info)
 */
export const Detours = () => {
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true}>
					<DetoursMainTableHeader />
					<Switcher
						subscribe={[
							{
								name: 'detourMainForm',
								path: 'rtd.detours.mainForm.table.events.viewMode',
								onChange: ({value, setSubscribeProps}) => {
									setSubscribeProps({value: value});
								},
							},
						]}
					>
						<Table
							fixWidthColumn={true}
							infinityMode={true}
							searchParamName={'name'}
							dispatch={{path: 'detours.mainForm.table'}}
							customColumnProps={customColumnProps}
							requestLoadRows={apiGetFlatDataByConfigName(
								'detours'
							)}
							requestLoadConfig={apiGetConfigByName('detours')}
							subscribe={[
								/** Action add detour*/
								{
									name: 'addDetourOnServer',
									path: 'rtd.detours.mainForm.table.events.addOnModal',
									onChange: ({reloadTable}) => {
										reloadTable({});
									},
								},
								/** Action edit detour*/
								{
									name: 'editDetourOnServer',
									path: 'rtd.detours.mainForm.table.events.editOnModal',
									onChange: ({reloadTable}) => {
										reloadTable({});
									},
								},

								/** Action search by detour name*/
								{
									name: 'onSearch',
									path: 'rtd.detours.mainForm.table.events.onSearch',
									extraData:
										'rtd.detours.mainForm.filter.events',
									onChange: ({
										value,
										extraData,
										reloadTable,
									}) => {
										console.log(
											'Table onSearch',
											extraData,
											value
										);
										reloadTable({
											searchValue: value,
											filter: extraData,
										});
									},
								},
								/** Action filter by detour routId, staffId*/

								{
									name: 'onApplyFilter',
									path: 'rtd.detours.mainForm.table.onApplyFilter',
									extraData: {
										filter: 'rtd.detours.mainForm.filter.events',
										searchValue:
											'rtd.detours.mainForm.table.events.onSearch',
									},
									onChange: ({extraData, reloadTable}) => {
										console.log(
											'Table onApplyFilter',
											extraData
										);
										reloadTable({
											searchValue: extraData?.searchValue,
											filter: extraData?.filter,
										});
									},
								},
								{
									/** Action on push button Сбросить */
									name: 'onReload',
									path: 'rtd.detours.mainForm.table.onReload',
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
