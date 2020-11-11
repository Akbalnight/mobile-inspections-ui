import React, {useState} from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {Rnd} from 'react-rnd';
import {useHistory} from 'react-router';
import {routeMapsControlPointViewModal} from './Modals/routeMapsControlPointsInfo';

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
				requestLoadRows: apiGetHierarchicalDataByConfigName(
					'controlPoints' // 'routeMaps'
				),
				requestLoadDefault: apiGetFlatDataByConfigName('controlPoints'), // 'routeMaps'
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
						defaultFilter: {controlPointsId: null},
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								delete: {},
								up: {},
								down: {},
							},
						},
						// dispatchPath: 'routeMaps.routeMapsPage.routeMapsTable',
						// subscribe: {
						// 	name: 'routeMapsUploadTable',
						// 	path:
						// 		'rtd.routeMaps.routeMapsPage.routeMapsSelect.selected',
						// 	onChange: ({value, setReloadTable}) =>
						// 		value &&
						// 		setReloadTable &&
						// 		setReloadTable({
						// 			filter: {
						// 				controlPointsId: value.id,// тут нужно поменять
						// 			},
						// 		}),
						// },
						requestLoadConfig: apiGetConfigByName(
							'controlPoints' // для макета, нужно поменять
						),
						requestLoadRows: apiGetFlatDataByConfigName(
							'controlPoints' // для макета, нужно поменять
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
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable',
						// subscribe: {
						// 	name: 'routeMapsUploadTable',
						// 	path:
						// 		'rtd.routeMaps.routeMapsPage.routeMapsSelect.selected',
						// 	onChange: ({value, setReloadTable}) =>
						// 		value &&
						// 		setReloadTable &&
						// 		setReloadTable({
						// 			filter: {
						// 				controlPointsId: value.id,// тут нужно поменять
						// 			},
						// 		}),
						// },
						requestLoadConfig: apiGetConfigByName(
							'controlPoints' // для макета, нужно поменять
						),
						requestLoadRows: ({data, params}) =>
							apiGetFlatDataByConfigName('controlPoints')({
								data: {
									...data,
									isGroup: false,
								},
								params,
							}), // для макета, нужно поменять
						onRowClick: ({selected, rowData, rowIndex}) => {
							setControlPointsRnd((state) => [...state, rowData]);
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

	return (
		<BasePage>
			<div style={{width: '30%', height: '100%'}}>
				<Form {...formConfig} />
			</div>
			<div style={{width: '70%', height: '100%', background: 'yellow'}}>
				{controlPointsRnd &&
					controlPointsRnd.map((controlPoints) => (
						<>
							<Rnd
								key={controlPoints.id}
								bounds={'parent'}
								style={{
									display: 'inline-block!important',
									width: 15,
									height: 15,
									margin: 20,
									background: 'red',
									borderRadius:
										'69% 31% 100% 0% / 53% 55% 45% 47%',
								}} //над стилем нужно подумать
								onDragStop={(e, d) => {
									console.log('koor X', d.x);
									console.log('koor Y', d.y);
								}}
							>
								<div>{controlPoints.name}</div>
							</Rnd>
						</>
					))}
			</div>
		</BasePage>
	);
}
