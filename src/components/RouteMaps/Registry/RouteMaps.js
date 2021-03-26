import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {Rnd} from 'react-rnd';

// import {routeMapsControlPointViewModal} from '../Modals/routeMapsControlPointsInfo';
import SplitPane from 'react-split-pane';
import {ArrowUpOutlined, ExclamationCircleTwoTone} from '@ant-design/icons';

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
 * public.route_maps.id.route_map_id/public.files.id.file_id
 */
export default function RouteMaps() {
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

	return (
		<BasePage>
			<SplitPane
				className={'routeMaps'}
				split='vertical'
				minSize={400}
				maxSize={600}
				defaultSize={500}
			>
				<div className={'routeMapsConfig'}>
					<Form itemProps={{name: 'routeMapsForm'}}>
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
									defaultFilter={{routeId: null}}
									requestLoadRows={apiGetFlatDataByConfigName(
										'routeControlPoints'
									)}
									requestLoadConfig={apiGetConfigByName(
										'routeControlPoints'
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
					<Custom
						itemProps={{name: 'imageField'}}
						render={({
							value,
							defaultValue,
							onChange,
							koordinate,
						}) => {
							console.log(
								'1',
								defaultValue,
								'2',
								value,
								'3',
								koordinate
							);
							return (
								<>
									{defaultValue === undefined ? (
										<ExclamationCircleTwoTone />
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
											defaultValue &&
											defaultValue.xLocation
										}
										// size={{width: 32, height: 32}}
										bounds={'.routeMapsContainer'}
										style={{
											display: 'inline-block!important',
											margin: 20,
											background: '#b7e4c7',
											borderRadius:
												'69% 31% 100% 0% / 53% 55% 45% 47%',
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
											width: 15,
											height: 15,
										}}
									>
										<div>
											{koordinate && koordinate.xLocation}
										</div>
									</Rnd>
								</>
							);
						}}
						subscribe={[
							{
								name: 'getPicture',
								path:
									'rtd.routeMaps.mainForm.routeMapsTable.selected',
								onChange: ({value, setSubscribeProps}) => {
									console.log(value);
									value &&
										setSubscribeProps &&
										setSubscribeProps({
											defaultValue: value,
										});
								},
							},
							{
								name: 'getControlPoint',
								path:
									'rtd.routeMaps.mainForm.controlPointsTable.selected',
								onChange: ({value, setSubscribeProps}) => {
									console.log(value);
									value &&
										setSubscribeProps &&
										setSubscribeProps({
											koordinate: value,
										});
								},
							},
						]}
					/>

					{/*{controlPointsRnd &&*/}
					{/*controlPointsRnd.map((controlPoints) => (*/}
					{/*    <>*/}
					{/*        <Rnd*/}
					{/*            key={controlPoints.id}*/}
					{/*            size={{width: 32, height: 32}}*/}
					{/*            bounds={'.routeMapsContainer'}*/}
					{/*            style={{*/}
					{/*                display: 'inline-block!important',*/}
					{/*                margin: 20,*/}
					{/*                background: '#b7e4c7',*/}
					{/*                borderRadius:*/}
					{/*                    '69% 31% 100% 0% / 53% 55% 45% 47%',*/}
					{/*            }} //над стилем нужно подумать*/}
					{/*            onDragStop={(e, d) => {*/}
					{/*                console.log(*/}
					{/*                    'koor X',*/}
					{/*                    d.x,*/}
					{/*                    'koor Y',*/}
					{/*                    d.y*/}
					{/*                );*/}
					{/*            }}*/}
					{/*        >*/}
					{/*            /!*<div>{value && value.controlPointName}</div>*!/*/}
					{/*        </Rnd>*/}
					{/*    </>*/}
					{/*))}*/}
				</div>
			</SplitPane>
		</BasePage>
	);
}
