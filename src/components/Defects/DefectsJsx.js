import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {components, classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {useHistory} from 'react-router';
import {customColumnProps, headerTable} from './tableProps';
import {paths} from '../../constants/paths';

/**
 * Общий компонет для двух разделов Журнал дефектов иПанель проблем, при необходимости отображение свойственнх только одному разделу
 * элементов настраивается при помощи  history.
 *
 * в случае, выбора конфигурации 'defects' - таблица будет расширенной с допольнительной информацией. В обратном случае, таблица будет представлять собой
 * свод  данных(сокращенный) о тех же сущностях. Свод необходим для струдников обсулживающих данные дефекты
 */

// const {Form} = components;
const {
	Layout,
	Form,
	Space,
	FormHeader,
	FormBody,
	FormFooter,
	Table,
	Button,
	Title,
} = classic;

export default function DefectsJsx() {
	const history = useHistory();

	/**
	 * historyChange не уверен в корректоности такой замены по файлу
	 */
	let historyChange =
		history.location.pathname === '/control-defects/defects';

	const tableFields = [
		{
			componentType: 'Layout',
			children: [
				...headerTable(history),
				{
					componentType: 'Item',
					classname: 'mt-0',
					child: {
						componentType: 'Table',
						selectable: true,
						searchParamName: 'name',
						fixWidthColumn: true,
						history,
						headerHeight: 35,
						infinityMode: true,
						dispatchPath: 'defects.defectTable.table',
						customColumnProps: customColumnProps,
						requestLoadRows: apiGetFlatDataByConfigName(
							historyChange ? 'defects' : 'panelProblems'
						),
						requestLoadConfig: apiGetConfigByName(
							historyChange ? 'defects' : 'panelProblems'
						),

						subscribe: [
							/** Событие поиска в таблице по значению name */
							{
								name: 'onSearch',
								path: 'rtd.defects.defectTable.events.onSearch',
								onChange: ({value, extraData, reloadTable}) => {
									reloadTable({
										searchValue: value.value,
									});
								},
							},
							/** Событие фильтрации в таблице по параметрам */
							{
								name: 'onApplyFilter',
								path:
									'rtd.defects.defectTable.events.onApplyFilter',
								extraData: 'rtd.defects.defectTable.filter',
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
								path: 'rtd.defects.defectTable.events.onReload',
								onChange: ({reloadTable}) => {
									reloadTable({filter: {}});
								},
							},
						],
					},
				},
			],
		},
	];

	const formConfig = {
		noPadding: true,
		name: 'defectsLogForm',
		body: [...tableFields],
	};
	return (
		<BasePage>
			<Form>
				<Layout>
					<FormHeader>
						<Space
							className={'px-8 pt-8'}
							style={{
								justifyContent: 'space-between',
							}}
						>
							<Space>
								<Button
									label={'Перейти в панель проблем'}
									type={'primary'}
									onClick={() => {
										history.push(
											`${paths.CONTROL_DEFECTS_PANEL_PROBLEMS.path}`
										);
									}}
								/>
							</Space>
						</Space>
					</FormHeader>
					<FormBody noPadding={true}>
						<Table
							selectable={true}
							searchParamName={'name'}
							fixWidthColumn={true}
							// history,
							headerHeight={35}
							infinityMode={true}
							dispatchPath={'defects.defectTable.table'}
							customColumnProps={customColumnProps}
							requestLoadRows={apiGetFlatDataByConfigName(
								historyChange ? 'defects' : 'panelProblems'
							)}
							requestLoadConfig={apiGetConfigByName(
								historyChange ? 'defects' : 'panelProblems'
							)}
							subscribe={[
								/** Событие поиска в таблице по значению name */
								{
									name: 'onSearch',
									path:
										'rtd.defects.defectTable.events.onSearch',
									onChange: ({
										value,
										extraData,
										reloadTable,
									}) => {
										reloadTable({
											searchValue: value.value,
										});
									},
								},
								/** Событие фильтрации в таблице по параметрам */
								{
									name: 'onApplyFilter',
									path:
										'rtd.defects.defectTable.events.onApplyFilter',
									extraData: 'rtd.defects.defectTable.filter',
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
									name: ' onReload',
									path:
										' rtd.defects.defectTable.events.onReload',
									onChange: ({reloadTable}) => {
										reloadTable({filter: {}});
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
