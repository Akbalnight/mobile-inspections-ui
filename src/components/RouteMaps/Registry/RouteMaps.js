import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	Form,
	FormBody,
	Button,
	Select,
	Title,
	Layout,
	Table,
	Switcher,
	executeRequest,
} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import SplitPane from 'react-split-pane';
import {ArrowUpOutlined, ExclamationCircleTwoTone} from '@ant-design/icons';
import RouteMap from './RouteMap';
import {useParams} from 'react-router';
import {customColumnProps, RouteMapsTableHeader} from '../tableProps';

export const AddRouteMaps = () => {
	return (
		<BasePage>
			<RouteMaps />
		</BasePage>
	);
};
export const EditRouteMaps = () => {
	const pageParams = useParams();
	return (
		<BasePage>
			<RouteMaps routeId={pageParams.id} />
		</BasePage>
	);
};

/**
 *
 * @returns {JSX.object}
 * @desc RouteMaps component where you select choice connect with Drag'n'Drop field(package RnD)
 *
 * @desc When you select Route, switcher change you view on two information table which current Route
 */
const RouteMaps = (props) => {
	const {routeId} = props;
	const loadData = (callBack, row) => {
		return callBack(routeId ? {...row, routeSelect: routeId} : null);
	};

	const processBeforeSaveForm = (rawValues) => {
		return {
			controlPointsCoordinate: rawValues.controlPointsTable,
		};
	};
	return (
		<SplitPane
			className={'routeMaps'}
			split='vertical'
			minSize={500}
			maxSize={700}
			defaultSize={500}
			pane2Style={{overflow: 'auto'}}
		>
			<div className={'routeMapsConfig'}>
				<Form
					name={'configForm'}
					loadInitData={loadData}
					processBeforeSaveForm={processBeforeSaveForm}
					requestSaveForm={({method, data, params}) =>
						apiSaveByConfigName('controlPointsCoordinateSave')({
							method: 'POST',
							data,
							params,
						})
					}
				>
					<FormBody scrollable={false} noPadding={false}>
						<Title level={4}>Маршрут</Title>
						<Select
							itemProps={{name: 'routeSelect'}}
							autoClearSearchValue={true}
							filterOption={false}
							showArrow={true}
							showSearch={true}
							searchParamName={'name'}
							mode={'single'}
							requestLoadRows={apiGetFlatDataByConfigName(
								'routes'
							)}
							optionConverter={(option) => ({
								label: option.name,
								value: option.id,
							})}
							dispatch={{
								path: 'routeMaps.mainForm.events.onSelectRoute',
								type: 'event',
							}}
						/>
						<Switcher
							itemProps={{initialValue: 0}}
							subscribe={[
								{
									name: 'choiceSwitcher',
									path: 'rtd.routeMaps.mainForm.events.onSelectRoute',
									onChange: ({value, setSubscribeProps}) => {
										value &&
											value.value &&
											setSubscribeProps &&
											setSubscribeProps({value: 1});
									},
								},
							]}
						>
							<Title
								level={2}
								label={
									<span
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											textAlign: 'center',
											marginTop: '300px',
										}}
									>
										<ArrowUpOutlined />
										Выберите маршрут
										<ExclamationCircleTwoTone />
									</span>
								}
							/>
							<Layout>
								<Title level={5} className={'pt-8'}>
									Маршрутные карты
								</Title>
								<Layout style={{border: '1px solid #DFDFDF'}}>
									<RouteMapsTableHeader />
									<Table
										itemProps={{name: 'routeMapsTable'}}
										defaultFilter={{
											routeId: routeId ? routeId : null,
										}}
										customColumnProps={customColumnProps}
										requestLoadRows={apiGetFlatDataByConfigName(
											'routeMaps'
										)}
										requestLoadConfig={apiGetConfigByName(
											'routeMaps'
										)}
										dispatch={{
											path: 'routeMaps.mainForm.routeMapsTable',
										}}
										subscribe={[
											/** Action reload table after select Route in Select*/
											{
												name: 'routeChoiceFilter',
												withMount: true,
												path: 'rtd.routeMaps.mainForm.events.onSelectRoute',
												onChange: ({
													value,
													reloadTable,
												}) => {
													value &&
														reloadTable &&
														reloadTable({
															filter: {
																routeId:
																	value.value,
															},
														});
												},
											},
											/** Action reload table after upload file */
											{
												name: 'routeMapUpload',
												path: `rtd.routeMaps.mainForm.routeMapsTable.routeMapUpload`,
												extraData:
													'rtd.routeMaps.mainForm.events.onSelectRoute',
												onChange: ({
													reloadTable,
													extraData,
												}) => {
													extraData &&
														reloadTable &&
														reloadTable({
															filter: {
																routeId:
																	extraData.value,
															},
														});
												},
											},
											/** Action change state after push on Button */
											{
												name: 'onClickMoveUp',
												path: 'rtd.routeMaps.mainForm.routeMapsTable.actions.onClickMoveUp',
												onChange: ({moveUpRow}) =>
													moveUpRow(),
											},
											/** Action change state after push on Button */
											{
												name: 'onClickMoveDown',
												path: 'rtd.routeMaps.mainForm.routeMapsTable.actions.onClickMoveDown',
												onChange: ({moveDownRow}) =>
													moveDownRow(),
											},

											/** Action change row position in table */
											{
												name: 'onMoveUpRow',
												path: 'rtd.routeMaps.mainForm.routeMapsTable.events.onMoveUpRow',
												onChange: ({value}) =>
													executeRequest(
														apiSaveByConfigName(
															'routeMapPositionSave'
														)
													)({
														data: {
															routeMaps:
																value.value,
														},
														method: 'POST',
													}),
											},
											/** Action change row position in table */
											{
												name: 'onMoveDownRow',
												path: 'rtd.routeMaps.mainForm.routeMapsTable.events.onMoveDownRow',
												onChange: ({value}) =>
													executeRequest(
														apiSaveByConfigName(
															'routeMapPositionSave'
														)
													)({
														data: {
															routeMaps:
																value.value,
														},
														method: 'POST',
													}),
											},
											/** Action change row position in table */
											{
												name: 'editFileName',
												path: 'rtd.routeMaps.mainForm.routeMapsTable.modal.editFileName',
												onChange: ({
													value,
													reloadTable,
												}) => {
													value &&
														reloadTable &&
														reloadTable({
															filter: {
																routeId:
																	value.value
																		.routeId,
															},
														});
												},
											},
										]}
									/>
								</Layout>
								<Title level={5} className={'p-8'}>
									Контрольные точки
								</Title>
								<Layout>
									<Table
										itemProps={{name: 'controlPointsTable'}}
										pageSize={1}
										customColumnProps={customColumnProps}
										fixWidthColumn={true}
										editMode={true}
										defaultFilter={{
											routeId: routeId ? routeId : null,
										}}
										requestLoadRows={apiGetFlatDataByConfigName(
											'routeControlPointsDebug'
										)}
										requestLoadConfig={apiGetConfigByName(
											'routeControlPointsDebug'
										)}
										dispatch={{
											path: 'routeMaps.mainForm.controlPointsTable',
										}}
										subscribe={[
											/** Action reload table after select Route in Select*/
											{
												name: 'controlPointTable',
												withMount: true,
												path: 'rtd.routeMaps.mainForm.events.onSelectRoute',
												onChange: ({
													value,
													reloadTable,
												}) => {
													value &&
														reloadTable &&
														reloadTable({
															filter: {
																routeId:
																	value.value,
															},
														});
												},
											},
											/** Action change table state by click on table*/
											{
												// Изменить таблицу с точками по клику на таблицу с точками
												name: 'onSelectedControlPoint',
												path: 'rtd.routeMaps.mainForm.controlPointsTable.events.onRowClick',
												extraData:
													'rtd.routeMaps.mainForm.routeMapsTable.selected',
												onChange: ({
													value,
													extraData,
													editRow,
												}) => {
													const row = value.value; //.value.rowData;
													if (
														row &&
														extraData &&
														row.routeMapId === null
													) {
														// Add new point
														// console.log('controlPointsTable - onSelectedControlPoint => Add new point')
														const _row = {
															...row,
															routeMapId:
																extraData.id,
															routeMapName:
																extraData.name,
														};
														editRow(_row);
													} else if (
														row &&
														extraData &&
														row.routeMapId !==
															extraData.id
													) {
														// move point
														// console.log('controlPointsTable - onSelectedControlPoint => move point from', row.routeMapId)
														const _row = {
															...row,
															routeMapId:
																extraData.id,
															routeMapName:
																extraData.name,
														};
														editRow(_row);
													}
												},
											},
											/** Action change table rows value*/
											{
												// Изменить таблицу с точками по изменению на карте (картинке)
												name: 'onChangeRouteMapPoints',
												path: 'rtd.routeMaps.mainForm.routeMapPoints.onChange',
												onChange: ({
													value,
													editRow,
												}) => {
													value && editRow(value);
												},
											},
										]}
										footerProps={{
											height: 50,
											rightCustomSideElement: () => (
												<>
													<Button
														type={'primary'}
														htmlType={'submit'}
													>
														Сохранить
													</Button>
												</>
											),
										}}
									/>
								</Layout>
							</Layout>
						</Switcher>
					</FormBody>
				</Form>
			</div>
			<div className={'routeMapsContainer'}>
				<Form>
					<RouteMap />
				</Form>
			</div>
		</SplitPane>
	);
};
