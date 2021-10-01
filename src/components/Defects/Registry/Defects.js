import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Layout, Form, FormBody, Table} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/application.api';
import {
	customColumnProps,
	GetCurrentMode,
	MainTableHeader,
} from '../tableProps';
import './Defects.less';

/**
 * Общий компонет для двух разделов Журнал дефектов иПанель проблем, при необходимости отображение свойственнх только одному разделу
 * элементов настраивается при помощи  history.
 *
 * в случае, выбора конфигурации 'defects' - таблица будет расширенной с допольнительной информацией. В обратном случае, таблица будет представлять собой
 * свод  данных(сокращенный) о тех же сущностях. Свод необходим для струдников обсулживающих данные дефекты
 */

export default function Defects({match: {title}}) {
	const currentMode = GetCurrentMode();

	return (
		<BasePage title={title}>
			<Form name={'defectsLogForm'}>
				<Layout>
					<FormBody noPadding={true}>
						<MainTableHeader />
						<Table
							selectable={true}
							searchParamName={'equipment'}
							fixWidthColumn={true}
							headerHeight={35}
							defaultSortBy={{
								key: 'dateDetectDefect',
								order: 'desc',
							}}
							infinityMode={true}
							dispatch={{path: `${currentMode}.table`}}
							customColumnProps={customColumnProps}
							requestLoadRows={apiGetFlatDataByConfigName(
								currentMode
							)}
							requestLoadConfig={apiGetConfigByName(currentMode)}
							subscribe={[
								{
									name: 'onSearch',
									path: `rtd.${currentMode}.table.events.onSearchStart`,
									extraData: {
										filter: `rtd..table.data`,
										searchValue: `rtd.${currentMode}.table.events.onSearch`,
									},
									onChange: ({extraData, reloadTable}) => {
										const searchValue =
											extraData && extraData.searchValue
												? {
														equipment:
															extraData.searchValue,
												  }
												: {};
										const composedFilter = {
											...extraData.filter,
											...searchValue,
										};
										reloadTable({
											filter: composedFilter,
											sortBy: {
												key: 'dateDetectDefect',
												order: 'desc',
											},
										});
									},
								},
								/** Событие фильтрации в таблице по параметрам */
								{
									name: 'onApplyFilter',
									path: `rtd.${currentMode}.table.events.onApplyFilter`,
									extraData: {
										filter: `rtd.${currentMode}.table.data`,
										searchValue: `rtd.${currentMode}.table.events.onSearch`,
									},
									onChange: ({extraData, reloadTable}) => {
										reloadTable({
											searchValue: extraData
												? extraData.searchValue
												: '',
											filter: extraData
												? extraData.filter
												: '',
											sortBy: {
												key: 'dateDetectDefect',
												order: 'desc',
											},
										});
									},
								},
								{
									/** Обработчик события на кнопку овистить фильтр */
									name: 'onReload',
									path: `rtd.${currentMode}.table.events.onReload`,
									onChange: ({reloadTable}) => {
										reloadTable({
											filter: {},
											searchValue: '',
											sortBy: {
												key: 'dateDetectDefect',
												order: 'desc',
											},
										});
									},
								},
								{
									/** Обработчик события отправки дефектов в SAP */
									name: 'onSendToSap',
									path: `rtd.${currentMode}.table.events.onSendToSap`,
									extraData: {
										filter: `rtd.${currentMode}.table.data`,
										searchValue: `rtd.${currentMode}.table.events.onSearch`,
									},
									onChange: ({extraData, reloadTable}) => {
										reloadTable({
											searchValue: extraData
												? extraData.searchValue
												: '',
											filter: extraData
												? extraData.filter
												: '',
											sortBy: {
												key: 'dateDetectDefect',
												order: 'desc',
											},
										});
									},
								},
							]}
						/>
					</FormBody>
				</Layout>
			</Form>
		</BasePage>
	);
}
