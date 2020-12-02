import React, {useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {Rnd} from 'react-rnd';
import {useHistory} from 'react-router';
import {routeMapsControlPointViewModal} from './Modals/routeMapsControlPointsInfo';
import {Col, Row} from 'antd';

export default function RouteMaps() {
	const [controlPointsRnd, setControlPointsRnd] = useState([]); // нужно подумать о найминге
	const history = useHistory();
	const headFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'SingleSelect',
				commandPanelProps: {
					systemBtnProps: {search: {}},
				},
				searchParamName: 'name',
				widthControl: 0,
				expandColumnKey: 'id',
				rowRender: 'name',
				expandDefaultAll: true,
				dispatchPath: 'routeMaps.routeMapsPage.routeMapsSelect',
				requestLoadRows: apiGetFlatDataByConfigName('routes'),
				requestLoadDefault: apiGetConfigByName('routes'),
			},
		},
	];
	const routeMapTableFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Маршрутные карты',
				level: 5,
				style: {
					marginTop: 30,
					marginBottom: 15,
				},
			},
		},
		{
			componentType: 'Layout',
			className: 'mb-16',
			children: [
				//тут будет стоять новый эелемент для прогрузки файлов систему
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable',
						defaultFilter: {routeId: null},
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								delete: {},
								up: {},
								down: {},
							},
						},
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

	const controlPointsFields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Контрольные точки',
				level: 5,
				style: {
					marginTop: 30,
					marginBottom: 15,
				},
			},
		},
		{
			componentType: 'Layout',
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
										routeId: value.id, // тут нужно поменять
									},
								}),
						},

						requestLoadConfig: apiGetConfigByName(
							'routeControlPoints' // для макета, нужно поменять
						),
						requestLoadRows: apiGetFlatDataByConfigName(
							'routeControlPoints'
						), // для макета, нужно поменять
						onRowClick: ({selected, rowData, rowIndex}) => {
							// console.log(rowData);
							setControlPointsRnd((state) => [...state, rowData]); // когда будет окончательная настройка, нужно просмотреть что приходит в rowData
						},
						modals: [routeMapsControlPointViewModal()],
					},
				},
			],
		},
	];
	const formConfig = {
		noPadding: false,
		name: 'routeMaps',
		body: [...headFields, ...routeMapTableFields, ...controlPointsFields],
		footer: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Закрыть',
					className: 'mr-8',
					onClick: () => {
						history.goBack();
					},
				},
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Сохранить',
					type: 'primary',
					htmlType: 'submit',
				},
			},
		],
	};

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
			<Row style={{width: '100%', flex: 'auto'}}>
				<Col span={8}>
					<Form {...formConfig} />
				</Col>
				<Col span={16} className={'col-route-map'}>
					<div className={'route-map'}>
						{controlPointsRnd &&
							controlPointsRnd.map((controlPoints) => (
								<>
									<Rnd
										key={controlPoints.id}
										size={{width: 32, height: 32}}
										bounds={'.route-map'}
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
										<div>
											{controlPoints.controlPointName}
										</div>
									</Rnd>
								</>
							))}
					</div>
				</Col>
			</Row>
		</BasePage>
	);
}
