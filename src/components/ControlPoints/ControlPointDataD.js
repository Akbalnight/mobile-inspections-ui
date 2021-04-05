import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	// Form,
	notificationError,
} from 'rt-design';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveControlPoints,
} from '../../apis/catalog.api';
import {useHistory, useParams} from 'react-router';
import {paths} from '../../constants/paths';
import {PlusOutlined, DeleteOutlined} from '@ant-design/icons';
// import {selectRowsById} from "../Base/Functions/TableSelectById";

const {
	Form,
	FormHeader,
	FormBody,
	FormFooter,
	Input,
	// Select,
	InputNumber,
	Title,
	TreeSelect,
	Button,
	Table,
	// Divider,
	Row,
	Col,
	Modal,
	Layout,
	Space,
	Search,
} = classic;

export const ControlPointAdd = () => {
	return (
		<BasePage>
			<ControlPointDataD />
		</BasePage>
	);
};

export const ControlPointEdit = () => {
	const pageParams = useParams();
	return (
		<BasePage>
			<ControlPointDataD controlPointId={pageParams.id} />
		</BasePage>
	);
};

// const ControlPointDataJSX = (props) =>{
// 	const {controlPointId} = props;
// 	// const pageParams = useParams();
// 	const history = useHistory();
//
// }
const ControlPointDataD = (props) => {
	const {controlPointId} = props;
	// const pageParams = useParams();
	const history = useHistory();

	const loadData = (callBack) => {
		if (controlPointId) {
			apiGetFlatDataByConfigName('controlPoints')({
				data: {id: controlPointId},
			})
				.then((response) => {
					callBack(response.data[0]);
				})
				.catch((error) =>
					notificationError(error, 'Ошибка загрузки данных формы')
				);
		} else {
			callBack({
				code: null,
				name: null,
				parentId: null,
				equipments: [],
				techMaps: [],
				isGroup: false,
			});
		}
	};

	/** Функция-очиститель для табличных данных */
	const loadRowsHandler = (catalogName) => ({params, data}) => {
		if (controlPointId) {
			// console.log('controlPointId', controlPointId);
			const newData = {...data, controlPointId: controlPointId};
			// return apiGetHierarchicalDataByConfigName (catalogName)({
			// console.log('catalogName', catalogName);
			return apiGetFlatDataByConfigName(catalogName)({
				data: newData,
				params,
			});
		} else {
			// console.log('controlPointId not transferred');
			return new Promise((resolve) => resolve({data: []}));
		}
	};

	const onFinish = (values) => {
		history.push(paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path);
	};
	//
	// const onFinishFailed = errorInfo => {
	//     console.log('Failed:', errorInfo);
	// };

	// const formConfig = {
	//     // name: 'PageFormData',
	//     labelCol: {span: 8},
	//     wrapperCol: {span: 16},
	//     loadInitData: loadData,
	//     requestSaveForm: apiSaveControlPoints,
	//     methodSaveForm: controlPointId ? 'PUT' : 'POST',
	//     onFinish: onFinish,
	//     header: [
	//         {
	//             componentType: 'Item',
	//             child: {
	//                 componentType: 'Title',
	//                 label: controlPointId
	//                     ? `Редактирование контрольной точки`
	//                     : `Создание контрольной точки`,
	//                 className: 'mb-0',
	//                 level: 3,
	//             },
	//         },
	//     ],
	//     body: [...headFields, ...equipmentTableConfig, ...techMaps],
	//     footer: [
	//         {
	//             componentType: 'Item',
	//             child: {
	//                 componentType: 'Button',
	//                 label: 'Закрыть',
	//                 className: 'mr-8',
	//                 onClick: () => history.goBack(),
	//             },
	//         },
	//         {
	//             componentType: 'Item',
	//             child: {
	//                 componentType: 'Button',
	//                 label: 'Сохранить',
	//                 type: 'primary',
	//                 htmlType: 'submit',
	//             },
	//         },
	//     ],
	// };

	// return (
	// 	<BasePage
	// 		path={
	// 			pageParams.id === 'new'
	// 				? '/detours-configurator/control-points/new'
	// 				: undefined
	// 		}
	// 	>
	// 		<Form {...formConfig} />
	// 	</BasePage>
	// );
	// return <Form {...formConfig} />;
	return (
		<Form
			name={'controlPointForm'}
			loadInitData={loadData}
			requestSaveForm={apiSaveControlPoints}
			methodSaveForm={controlPointId ? 'PUT' : 'POST'}
			onFinish={onFinish}
			labelCol={{span: 8}}
			wrapperCol={{span: 14}}
		>
			<FormHeader>
				<Title level={3}>
					{controlPointId
						? `Редактирование контрольной точки`
						: `Создание контрольной точки`}
				</Title>
			</FormHeader>
			<FormBody>
				<Title level={5}>Описание</Title>
				<Row>
					<Col span={12}>
						{controlPointId ? (
							<InputNumber
								itemProps={{
									name: 'code',
									label: 'Код',
									rules: [
										{
											message: 'Заполните код',
											required: true,
										},
									],
								}}
							/>
						) : null}
						<Input
							itemProps={{
								name: 'name',
								label: 'Наименование',
								rules: [
									{
										message: 'Заполните наименование',
										required: true,
									},
								],
							}}
						/>
						<TreeSelect
							itemProps={{name: 'parentId', label: 'Группа'}}
							allowClear={true}
							optionConverter={(option) => {
								return {
									label: option.name,
									value: option.id,
									children: option.children,
								};
							}}
							requestLoadRows={({data, params}) =>
								apiGetHierarchicalDataByConfigName(
									'controlPoints'
								)({
									data: {...data, isGroup: true},
									params,
								})
							}
						/>
					</Col>
				</Row>

				<Layout className={'mb-16'}>
					<Title level={5}>Оборудование</Title>
					<Space className={'mb-8'}>
						<Modal
							toolTipProps={{title: 'Добавить'}}
							buttonProps={{
								type: 'default',
								icon: <PlusOutlined />,
							}}
							modalConfig={{
								width: 750,
								bodyStyle: {height: 650},
								type: 'select',
								title: `Добавить оборудование`,
								form: {
									name: 'addModalEquipment',
									labelCol: {span: 10},
									wrapperCol: {span: 12},
								},
							}}
							dispatch={{
								path:
									'catalog.controlPoints.equipments.addModal.onSave',
								type: 'event',
							}}
						>
							<FormBody>
								<Search
									dispatch={{
										path:
											'catalog.controlPoints.equipments.addModal.onSearch',
									}}
								/>
								<Table
									itemProps={{name: 'equipmentsModalTable'}}
									selectable={true}
									requestLoadRows={apiGetHierarchicalDataByConfigName(
										'equipments'
									)}
									requestLoadConfig={apiGetConfigByName(
										'equipments'
									)}
									fixWidthColumn={true}
									subscribe={[
										{
											name: 'onSearch',
											path:
												'rtd.catalog.controlPoints.equipments.addModal.onSearch',
											onChange: ({
												value,
												reloadTable,
											}) => {
												reloadTable({
													filter: {name: value},
												});
											},
										},
									]}
									dispatchPath={
										'catalog.controlPoints.equipments.addModal.table'
									}
								/>
							</FormBody>
						</Modal>
						<Button
							itemProps={{
								name: 'btnControlPointsEquipmentDelete',
							}}
							icon={<DeleteOutlined />}
							type={'default'}
							disabled={true}
							dispatch={{
								path:
									'catalog.controlPoints.equipments.btnDelete.events',
								type: 'event',
							}}
							subscribe={[
								{
									name:
										'onControlPointsTableEquipmentsSelect',
									path:
										'rtd.catalog.controlPoints.equipments.table.selected',
									onChange: ({value, setSubscribeProps}) => {
										value
											? setSubscribeProps({
													disabled: false,
											  })
											: setSubscribeProps({
													disabled: true,
											  });
									},
								},
							]}
						/>
					</Space>
					<Table
						itemProps={{name: 'equipments'}}
						rowKey={'equipmentId'}
						customFields={[
							{
								name: 'equipmentId',
								value: (row) => row.id,
								validate: (row, rows) => {
									// console.log('row eq selected:', row)
									return !row.isGroup
										? !rows
												.map((row) => row.equipmentId)
												.includes(row.id)
										: false;
								},
							},
							{
								name: 'id',
								value: () => null,
							},
							{
								name: 'controlPointId',
								value: () => controlPointId,
							},
							{
								name: 'equipmentName',
								value: (row) => row.name,
							},
						]}
						requestLoadRows={loadRowsHandler(
							'controlPointsEquipments'
						)}
						requestLoadConfig={apiGetConfigByName(
							'controlPointsEquipments'
						)}
						dispatchPath={'catalog.controlPoints.equipments.table'}
						subscribe={[
							{
								name: 'onEquipmentsLocalAdd',
								path:
									'rtd.catalog.controlPoints.equipments.addModal.onSave',
								extraData:
									'rtd.catalog.controlPoints.equipments.addModal.table.selected',
								onChange: ({extraData, addRows}) => {
									addRows(extraData);
								},
							},
							{
								name: 'onEquipmentsLocalDelete',
								path:
									'rtd.catalog.controlPoints.equipments.btnDelete.events',

								onChange: ({removeRow}) => {
									removeRow();
								},
							},
						]}
					/>
				</Layout>

				<Layout className={'mb-16'}>
					<Title level={5}>Технологические карты</Title>
					<Space className={'mb-8'}>
						<Modal
							toolTipProps={{title: 'Добавить'}}
							buttonProps={{
								type: 'default',
								icon: <PlusOutlined />,
							}}
							modalConfig={{
								width: 700,
								bodyStyle: {height: 650},
								type: 'select',
								title: `Добавить техкарту`,
								form: {
									name: 'addModalTechMaps',
									labelCol: {span: 10},
									wrapperCol: {span: 12},
								},
							}}
							dispatch={{
								path:
									'catalog.controlPoints.techMaps.addModal.onSave',
								type: 'event',
							}}
						>
							<FormBody>
								<Row justify={'end'}>
									<Col span={12}>
										<Search
											dispatch={{
												path:
													'catalog.controlPoints.techMaps.addModal.onSearch',
											}}
											className={'mb-8'}
										/>
									</Col>
								</Row>

								<Table
									itemProps={{name: 'techMapsModalTable'}}
									requestLoadRows={apiGetHierarchicalDataByConfigName(
										'techMaps'
									)}
									requestLoadConfig={apiGetConfigByName(
										'techMaps'
									)}
									subscribe={[
										{
											name: 'onSearch',
											path:
												'rtd.catalog.controlPoints.techMaps.addModal.onSearch',
											onChange: ({
												value,
												reloadTable,
											}) => {
												reloadTable({
													filter: {name: value},
												});
											},
										},
									]}
									dispatchPath={
										'catalog.controlPoints.techMaps.addModal.table'
									}
								/>
								<Table
									itemProps={{name: 'techOperations'}}
									requestLoadRows={apiGetFlatDataByConfigName(
										'techOperationsSmall'
									)}
									requestLoadConfig={apiGetConfigByName(
										'techOperationsSmall'
									)}
									defaultFilter={{techMapId: null}}
									subscribe={[
										{
											name: 'onTechMapSelect',
											path:
												'rtd.catalog.controlPoints.techMaps.addModal.table.selected',
											onChange: ({
												value,
												reloadTable,
											}) => {
												value &&
													!value.isGroup &&
													reloadTable({
														filter: {
															techMapId: value.id,
														},
													});
											},
										},
									]}
								/>
							</FormBody>
						</Modal>
						<Button
							itemProps={{name: 'btnControlPointsTechMapsDelete'}}
							icon={<DeleteOutlined />}
							type={'default'}
							disabled={true}
							dispatch={{
								path:
									'catalog.controlPoints.techMaps.btnDelete.events',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'onControlPointsTableTechMapsSelect',
									path:
										'rtd.catalog.controlPoints.techMaps.table.selected',
									onChange: ({value, setSubscribeProps}) => {
										value
											? setSubscribeProps({
													disabled: false,
											  })
											: setSubscribeProps({
													disabled: true,
											  });
									},
								},
							]}
						/>
					</Space>
					<Table
						itemProps={{name: 'techMaps'}}
						rowKey={'techMapId'}
						customFields={[
							{
								name: 'techMapId',
								value: (row) => row.id,
								validate: (row, rows) => {
									// console.log('row tech maps selected:', row)
									return !row.isGroup
										? !rows
												.map((row) => row.techMapId)
												.includes(row.id)
										: false;
								},
							},
							{
								name: 'id',
								value: () => null,
							},
							{
								name: 'controlPointId',
								value: () => controlPointId,
							},
						]}
						requestLoadRows={loadRowsHandler(
							'controlPointsTechMaps'
						)}
						requestLoadConfig={apiGetConfigByName(
							'controlPointsTechMaps'
						)}
						dispatchPath={'catalog.controlPoints.techMaps.table'}
						subscribe={[
							{
								name: 'onTechMapsLocalAdd',
								path:
									'rtd.catalog.controlPoints.techMaps.addModal.onSave',
								extraData:
									'rtd.catalog.controlPoints.techMaps.addModal.table.selected',
								// addRow не поддерживает валидацию, потому использован addRows
								onChange: ({extraData, addRows}) => {
									// console.log('techMap selected:', extraData);
									addRows([extraData]);
								},
							},
							{
								name: 'onTechMapsLocalDelete',
								path:
									'rtd.catalog.controlPoints.techMaps.btnDelete.events',

								onChange: ({removeRow}) => {
									removeRow();
								},
							},
						]}
					/>
				</Layout>
			</FormBody>
			<FormFooter>
				<Button className={'mr-8'} onClick={() => history.goBack()}>
					Закрыть
				</Button>
				<Button type={'primary'} htmlType={'submit'}>
					Сохранить
				</Button>
			</FormFooter>
		</Form>
	);
};
