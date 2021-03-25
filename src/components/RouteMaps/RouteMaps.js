import React, {useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {Rnd} from 'react-rnd';
import {useHistory} from 'react-router';
import {routeMapsControlPointViewModal} from './Modals/routeMapsControlPointsInfo';
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
} = classic;
/**
 *
 * @returns {JSX.object}
 * @desc RoteMaps component where you select choice connect with Drag'n'Drop field(package RnD)
 */
export default function RouteMaps() {
	const [controlPointsRnd, setControlPointsRnd] = useState([]); // нужно подумать о найминге
	const history = useHistory();

	/**
	 * правильно разметить конфиги, дабы увидеть подгружаемые файлы из системы
	 * надо связать данные из public.route_maps  и public.files данных, запустить тестовые данные
	 */
	const routeMapTableFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Маршрутные карты',
				level: 5,
				className: 'mt-16',
			},
		},
		{
			componentType: 'Layout',
			className: 'mt-16 mb-8',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'FileManager',
						defaultFilter: {routeId: null},
						dispatchPath: 'routeMaps.routeMapsPage.routeMapsTable',
						subscribe: {
							name: 'routeMapsUploadTable',
							path:
								'rtd.routeMaps.routeMapsPage.routeMapsSelect.selected',
							onChange: ({value, setReloadTable}) =>
								value &&
								setReloadTable &&
								setReloadTable({
									filter: {
										routeId: value.id, // тут нужно поменять
									},
								}),
						},
						requestLoadConfig: apiGetConfigByName(
							'routeControlPoints' // для макета, нужно поменять
						),
						requestLoadRows: apiGetFlatDataByConfigName(
							'routeControlPoints' // для макета, нужно поменять
						),
					},
				},
			],
		},
	];

	/**
	 *  конфигурация получения данных routeControlPoints, от корректирована для реализации модального окна
	 */
	const controlPointsFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Контрольные точки',
				level: 5,
				className: 'mt-16',
			},
		},
		{
			componentType: 'Layout',
			className: 'mt-16 mb-8',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable',
						defaultFilter: {routeId: null},
						subscribe: {
							name: 'routeMapsUploadTable',
							path:
								'rtd.routeMaps.routeMapsPage.routeMapsSelect.selected',
							onChange: ({value, setReloadTable}) =>
								value &&
								setReloadTable &&
								setReloadTable({
									filter: {
										routeId: value.id,
									},
								}),
						},

						requestLoadConfig: apiGetConfigByName(
							'routeControlPoints'
						),
						requestLoadRows: apiGetFlatDataByConfigName(
							'routeControlPoints'
						),
						onRowClick: ({selected, rowData, rowIndex}) => {
							setControlPointsRnd((state) => [...state, rowData]);
						},
						modals: [routeMapsControlPointViewModal(history)],
					},
				},
			],
		},
	];
	const formConfig = {
		body: [...routeMapTableFields, ...controlPointsFields],
	};
	console.log(formConfig);

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
								level={2}
								label={
									<span
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											textAlign: 'center',
											height: '600px',
										}}
									>
										<ArrowUpOutlined />
										Выберите маршрут
										<ExclamationCircleTwoTone />
									</span>
								}
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
							/>
							<Layout>
								<Space className={'p-8'}>
									<UploadFile />
								</Space>
								<Table
									itemProps={{name: 'routeMapsTAble'}}
									infinityMode={true}
									requestLoadRows={apiGetFlatDataByConfigName(
										'routeMaps'
									)}
									requestLoadConfig={apiGetConfigByName(
										'routeMaps'
									)} //
									dispatchPath={
										'routeMaps.mainForm.routeMapsTable'
									}
									subscribe={
										[
											// {
											//     name: '1Hidden',
											//     path: 'rtd.routeMaps.mainForm.events.onSelectRoute',
											//     onChange: ({value, setSubscribeProps}) => {
											//         value && setSubscribeProps &&
											//         setSubscribeProps({
											//             disabled: value.value
											//         })
											//     }
											// }
										]
									}
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
					{controlPointsRnd &&
						controlPointsRnd.map((controlPoints) => (
							<>
								<Rnd
									key={controlPoints.id}
									size={{width: 32, height: 32}}
									bounds={'.routeMapsContainer'}
									style={{
										display: 'inline-block!important',
										margin: 20,
										background: '#b7e4c7',
										borderRadius:
											'69% 31% 100% 0% / 53% 55% 45% 47%',
									}} //над стилем нужно подумать
									onDragStop={(e, d) => {
										console.log(
											'koor X',
											d.x,
											'koor Y',
											d.y
										);
									}}
								>
									<div>{controlPoints.controlPointName}</div>
								</Rnd>
							</>
						))}
					<div className={'route-map'}></div>
				</div>
			</SplitPane>
		</BasePage>
	);
}
