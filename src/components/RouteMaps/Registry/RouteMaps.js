import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic, executeRequest} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
	apiSaveFileByConfigName,
} from '../../../apis/catalog.api';

// import {routeMapsControlPointViewModal} from '../Modals/routeMapsControlPointsInfo';
import SplitPane from 'react-split-pane';
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	ExclamationCircleTwoTone,
} from '@ant-design/icons';
import RouteMap from './RouteMap';
import {useParams} from 'react-router';

const {
	Form,
	FormBody,
	Button,
	Select,
	UploadFile,
	Title,
	Layout,
	Table,
	Space,
	Divider,
} = classic;

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
 */
const RouteMaps = (props) => {
	const {routeId} = props;
	const loadData = (callBack, row) => {
		return callBack(routeId ? {...row, routeSelect: routeId} : null);
	};
	/**
	 * СИТУАЦИИ:
	 * 1. Человек заходит на карту и на ней есть уже несколько КТ(не кликая на таблицу контрольных точек)
	 * 2. Человек заходит на карту и выбирает КТ(происходит ререндер- не приемлимо)
	 * 3. Человек выбирает иную карту, автоматически сохраняются предыдущие КТ и новые.
	 * 4. Человек хочет убрать КТ с карты
	 */
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
							// defaultValue={routeId? routeId: null}
							searchParamName={'name'}
							mode={'single'}
							infinityMode={true}
							requestLoadRows={apiGetFlatDataByConfigName(
								'routes'
							)}
							// requestLoadRows={({data, params}) => apiGetFlatDataByConfigName(
							//     'routes'
							// )({data: routeId ? {...data, id: routeId} : {...data}, params})}
							optionConverter={(option) => ({
								label: option.name,
								value: option.id,
							})}
							dispatch={{
								path: 'routeMaps.mainForm.events.onSelectRoute',
								type: 'event',
							}}
						/>

						<Title
							itemProps={{hidden: false}}
							level={2}
							subscribe={[
								{
									name: 'makeHidden',
									path:
										'rtd.routeMaps.mainForm.events.onSelectRoute',
									onChange: ({value, setSubscribeProps}) => {
										value &&
											setSubscribeProps &&
											setSubscribeProps({
												hidden: value.value,
											});
									},
								},
							]}
							label={
								<span
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										textAlign: 'center',
										height: '1600px', //костыль
										zIndex: '100',
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
							<Divider className={'mb-0 mt-0'} />

							<Space className={'p-8'}>
								<UploadFile
									itemProps={{
										name: 'uploadRouteMaps',
										valuePropName: 'dataObject',
									}}
									dispatch={{
										path: `routeMaps.mainForm.routeMapsTable.routeMapUpload`,
										type: 'event',
									}}
									dataObject={{
										routeMap: {
											id: null,
											position: null,
											fileId: null,
										},
									}}
									requestUploadFile={apiSaveFileByConfigName(
										'routeMapFileSave'
									)}
									subscribe={[
										{
											name: 'makeHidden',
											path:
												'rtd.routeMaps.mainForm.events.onSelectRoute',
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												value &&
													setSubscribeProps &&
													setSubscribeProps({
														dataObject: {
															routeMap: {
																id: null,
																position: null,
																fileId: null,
																routeId:
																	value.value,
															},
														},
													});
											},
										},
									]}
								/>
								<Button
									icon={<ArrowUpOutlined />}
									disabled={true}
									dispatch={{
										path:
											'routeMaps.mainForm.routeMapsTable.actions.onClickMoveUp',
										type: 'event',
									}}
									subscribe={[
										{
											name: 'btnUp',
											path:
												'rtd.routeMaps.mainForm.routeMapsTable.selected',
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												value &&
													setSubscribeProps({
														disabled: !value,
													});
											},
										},
									]}
								/>
								<Button
									icon={<ArrowDownOutlined />}
									disabled={true}
									dispatch={{
										path:
											'routeMaps.mainForm.routeMapsTable.actions.onClickMoveDown',
										type: 'event',
									}}
									subscribe={[
										{
											name: 'btnUp',
											path:
												'rtd.routeMaps.mainForm.routeMapsTable.selected',
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												value &&
													setSubscribeProps({
														disabled: !value,
													});
											},
										},
									]}
								/>
							</Space>
							<Divider className={'mb-8 mt-0'} />
							<Table
								itemProps={{name: 'routeMapsTable'}}
								infinityMode={true}
								defaultFilter={{
									routeId: routeId ? routeId : null,
								}}
								requestLoadRows={apiGetFlatDataByConfigName(
									'routeMaps'
								)}
								requestLoadConfig={apiGetConfigByName(
									'routeMaps'
								)}
								dispatchPath={
									'routeMaps.mainForm.routeMapsTable'
								}
								subscribe={[
									/** Action reload table after select Route in Select*/
									{
										name: 'routeChoiceFilter',
										path:
											'rtd.routeMaps.mainForm.events.onSelectRoute',
										onChange: ({value, reloadTable}) => {
											value &&
												reloadTable &&
												reloadTable({
													filter: {
														routeId: value.value,
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
										path:
											'rtd.routeMaps.mainForm.routeMapsTable.actions.onClickMoveUp',
										onChange: ({moveUpRow}) => moveUpRow(),
									},
									/** Action change state after push on Button */
									{
										name: 'onClickMoveDown',
										path:
											'rtd.routeMaps.mainForm.routeMapsTable.actions.onClickMoveDown',
										onChange: ({moveDownRow}) =>
											moveDownRow(),
									},

									/** Action change row position in table */
									{
										name: 'onMoveUpRow',
										path:
											'rtd.routeMaps.mainForm.routeMapsTable.events.onMoveUpRow',
										onChange: ({value}) =>
											executeRequest(
												apiSaveByConfigName(
													'routeMapPositionSave'
												)
											)({
												data: {
													routeMaps: value.value,
												},
												method: 'POST',
											}),
									},
									/** Action change row position in table */
									{
										name: 'onMoveDownRow',
										path:
											'rtd.routeMaps.mainForm.routeMapsTable.events.onMoveDownRow',
										onChange: ({value}) =>
											executeRequest(
												apiSaveByConfigName(
													'routeMapPositionSave'
												)
											)({
												data: {
													routeMaps: value.value,
												},
												method: 'POST',
											}),
									},
								]}
							/>

							<Title level={5} className={'p-8'}>
								Контрольные точки
							</Title>

							<Table
								itemProps={{name: 'controlPointsTable'}}
								infinityMode={true}
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
								dispatchPath={
									'routeMaps.mainForm.controlPointsTable'
								}
								subscribe={[
									/** Action reload table after select Route in Select*/
									{
										name: 'controlPointTable',
										path:
											'rtd.routeMaps.mainForm.events.onSelectRoute',
										onChange: ({value, reloadTable}) => {
											value &&
												reloadTable &&
												reloadTable({
													filter: {
														routeId: value.value,
													},
												});
										},
									},
									/** Action change table state by click on table*/
									{
										// Изменить таблицу с точками по клику на таблицу с точками
										name: 'onSelectedControlPoint',
										path:
											'rtd.routeMaps.mainForm.controlPointsTable.events.onRowClick',
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
													routeMapId: extraData.id,
													routeMapName:
														extraData.name,
												};
												editRow(_row);
											} else if (
												row &&
												extraData &&
												row.routeMapId !== extraData.id
											) {
												// move point
												// console.log('controlPointsTable - onSelectedControlPoint => move point from', row.routeMapId)
												const _row = {
													...row,
													routeMapId: extraData.id,
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
										path:
											'rtd.routeMaps.mainForm.routeMapPoints.onChange',
										onChange: ({value, editRow}) => {
											value && editRow(value);
										},
									},
								]}
								footerProps={{
									height: 50,
									rightCustomSideElement: () => (
										<>
											<Button
												className={'mr-8'}
												onClick={console.log()}
											>
												Закрыть
											</Button>
											<Button
												className={'mr-8'}
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

/**
 *  НЕ УДАЛЯТЬ!!!!
 *  public.route_maps.id.route_map_id/public.files.id.file_id
 */
/**
 * https://www.npmjs.com/package/react-rnd -  документация по пакету.
 *
 * Что нам интересно(свойства)
 *
 *  position?: { x: number, y: number }-  тут мы сожем задавать начальные координаты на рисунке
 *
 * size?: { width: (number | string), height: (number | string) }
 *
 *  disableDragging?: boolean; - оно отключает перетаскивание, вдруг точка является ключевой и ее нельзя перетаскивать
 *
 *  bounds?: string; - ограничение по передвижению элемента, можно задать 'parent'  или className  в формате '.className'. Возможно сюда
 * мы будем задавать взяимосвязь с загружаемыми данными в объекте выше.
 *
 * Сallback
 *
 *   onDragStop - пригодиться для получения новых координат
 *
 *
 */
/**
 * style={{display:'flex', flexDirection: 'row'}} поставил эти стили на BasePage  инлайново. возможно это не в лучших практиках
 * style={{display: 'flex', flexDirection: 'row'}} width: 100%; flex: auto;
 * style={{width: '30%', height: '100%'}}
 * style={{width: '70%', height: '100%', background: '#f9dcc4'}}
 */

/**
 *  НЕ УДАЛЯТЬ!!!!
 */
/**
 *  <Custom
 itemProps={{name: 'imageField'}}
 render={({
                                     value,
                                     defaultValue,
                                     onChange,
                                     koordinate,
                                 }) => {
                            // console.log(
                            //     '1',
                            //     defaultValue,
                            //
                            //     '2',
                            //     koordinate
                            // );
                            return (
                                <>
                                    {defaultValue === undefined ? (
                                        <ExclamationCircleTwoTone/>
                                    ) : (
                                        <>
                                            <img
                                                src={`${
                                                    defaultValue &&
                                                    defaultValue.fileUrl
                                                }`}
                                                alt={`${
                                                    defaultValue &&
                                                    defaultValue.name
                                                }`}
                                                width={'100%'}
                                                height={'100%'}
                                            />
                                        </>
                                    )}
                                    <Rnd
                                        key={
                                            koordinate &&
                                            koordinate.controlPointId
                                        }
                                        // size={{width: 32, height: 32}}
                                        bounds={'.routeMapsContainer'}
                                        style={{
                                            display: 'inline-block!important',
                                            margin: 20,
                                            background: '#b7e4c7',
                                            borderRadius:
                                                '0% 31% 100% 62% ',
                                            textAlign: 'center',
                                            verticalAlign: 'middle'

                                        }}
                                        onDragStop={(e, d) => {
                                            console.log(
                                                'koor X',
                                                d.x,
                                                'koor Y',
                                                d.y
                                            );
                                        }}
                                        default={{
                                            x:
                                                koordinate &&
                                                koordinate.xLocation,
                                            y:
                                                koordinate &&
                                                koordinate.yLocation,
                                            width: koordinate && 32, height: koordinate && 32

                                        }}
                                    >
                                        <div>
                                            {koordinate && koordinate.controlPointName}
                                        </div>
                                    </Rnd>
                                </>
                            );
                        }}
 */
