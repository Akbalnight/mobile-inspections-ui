import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {useHistory} from 'react-router';
import {customColumnProps, FilterPanel} from './tableProps';
import {paths} from '../../constants/paths';
import {DefectCardInfoModal} from './Modals/defectCardInfo';

import {reloadFilterFields} from '../Base/Functions/ReloadField';
/** пока не нужно, не используется здесь */

/**
 * Общий компонет для двух разделов Журнал дефектов иПанель проблем, при необходимости отображение свойственнх только одному разделу
 * элементов настраивается при помощи  history.
 *
 * в случае, выбора конфигурации 'defects' - таблица будет расширенной с допольнительной информацией. В обратном случае, таблица будет представлять собой
 * свод  данных(сокращенный) о тех же сущностях. Свод необходим для струдников обсулживающих данные дефекты
 */

const {Layout, Form, Space, FormBody, Divider, Table, Button, Search} = classic;

export default function DefectsJsx() {
	const history = useHistory();

	/**
	 * historyChange не уверен в корректоности такой замены по файлу
	 */
	let historyChange =
		history.location.pathname === paths.CONTROL_DEFECTS_DEFECTS_JSX.path;

	// const currentMode = historyChange ? 'defects' : 'panelProblems';

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
											searchValue: extraData.searchValue,
											filter: extraData.filter,
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
