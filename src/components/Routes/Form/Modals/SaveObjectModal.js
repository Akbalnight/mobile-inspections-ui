import {
	Modal,
	FormBody,
	Select,
	Table,
	Layout,
	Title,
	TreeSelect,
	Input,
	Text,
	notificationError,
} from 'rt-design';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import React from 'react';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../../apis/catalog.api';

export const AddControlPointToRoute = () => operationOnLocal('add');
export const EditControlPointToRoute = () => operationOnLocal('edit');

/**
 *
 * @param type- string
 * @returns {JSX.object}
 * @desc function change row in RouteForm.js controlPointTable
 */
const operationOnLocal = (type) => {
	let sRow;

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
		if (type === 'edit' && newData.techMapId === undefined) {
			// && newData.techMapId === undefined
			newData.techMapId = sRow ? sRow.techMapId : null;
		}
		return apiGetFlatDataByConfigName('techOperationsSmall')({
			params,
			data: newData,
		});
	};

	const processBeforeSaveForm = (rawValues) => {
		return {
			id: rawValues.controlPointId,
			...rawValues,
		};
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
				type: `save`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} контрольной точки`,
				width: 800,
				bodyStyle: {height: 700},
				form: {
					name: `${type}ModalForm`,
					className: 'lastSelectModal',
					loadInitData: loadData,
					processBeforeSaveForm,
				},
			}}
			subscribe={[
				{
					name: `${type}ControlPointModal`,
					path: 'rtd.routes.form.controlPointsTable.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
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
				path: `routes.form.controlPointsTable.events.${type}OnModal`,
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
						path: 'routes.form.controlPointsTable.data.controlPointSelect',
					}}
				/>
				<Title level={5} label={'Оборудование'} className={'my-16'} />
				<Layout>
					{/*при включении type={'rt'} начинает падать с ошибкой в функции getTableRowKeys в RT-design*/}
					<Table
						itemProps={{name: 'equipments'}}
						// type={'rt'}
						selectable={true}
						defaultFilter={{controlPointId: null}}
						requestLoadRows={loadControlPointsEquipments}
						subscribe={[
							{
								name: 'controlPointEquipments',
								path: 'rtd.routes.form.controlPointsTable.data.controlPointSelect',
								onChange: ({value, reloadTable}) => {
									value &&
										reloadTable &&
										reloadTable({
											filter: {
												controlPointId: value,
											},
										});
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
					requestLoadRows={apiGetFlatDataByConfigName('techMapsByCP')}
					optionConverter={(option) => ({
						value: option.id,
						label: option.name,
					})}
					dispatch={{
						path: 'routes.form.controlPointsTable.data.techMapSelect',
					}}
					subscribe={[
						/** Эта подписка не работает, фильтр обновляется по requestLoadRows*/
						{
							name: 'controlPointTechMaps',
							// withMount: true,
							path: 'rtd.routes.form.controlPointsTable.data.controlPointSelect',
							onChange: ({value, setSubscribeProps}) => {
								// console.log('1111',value)
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
							path: 'routes.form.controlPointsTable.data.table',
						}}
						subscribe={[
							{
								name: 'controlPointTechMaps',
								path: 'rtd.routes.form.controlPointsTable.data.techMapSelect',
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
												path: 'rtd.routes.form.controlPointsTable.data.table.rows',
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													const totalDuration =
														value?.reduce(
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
							path: 'rtd.routes.form.controlPointsTable.data.controlPointSelect',
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
							path: 'rtd.routes.form.controlPointsTable.data.techMapSelect',
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
