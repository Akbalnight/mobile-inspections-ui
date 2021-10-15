import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	Form,
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
	apiSaveByConfigName,
} from '../../../apis/application.api';
import {useHistory} from 'react-router';
import {paths} from '../../../constants/paths';
import {DeleteOutlined} from '@ant-design/icons';
import {selectRowsById} from '../../Base/Functions/TableSelectById';
import {EquipmentAddModal} from './Modals/EquipmentSaveObject';
import {equipmentTableCustom, techMapsTableCustom} from '../tableProps';
import {TechMapAddModal} from './Modals/TechMapSaveObject';
import {systemEvents} from '../../../constants/systemEvents';

export const ControlPointAdd = ({match: {title}}) => {
	return (
		<BasePage goBack={true} title={title}>
			<ControlPoint />
		</BasePage>
	);
};

export const ControlPointEdit = ({match: {title, params}}) => {
	return (
		<BasePage goBack={true} title={title}>
			<ControlPoint controlPointId={params.id} />
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
			name={'form'}
			loadInitData={loadData}
			requestSaveForm={apiSaveByConfigName(
				'controlPoints',
				systemEvents[
					controlPointId
						? 'CONTROL_POINTS_EDITION_SUCCESS'
						: 'CONTROL_POINTS_CREATION_SUCCESS'
				]
			)}
			methodSaveForm={controlPointId ? 'PUT' : 'POST'}
			onFinish={onFinish}
			labelCol={{span: 8}}
			wrapperCol={{span: 14}}
		>
			{/*<FormHeader>*/}
			{/*	<Title level={3}>*/}
			{/*		{controlPointId*/}
			{/*			? `Редактирование контрольной точки`*/}
			{/*			: `Создание контрольной точки`}*/}
			{/*	</Title>*/}
			{/*</FormHeader>*/}
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
								path: 'controlPoints.form.equipmentsTable.onDelete',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'onControlPointsTableEquipmentsSelect',
									path: 'rtd.controlPoints.form.equipmentsTable.selected',
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
							path: 'controlPoints.form.equipmentsTable',
						}}
						subscribe={[
							{
								name: 'onEquipmentsLocalAdd',
								path: 'rtd.controlPoints.form.equipmentsTable.select.onSave',
								extraData:
									'rtd.controlPoints.form.equipmentsTable.select.table.selected',
								onChange: ({extraData, addRows}) => {
									addRows(extraData);
								},
							},
							{
								name: 'onEquipmentsLocalDelete',
								path: 'rtd.controlPoints.form.equipmentsTable.onDelete',
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
								path: 'controlPoints.form.techMapsTable.onDelete',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'onControlPointsTableTechMapsSelect',
									path: 'rtd.controlPoints.form.techMapsTable.selected',
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
							path: 'controlPoints.form.techMapsTable',
						}}
						subscribe={[
							{
								name: 'onTechMapsLocalAdd',
								path: 'rtd.controlPoints.form.techMapsTable.select.onSave',
								extraData:
									'rtd.controlPoints.form.techMapsTable.select.table.selected',
								// addRow не поддерживает валидацию, потому использован addRows
								onChange: ({extraData, addRows}) => {
									addRows([extraData]);
								},
							},
							{
								name: 'onTechMapsLocalDelete',
								path: 'rtd.controlPoints.form.techMapsTable.onDelete',
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
