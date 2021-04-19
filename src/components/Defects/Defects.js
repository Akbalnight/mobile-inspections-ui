import React from //, {useRef}
'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {useHistory} from 'react-router';
import {
	customColumnProps,
	FilterPanel,
	DefectsModeSwitcher,
} from './tableProps';
import {paths} from '../../constants/paths';
import {DefectCardInfoModal} from './Modals/defectCardInfo';
import {ButtonSendToSap} from './Modals/modalButtonDefects';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {EditDefectCard} from './Modals/defectEdit';
import {SearchOutlined} from '@ant-design/icons';
import './Defects.less';
/** пока не нужно, не используется здесь */
// import {ButtonFilterSettings} from '../Base/Block/btnFilterSettings'

/**
 * Общий компонет для двух разделов Журнал дефектов иПанель проблем, при необходимости отображение свойственнх только одному разделу
 * элементов настраивается при помощи  history.
 *
 * в случае, выбора конфигурации 'defects' - таблица будет расширенной с допольнительной информацией. В обратном случае, таблица будет представлять собой
 * свод  данных(сокращенный) о тех же сущностях. Свод необходим для струдников обсулживающих данные дефекты
 */

const {Layout, Form, Space, FormBody, Divider, Input, Table, Button} = classic;

export default function Defects() {
	// const searchBtn = useRef(null);

	const history = useHistory();

	/**
	 * historyChange не уверен в корректоности такой замены по файлу
	 */
	let historyChange =
		history.location.pathname === paths.CONTROL_DEFECTS_DEFECTS.path;
	const currentMode = historyChange ? 'defects' : 'panelProblems';

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
								<EditDefectCard catalogName={currentMode} />
								{currentMode === 'defects' ? (
									<ButtonSendToSap />
								) : null}
								<DefectCardInfoModal />
							</Space>
							<Space style={{justifyContent: 'flex-end'}}>
								<DefectsModeSwitcher
									currentMode={currentMode}
								/>
								<div className={'asSearch'}>
									<Input
										style={{marginRight: 0}}
										// т.к. есть кнопка submit ниже - обработка enter не требуется
										// будет срабатывать событие отправки формы = клик на кнопку
										// но, вероятно, отправка будет производиться по enter в любом текстовом поле - проверить
										// onKeyPress={(e) => {
										//
										//     if (e.keyCode === 13) {
										//         searchBtn.current.click();
										//     }
										// }}
										itemProps={{name: 'defectsSearchInput'}}
										placeholder={'Поиск по наименованию'}
										subscribe={[
											reloadFilterFields(
												'defects.defectTable.events.onReload'
											),
										]}
										dispatch={{
											path:
												'defects.defectTable.events.searchValue',
										}}
									/>
									<Button
										// ref={searchBtn}
										itemProps={{
											name: 'defectsSearchButton',
										}}
										icon={<SearchOutlined />}
										type={'default'}
										htmlType={'submit'}
										// event?
										dispatch={{
											path:
												'defects.defectTable.events.onBtnSearch',
										}}
									/>
								</div>
							</Space>
						</Space>
						<Divider className={'mt-0 mb-0'} />

						<FilterPanel />

						<Table
							selectable={true}
							searchParamName={'name'}
							fixWidthColumn={true}
							headerHeight={35}
							defaultSortBy={{
								key: 'dateDetectDefect',
								order: 'asc',
							}}
							infinityMode={true}
							dispatch={{path: 'defects.defectTable.table'}}
							customColumnProps={customColumnProps}
							requestLoadRows={apiGetFlatDataByConfigName(
								currentMode
							)}
							requestLoadConfig={apiGetConfigByName(currentMode)}
							subscribe={[
								{
									name: 'onSearch',
									path:
										'rtd.defects.defectTable.events.onBtnSearch',
									extraData: {
										filter:
											'rtd.defects.defectTable.filter',
										searchValue:
											'rtd.defects.defectTable.events.searchValue',
									},
									onChange: ({extraData, reloadTable}) => {
										const searchValue =
											extraData && extraData.searchValue
												? {name: extraData.searchValue}
												: {};
										const composedFilter = {
											...extraData.filter,
											...searchValue,
										};
										reloadTable({
											filter: composedFilter,
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
											'rtd.defects.defectTable.events.searchValue',
									},
									onChange: ({extraData, reloadTable}) => {
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
									/** Обработчик события на кнопку овистить фильтр */
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
								{
									/** Обработчик события отправки дефектов в SAP */
									name: 'onSendToSap',
									path:
										'rtd.defects.defectTable.modal.events.onSendToSapModal',
									extraData: {
										filter:
											'rtd.defects.defectTable.filter',
										searchValue:
											'rtd.defects.defectTable.events.onSearch',
									},
									onChange: ({extraData, reloadTable}) => {
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
							]}
						/>
					</FormBody>
				</Layout>
			</Form>
		</BasePage>
	);
}
