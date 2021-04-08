import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {useHistory} from 'react-router';
import {customColumnProps, headerTable, FilterPanel} from './tableProps';
import {paths} from '../../constants/paths';
import {
	DefectCardInfoModal,
	defectCardInfoModal,
} from './Modals/defectCardInfo';
import {EditDefaultObjectOnServer} from '../Base/Modals/DefaultObjectOnServer';
import {reloadFilterFields} from '../Base/Functions/DateLimits';
/** пока не нужно, не используется здесь */
// import {ButtonFilterSettings} from '../Base/Block/btnFilterSettings'

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
	FormBody,
	Divider,
	Table,
	Button,
	Search,
	Input,
} = classic;

export default function DefectsJsx() {
	const history = useHistory();

	/**
	 * historyChange не уверен в корректоности такой замены по файлу
	 */
	let historyChange =
		history.location.pathname === paths.CONTROL_DEFECTS_DEFECTS.path;

	const currentMode = historyChange ? 'defects' : 'panelProblems';

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
							currentMode
						),
						requestLoadConfig: apiGetConfigByName(currentMode),
						subscribe: [
							/** Событие поиска в таблице по значению name */
							{
								name: 'onSearch',
								path: 'rtd.defects.defectTable.events.onSearch',
								onChange: ({value, reloadTable}) => {
									reloadTable({
										searchValue: value,
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

	// const formConfig = {
	// 	noPadding: true,
	// 	name: 'defectsLogForm',
	// 	body: [...tableFields],
	// };
	return (
		<BasePage>
			<Form name={'defectsLogForm'}>
				<Layout>
					<FormBody noPadding={true}>
						<Space
							className={'p-8'}
							style={{
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							<Space>
								{/*<EditDefaultObjectOnServer catalogName={currentMode}/>*/}
								<DefectCardInfoModal />
							</Space>
							<Space>
								{historyChange ? (
									<Button
										label={'Перейти в панель проблем'}
										type={'primary'}
										onClick={() => {
											history.push(
												`${paths.CONTROL_DEFECTS_PANEL_PROBLEMS.path}`
											);
										}}
									/>
								) : (
									<Button
										label={'Перейти в журнал дефектов'}
										type={'primary'}
										onClick={() => {
											history.push(
												`${paths.CONTROL_DEFECTS_DEFECTS.path}`
											);
										}}
									/>
								)}
								<Search
									itemProps={{name: 'onSearch'}}
									placeholder={'Введите наименование'}
									dispatch={{
										path:
											'defects.defectTable.events.onSearch',
										// type: 'event',
									}}
									subscribe={[
										reloadFilterFields(
											'defects.defectTable.events.onReload'
										),
									]}
								/>
								{/*<Input.Search*/}
								{/*	placeholder={'Ant search'}*/}
								{/*/>*/}
								{/*<ButtonFilterSettings/>*/}
							</Space>
						</Space>
						<Divider className={'mt-0 mb-0'} />
						<FilterPanel historyChange={history} />

						<Table
							selectable={true}
							searchParamName={'name'}
							fixWidthColumn={true}
							// history,
							headerHeight={35}
							// infinityMode={true}
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
								/** при этом может быть установлен фильтр, его стоит захватывать с собой
								 * однако, если фильтр был установлен, а потом очищен -
								 * не очищаются значения фильтра в store */
								{
									name: 'onSearch',
									path:
										'rtd.defects.defectTable.events.onSearch',
									extraData: 'rtd.defects.defectTable.filter',
									onChange: ({
										value,
										extraData,
										reloadTable,
									}) => {
										console.log(
											'Table onSearch',
											extraData
										);
										reloadTable({
											searchValue: value,
											filter: extraData,
										});
									},
								},
								/** Событие фильтрации в таблице по параметрам */
								{
									name: 'onApplyFilter',
									path:
										'rtd.defects.defectTable.events.onApplyFilter',
									extraData: {
										filter:
											'rtd.defects.defectTable.filter',
										searchValue:
											'rtd.defects.defectTable.events.onSearch',
									},
									onChange: ({extraData, reloadTable}) => {
										console.log(
											'Table onApplyFilter',
											extraData
										);
										reloadTable({
											searchValue: extraData
												? extraData.searchValue
												: '',
											filter: extraData
												? extraData.filter
												: '',
										});
									},
								},
								{
									/** Обработчик события на кнопку Reload */
									name: 'onReload',
									path:
										'rtd.defects.defectTable.events.onReload',
									onChange: ({reloadTable}) => {
										reloadTable({
											filter: {},
											searchValue: '',
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
