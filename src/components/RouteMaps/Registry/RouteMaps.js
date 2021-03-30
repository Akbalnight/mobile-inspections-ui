import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

// import {routeMapsControlPointViewModal} from '../Modals/routeMapsControlPointsInfo';
import SplitPane from 'react-split-pane';
import {ArrowUpOutlined, ExclamationCircleTwoTone} from '@ant-design/icons';
import RouteMap from './RouteMap';

const {
	Form,
	FormBody,
	FormFooter,
	Button,
	Select,
	UploadFile,
	Title,
	Layout,
	Table,
	Space,
} = classic;

/**
 *
 * @returns {JSX.object}
 * @desc RouteMaps component where you select choice connect with Drag'n'Drop field(package RnD)
 *
 */
export default function RouteMaps() {
	/**
	 * СИТУАЦИИ:
	 * 1. Человек заходит на карту и на ней есть уже несколько КТ(не кликая на таблицу контрольных точек)
	 * 2. Человек заходит на карту и выбирает КТ(происходит ререндер- не приемлимо)
	 * 3. Человек выбирает иную карту, автоматически сохраняются предыдущие КТ и новые.
	 * 4. Человек хочет убрать КТ с карты
	 */
	// const processBeforeSaveForm = (rawValues) => {
	//     const values = {...rawValues};
	//     return {
	//         ...values,
	//         id: values.routeSelect,
	//     };
	//
	// };
	return (
		<BasePage>
			{/*<Form>*/}

			<SplitPane
				className={'routeMaps'}
				split='vertical'
				minSize={500}
				maxSize={700}
				defaultSize={500}
			>
				<div className={'routeMapsConfig'}>
					<Form name={'configForm'}>
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
								infinityMode={true}
								requestLoadRows={apiGetFlatDataByConfigName(
									'routes'
								)}
								optionConverter={(option) => ({
									label: option.name,
									value: option.id,
								})}
								dispatch={{
									path:
										'routeMaps.mainForm.events.onSelectRoute',
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
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
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
									/>
								</Space>
								<Table
									itemProps={{name: 'routeMapsTable'}}
									infinityMode={true}
									style={{width: '100%', height: '100%'}}
									defaultFilter={{routeId: null}}
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
										{
											name: 'routeMapUpload',
											path: `rtd.routeMaps.mainForm.routeMapsTable.routeMapUpload`,
											onChange: ({reloadTable}) => {
												reloadTable({});
											},
										},
										{
											name: 'routeChoiceFilter',
											path:
												'rtd.routeMaps.mainForm.events.onSelectRoute',
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
									]}
								/>

								<Title level={5} className={'p-8'}>
									Контрольные точки
								</Title>

								<Table
									itemProps={{name: 'controlPointsTable'}}
									infinityMode={true}
									editMode={true}
									defaultFilter={{routeId: null}}
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
										{
											name: 'controlPointTable',
											path:
												'rtd.routeMaps.mainForm.events.onSelectRoute',
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
										{
											// Изменить таблицу с точками по изменению на карте (картинке)
											name: 'onChangeRouteMapPoints',
											path:
												'rtd.routeMaps.mainForm.routeMapPoints.onChange',
											onChange: ({value, editRow}) => {
												// console.log('onChangeRouteMapPoints', value)
												value && editRow(value);
											},
										},
									]}
								/>
							</Layout>
						</FormBody>
						<FormFooter>
							<Button className={'mr-8'} onClick={console.log()}>
								Закрыть
							</Button>
							<Button
								className={'mr-8'}
								type={'primary'}
								htmlType={'submit'}
							>
								Сохранить
							</Button>
						</FormFooter>
					</Form>
				</div>
				<div className={'routeMapsContainer'}>
					<Form>
						<RouteMap />
					</Form>
				</div>
			</SplitPane>
			{/*    <FormFooter>*/}
			{/*        <Button className={'mr-8'} onClick={console.log()}>*/}
			{/*            Закрыть*/}
			{/*        </Button>*/}
			{/*        <Button*/}
			{/*            className={'mr-8'}*/}
			{/*            type={'primary'}*/}
			{/*            htmlType={'submit'}*/}
			{/*        >*/}
			{/*            Сохранить*/}
			{/*        </Button>*/}
			{/*    </FormFooter>*/}
			{/*</Form>*/}
		</BasePage>
	);
}

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
