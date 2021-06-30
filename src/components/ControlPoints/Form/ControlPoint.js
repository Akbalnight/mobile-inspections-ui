import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	Form,
	FormHeader,
	FormBody,
	FormFooter,
	Input,
	Title,
	TreeSelect,
	Button,
	Table,
	Row,
	Col,
	Layout,
	Space,
	notificationError,
} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveControlPoints,
} from '../../../apis/catalog.api';
import {useHistory, useParams} from 'react-router';
import {paths} from '../../../constants/paths';
import {DeleteOutlined} from '@ant-design/icons';
import {selectRowsById} from '../../Base/Functions/TableSelectById';
import {EquipmentAddModal} from './Modals/EquipmentSaveObject';
import {equipmentTableCustom, techMapsTableCustom} from '../tableProps';
import {TechMapAddModal} from './Modals/TechMapSaveObject';

export const ControlPointAdd = () => {
	return (
		<BasePage>
			<ControlPoint />
		</BasePage>
	);
};

export const ControlPointEdit = () => {
	const pageParams = useParams();
	return (
		<BasePage>
			<ControlPoint controlPointId={pageParams.id} />
		</BasePage>
	);
};

const ControlPoint = (props) => {
	const {controlPointId} = props;
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

	const onFinish = () => {
		history.push(paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path);
	};

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
				<Row style={{justifyContent: 'flex-start'}}>
					<Col span={8}>
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
					</Col>
					<Col span={6}>
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

				<Title level={5}>Оборудование</Title>
				<Layout
					className={'mb-16'}
					style={{border: '1px solid #DFDFDF'}}
				>
					<Space className={'p-8'}>
						<EquipmentAddModal />
						<Button
							itemProps={{
								name: 'btnControlPointsEquipmentDelete',
							}}
							icon={<DeleteOutlined />}
							type={'default'}
							disabled={true}
							dispatch={{
								path:
									'controlPoints.controlPointForm.equipments.events.onDelete',
								type: 'event',
							}}
							subscribe={[
								{
									name:
										'onControlPointsTableEquipmentsSelect',
									path:
										'rtd.controlPoints.controlPointForm.equipments.table.selected',
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabled: value ? !value : true,
										});
									},
								},
							]}
						/>
					</Space>
					<Table
						itemProps={{name: 'equipments'}}
						rowKey={'equipmentId'}
						customFields={equipmentTableCustom(controlPointId)}
						requestLoadRows={selectRowsById(
							'controlPointsEquipments',
							'controlPointId',
							controlPointId
						)}
						requestLoadConfig={apiGetConfigByName(
							'controlPointsEquipments'
						)}
						dispatch={{
							path:
								'controlPoints.controlPointForm.equipments.table',
						}}
						subscribe={[
							{
								name: 'onEquipmentsLocalAdd',
								path:
									'rtd.controlPoints.controlPointForm.equipments.addModal.onSave',
								extraData:
									'rtd.controlPoints.controlPointForm.equipments.addModal.table.selected',
								onChange: ({extraData, addRows}) => {
									addRows(extraData);
								},
							},
							{
								name: 'onEquipmentsLocalDelete',
								path:
									'rtd.controlPoints.controlPointForm.equipments.events.onDelete',
								onChange: ({removeRow}) => {
									removeRow();
								},
							},
						]}
					/>{' '}
				</Layout>

				<Title level={5}>Технологические карты</Title>
				<Layout
					className={'mb-16'}
					style={{border: '1px solid #DFDFDF'}}
				>
					<Space className={'p-8'}>
						<TechMapAddModal />
						<Button
							itemProps={{name: 'btnControlPointsTechMapsDelete'}}
							icon={<DeleteOutlined />}
							type={'default'}
							disabled={true}
							dispatch={{
								path:
									'controlPoints.controlPointForm.techMaps.events.onDelete',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'onControlPointsTableTechMapsSelect',
									path:
										'rtd.controlPoints.controlPointForm.techMaps.table.selected',
									onChange: ({value, setSubscribeProps}) => {
										setSubscribeProps({
											disabled: value ? !value : true,
										});
									},
								},
							]}
						/>
					</Space>
					<Table
						itemProps={{name: 'techMaps'}}
						rowKey={'techMapId'}
						customFields={techMapsTableCustom(controlPointId)}
						requestLoadRows={selectRowsById(
							'controlPointsTechMaps',
							'controlPointId',
							controlPointId
						)}
						requestLoadConfig={apiGetConfigByName(
							'controlPointsTechMaps'
						)}
						dispatch={{
							path:
								'controlPoints.controlPointForm.techMaps.table',
						}}
						subscribe={[
							{
								name: 'onTechMapsLocalAdd',
								path:
									'rtd.controlPoints.controlPointForm.techMaps.addModal.onSave',
								extraData:
									'rtd.controlPoints.controlPointForm.techMaps.addModal.table.selected',
								// addRow не поддерживает валидацию, потому использован addRows
								onChange: ({extraData, addRows}) => {
									addRows([extraData]);
								},
							},
							{
								name: 'onTechMapsLocalDelete',
								path:
									'rtd.controlPoints.controlPointForm.techMaps.events.onDelete',
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
