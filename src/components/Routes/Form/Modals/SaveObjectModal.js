import {classic, notificationError} from 'rt-design';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../../apis/catalog.api';

export const AddControlPointToRoute = () => OperationOnLocal('add');
export const EditControlPointToRoute = () => OperationOnLocal('edit');

const {
	Modal,
	FormBody,
	Select,
	Table,
	Layout,
	Title,
	TreeSelect,
	Input,
	Text,
} = classic;
/**
 *
 * @param type- string
 * @returns {JSX.object}
 * @desc function change row in RouteForm.js controlPointTable
 */
const OperationOnLocal = (type) => {
	const [cPointId, setCPointId] = useState();

	let sRow;
	const toCapitalize = type[0].toUpperCase() + type.substring(1);

	const loadData = (callBack, row) => {
		sRow = {...row};
		callBack(type === 'add' ? null : sRow);
	};
	const loadControlPointsEquipments = ({params, data}) => {
		let newData = {...data};
		if (type === 'edit')
			newData.controlPointId = sRow ? sRow.controlPointId : null;
		return apiGetFlatDataByConfigName('controlPointsEquipments')({
			params,
			data: newData,
		});
	};

	const loadControlPointsTechOperations = ({params, data}) => {
		let newData = {...data};
		if (type === 'edit') {
			// && newData.techMapId === undefined
			newData.techMapId = sRow ? sRow.techMapId : null;
		}
		return apiGetFlatDataByConfigName('techOperationsSmall')({
			params,
			data: newData,
		});
	};
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type !== 'add',
			}}
			toolTipProps={{
				title: type === 'add' ? 'Создать' : 'Редактировать',
			}}
			modalConfig={{
				type: `${type}OnLocal`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} контрольной точки`,
				width: 800,
				bodyStyle: {height: 700},
				form: {
					name: `${type}ModalForm`,
					className: 'lastSelectModal',
					loadInitData: loadData,
				},
			}}
			subscribe={[
				{
					name: `${type}ControlPointModal`,
					path:
						'rtd.routes.routeForm.controlPointsTable.table.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
						// console.log(value)
						value && setModalData && setModalData(value);
						type === 'edit' &&
							value &&
							setButtonProps &&
							setButtonProps({
								disabled: !value,
							});
					},
				},
			]}
			dispatch={{
				path: `routes.routeForm.controlPointsTable.modal.events.on${toCapitalize}Row`,
				type: 'event',
			}}
		>
			<FormBody>
				<TreeSelect
					itemProps={{name: 'controlPointId'}}
					treeCheckStrictly={false}
					treeDefaultExpandAll={true}
					autoClearSearchValue={true}
					filterOption={false}
					showSearch={true}
					searchParamName={'name'}
					requestLoadRows={apiGetHierarchicalDataByConfigName(
						'controlPoints'
					)}
					optionConverter={(option) => ({
						value: option.id,
						label: option.name,
						children: option.children,
					})}
					dispatch={{
						path:
							'routes.routeForm.controlPointsTable.modal.controlPointSelect',
					}}
				/>
				<Title level={5} label={'Оборудование'} className={'my-16'} />
				<Layout>
					<Table
						itemProps={{name: 'equipments'}}
						selectable={true}
						defaultFilter={{controlPointId: null}}
						requestLoadRows={loadControlPointsEquipments}
						subscribe={[
							{
								name: 'controlPointEquipments',
								path:
									'rtd.routes.routeForm.controlPointsTable.modal.controlPointSelect',
								onChange: ({value, reloadTable}) => {
									value &&
										reloadTable &&
										reloadTable({
											filter: {
												controlPointId: value,
												// ? value.id
												// : value,
											},
										});
									value && setCPointId(value);
								},
							},
						]}
						requestLoadConfig={apiGetConfigByName(
							'controlPointsEquipments'
						)}
						footerProps={{
							height: 50,
							showElements: ['selected', 'total'],
						}}
					/>
				</Layout>
				<Title
					level={5}
					label={'Технологическая карта'}
					className={'my-16'}
				/>
				<Select
					itemProps={{name: 'techMapId'}}
					defaultFilter={{
						controlPointId: cPointId ? cPointId : null,
					}}
					requestLoadRows={apiGetFlatDataByConfigName('techMapsByCP')}
					// requestLoadRows={({data, params}) =>
					//     apiGetFlatDataByConfigName('techMapsByCP')({
					//         data: {
					//             ...data,
					//             controlPointId: cPointId? cPointId: null,
					//         },
					//         params,
					//     })}
					optionConverter={(option) => ({
						value: option.id,
						label: option.name,
					})}
					dispatch={{
						path:
							'routes.routeForm.controlPointsTable.modal.techMapSelect',
					}}
					subscribe={[
						{
							name: 'controlPointTechMaps',
							// withMount: true,
							path:
								'rtd.routes.routeForm.controlPointsTable.modal.controlPointSelect',
							onChange: ({value, setSubscribeProps}) => {
								value &&
									setSubscribeProps &&
									setSubscribeProps({
										filter: {
											controlPointId: value,
										},
									});
							},
						},
					]}
				/>
				<Title
					level={5}
					label={'Технологическая операция'}
					className={'my-16'}
				/>
				<Layout>
					<Table
						itemProps={{name: 'techOperations'}}
						defaultFilter={{techMapId: null}}
						requestLoadRows={loadControlPointsTechOperations}
						requestLoadConfig={apiGetConfigByName(
							'techOperationsSmall'
						)}
						dispatch={{
							path:
								'routes.routeForm.controlPointsTable.modal.techOperationTable',
						}}
						subscribe={[
							{
								name: 'controlPointTechMaps',
								path:
									'rtd.routes.routeForm.controlPointsTable.modal.techMapSelect',
								onChange: ({value, reloadTable}) => {
									value &&
										reloadTable &&
										reloadTable({
											filter: {
												techMapId: value,
											},
										});
								},
							},
						]}
						footerProps={{
							height: 50,
							rightCustomSideElement: () => (
								<>
									<Text
										label={
											'Продолжительность всех операций, мин:'
										}
										className={'mr-8'}
									/>
									<Text
										itemProps={{name: 'duration'}}
										subscribe={[
											{
												name: 'techMapTechOperation',
												path:
													'rtd.routes.routeForm.controlPointsTable.modal.techOperationTable.rows',
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													const totalDuration = value.reduce(
														(total, item) =>
															total +
															item.duration,
														0
													);
													setSubscribeProps({
														value: totalDuration,
														// label: `Продолжительность всех операций: ${totalDuration}`,
													});
												},
											},
										]}
									/>
								</>
							),
						}}
					/>
				</Layout>
				<Input
					itemProps={{name: 'controlPointName', hidden: true}}
					subscribe={[
						{
							name: 'takeANameCP',
							path:
								'rtd.routes.routeForm.controlPointsTable.modal.controlPointSelect',
							onChange: ({value, setSubscribeProps}) => {
								value &&
									apiGetFlatDataByConfigName('controlPoints')(
										{
											data: {id: value},
											params: {},
										}
									)
										.then((response) => {
											setSubscribeProps({
												value: response.data[0].name,
											});
										})
										.catch((error) =>
											notificationError(
												error,
												'Ошибка загрузки данных формы'
											)
										);
							},
						},
					]}
				/>
				<Input
					itemProps={{name: 'techMapName', hidden: true}}
					subscribe={[
						{
							name: 'takeANameTM',
							path:
								'rtd.routes.routeForm.controlPointsTable.modal.techMapSelect',
							onChange: ({value, setSubscribeProps}) => {
								value &&
									apiGetFlatDataByConfigName('techMaps')({
										data: {id: value},
										params: {},
									})
										.then((response) => {
											setSubscribeProps({
												value: response.data[0].name,
											});
										})
										.catch((error) =>
											notificationError(
												error,
												'Ошибка загрузки данных формы'
											)
										);
							},
						},
					]}
				/>
			</FormBody>
		</Modal>
	);
};
