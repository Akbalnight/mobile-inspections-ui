import React, {useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {Result} from 'antd';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {Rnd} from 'react-rnd';

// import {routeMapsControlPointViewModal} from '../Modals/routeMapsControlPointsInfo';
import SplitPane from 'react-split-pane';
import {
	ArrowLeftOutlined,
	ArrowUpOutlined,
	ExclamationCircleTwoTone,
} from '@ant-design/icons';
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
	Custom,
} = classic;

/**
 *
 * @returns {JSX.object}
 * @desc RoteMaps component where you select choice connect with Drag'n'Drop field(package RnD)
 *
 */
export default function RouteMaps() {
	/**
	 * разъединить логику карты и Drag'n'Drop
	 */
	const [rndObject, setRndObject] = useState({
		image: '',
		controlPointsSelected: [],
		controlPointInRouteMaps: [],
		// controlPointsAll:[],
	});
	const {image, controlPointsSelected, controlPointInRouteMaps} = rndObject;
	console.log(controlPointInRouteMaps);
	/**
	 * СИТУАЦИИ:
	 * 1. Человек заходит на карту и на ней есть уже несколько КТ(не кликая на таблицу контрольных точек)
	 * 2. Человек заходит на карту и выбирает КТ(происходит ререндер- не приемлимо)
	 * 3. Человек выбирает иную карту, автоматически сохраняются предыдущие КТ и новые.
	 * 4. Человек хочет убрать КТ с карты
	 */

	return (
		<BasePage>
			<SplitPane
				className={'routeMaps'}
				split='vertical'
				minSize={400}
				maxSize={600}
				defaultSize={400}
			>
				<div className={'routeMapsConfig'}>
					<Form name={'routeMapsForm'}>
						<FormBody noPadding={false} scrollable={false}>
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
								style={{}}
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
											height: '1000px', //костыль
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
									<UploadFile />
								</Space>
								<Table
									itemProps={{name: 'routeMapsTable'}}
									infinityMode={true}
									defaultFilter={{routeId: null}}
									// onRowClick={({rowData}) => {
									//     console.log(rowData.fileName)
									// }}
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
									// editMode={true}
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
					<Form name={'routeMapsFormImage'}>
						<RouteMap />
					</Form>

					{/*<Custom*/}
					{/*	itemProps={{name: 'rndField'}}*/}
					{/*	render={({*/}
					{/*		value,*/}
					{/*		defaultValue,*/}
					{/*		onChange,*/}
					{/*		koordinate,*/}
					{/*	}) => {*/}
					{/*		return (*/}
					{/*			<>*/}
					{/*				{image ? (*/}
					{/*					<>*/}
					{/*						<img*/}
					{/*							src={`${image}`}*/}
					{/*							alt={`${image}`}*/}
					{/*							// width={'100%'}*/}
					{/*							// height={'100%'}*/}
					{/*						/>*/}
					{/*					</>*/}
					{/*				) : (*/}
					{/*					<Result*/}
					{/*						title='Выберите маршрутную карту'*/}
					{/*						extra={<ArrowLeftOutlined />}*/}
					{/*					/>*/}
					{/*				)}*/}
					{/*				{controlPointsSelected &&*/}
					{/*					controlPointsSelected.map(*/}
					{/*						(cpElement, index) => (*/}
					{/*							<>*/}
					{/*								<Rnd*/}
					{/*									key={`${index}-${cpElement.id}`}*/}
					{/*									bounds={*/}
					{/*										'.routeMapsContainer'*/}
					{/*									}*/}
					{/*									size={{*/}
					{/*										width: 32,*/}
					{/*										height: 32,*/}
					{/*									}}*/}
					{/*									style={{*/}
					{/*										display:*/}
					{/*											'inline-block!important',*/}
					{/*										margin: 20,*/}
					{/*										background:*/}
					{/*											'#b7e4c7',*/}
					{/*										borderRadius:*/}
					{/*											'0% 31% 100% 62% ',*/}
					{/*										textAlign: 'center',*/}
					{/*									}}*/}
					{/*									onDragStop={(e, d) => {*/}
					{/*										// сохранение новых координат*/}
					{/*										// setRndObject(state => {*/}
					{/*										//     return {...state,controlPointInRouteMaps:[...state.controlPointInRouteMaps,{...cpElement, xLocation:d.x, yLocation:d.y}]}*/}
					{/*										// })*/}
					{/*										console.log(*/}
					{/*											cpElement.controlPointName,*/}
					{/*											'koor X',*/}
					{/*											d.x,*/}
					{/*											'koor Y',*/}
					{/*											d.y*/}
					{/*										);*/}
					{/*									}}*/}
					{/*									default={{*/}
					{/*										x:*/}
					{/*											cpElement.xLocation,*/}
					{/*										y:*/}
					{/*											cpElement.yLocation,*/}
					{/*									}}*/}
					{/*								>*/}
					{/*									<div>*/}
					{/*										{*/}
					{/*											cpElement.controlPointName*/}
					{/*										}*/}
					{/*									</div>*/}
					{/*								</Rnd>*/}
					{/*							</>*/}
					{/*						)*/}
					{/*					)}*/}
					{/*			</>*/}
					{/*		);*/}
					{/*	}}*/}
					{/*	subscribe={[*/}
					{/*		{*/}
					{/*			name: 'getPicture',*/}
					{/*			path:*/}
					{/*				'rtd.routeMaps.mainForm.routeMapsTable.selected',*/}
					{/*			onChange: ({value, setSubscribeProps}) => {*/}
					{/*				// console.log(value);*/}
					{/*				value &&*/}
					{/*					setSubscribeProps &&*/}
					{/*					setSubscribeProps({*/}
					{/*						defaultValue: value,*/}
					{/*					});*/}
					{/*				value &&*/}
					{/*					setRndObject((state) => {*/}
					{/*						return {*/}
					{/*							...state,*/}
					{/*							image: value.fileUrl,*/}
					{/*							controlPointsAll: [],*/}
					{/*							controlPointsSelected: [],*/}
					{/*						};*/}
					{/*					});*/}
					{/*			},*/}
					{/*		},*/}
					{/*		{*/}
					{/*			name: 'getControlPoint',*/}
					{/*			path:*/}
					{/*				'rtd.routeMaps.mainForm.controlPointsTable.selected',*/}
					{/*			onChange: ({value, setSubscribeProps}) => {*/}
					{/*				// console.log(value);*/}
					{/*				// value &&*/}
					{/*				// setSubscribeProps &&*/}
					{/*				// setSubscribeProps({*/}
					{/*				//     koordinate:value,*/}
					{/*				// });*/}
					{/*				value &&*/}
					{/*					setRndObject((state) => {*/}
					{/*						return {*/}
					{/*							...state,*/}
					{/*							controlPointsSelected: [*/}
					{/*								...state.controlPointsSelected,*/}
					{/*								value,*/}
					{/*							],*/}
					{/*						};*/}
					{/*					});*/}
					{/*			},*/}
					{/*		},*/}
					{/*		// {*/}
					{/*		//     name: 'getArrayControlPoint',*/}
					{/*		//     path:*/}
					{/*		//         'rtd.routeMaps.mainForm.controlPointsTable.rows',*/}
					{/*		//     onChange: ({value, setSubscribeProps}) => {*/}
					{/*		//         // console.log(value);*/}
					{/*		//         // value &&*/}
					{/*		//         // setSubscribeProps &&*/}
					{/*		//         // setSubscribeProps({*/}
					{/*		//         //     koordinate:value,*/}
					{/*		//         // });*/}
					{/*		//         value && setRndObject(state=>{*/}
					{/*		//             return{...state,*/}
					{/*		//                 controlPointsAll:[...value]*/}
					{/*		//             }})*/}
					{/*		//     },*/}
					{/*		// },*/}
					{/*	]}*/}
					{/*/>*/}
				</div>
			</SplitPane>
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
