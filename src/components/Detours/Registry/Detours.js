import {BasePage} from 'mobile-inspections-base-ui';
import {Form, FormBody, Table, Switcher} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/application.api';
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
								path: 'rtd.detours.table.events.viewMode',
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
							dispatch={{path: 'detours.table'}}
							customColumnProps={customColumnProps}
							requestLoadRows={apiGetFlatDataByConfigName(
								'detours'
							)}
							requestLoadConfig={apiGetConfigByName('detours')}
							subscribe={[
								/** Action add detour*/
								{
									name: 'addDetourOnServer',
									path: 'rtd.detours.table.events.addOnModal',
									onChange: ({reloadTable}) => {
										reloadTable({});
									},
								},
								/** Action edit detour*/
								{
									name: 'editDetourOnServer',
									path: 'rtd.detours.table.events.editOnModal',
									onChange: ({reloadTable}) => {
										reloadTable({});
									},
								},

								/** Action search by detour name*/
								{
									name: 'onSearch',
									path: 'rtd.detours.table.events.onSearch',
									extraData: 'rtd.detours.table.data',
									onChange: ({
										value,
										extraData,
										reloadTable,
									}) => {
										reloadTable({
											searchValue: value,
											filter: extraData,
										});
									},
								},
								/** Action filter by detour routId, staffId*/

								{
									name: 'onApplyFilter',
									path: 'rtd.detours.table.events.onApplyFilter',
									extraData: {
										filter: 'rtd.detours.table.data',
										searchValue:
											'rtd.detours.table.events.onSearch',
									},
									onChange: ({extraData, reloadTable}) => {
										reloadTable({
											searchValue: extraData?.searchValue,
											filter: extraData?.filter,
										});
									},
								},
								{
									/** Action on push button Сбросить */
									name: 'onReload',
									path: 'rtd.detours.table.events.onReload',
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
