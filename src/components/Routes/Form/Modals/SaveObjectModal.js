import {classic, notificationError} from 'rt-design';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import React from 'react';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../../apis/catalog.api';

export const AddControlPointToRoute = () => operationOnLocal('add');
export const EditControlPointToRoute = () => operationOnLocal('edit');

const {
	Modal,
	FormBody,
	Select,
	Table,
	Layout,
	Title,
	TreeSelect,
	Input,
} = classic;
const operationOnLocal = (type) => {
	let sRow;
	const loadData = (callBack, row) => {
		sRow = {...row};
		// if (sRow.jsonEquipments) sRow.equipments = JSON.parse(sRow.jsonEquipments);
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
						type: 'event',
					}}
				/>
				<Title level={5} label={'Оборудование'} />
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
									'rtd.routes.routeForm.controlPointsTable.modal.controlPointSelect.selected',
								onChange: ({value, setReloadTable}) => {
									console.log('>>>>>>>>', value);
									value &&
										setReloadTable &&
										setReloadTable({
											filter: {
												controlPointId: value,
											},
										});
									// value && setCPointId(value.id);
								},
							},
						]}
						requestLoadConfig={apiGetConfigByName(
							'controlPointsEquipments'
						)}
					/>
				</Layout>
				<Select
					requestLoadRows={apiGetFlatDataByConfigName('techMaps')}
					optionConverter={(option) => ({
						value: option.id,
						label: option.name,
						children: option.children,
					})}
				/>
				<Input
					itemProps={{name: 'controlPointName', hidden: true}}
					subscribe={[
						{
							name: 'takeAName',
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
			</FormBody>
		</Modal>
	);
};
