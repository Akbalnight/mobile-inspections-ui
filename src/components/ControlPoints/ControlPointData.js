import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import BasePage from '../App/BasePage';
import {Button, Form, Input, InputNumber, Modal} from 'antd';
import {AdvancedTable, Select} from 'rt-design';
import {
	apiGetConfigByObject,
	apiGetDataByConfigName,
	apiGetFlatDataByConfigName
} from '../../apis/catalog.api';
import {paths} from '../../constants/paths';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import EquipmentSelectModal from '../Base/EquipmentSelectModal';
import TechMapSelectModal from './Modals/TechMapSelectModal';

const {confirm} = Modal;

const ControlPointData = props => {
	const params = useParams();
	let history = useHistory();

	const [loadingConfig, setLoadingConfig] = useState(false);
	const [initFormObject, setInitFormObject] = useState({});

	const [equipmentsConfig, setEquipmentsConfig] = useState({});
	const [equipmentsSelected, setEquipmentsSelected] = useState({});
	const [equipments, setEquipments] = useState([]);

	const [techMapsConfig, setTechMapsConfig] = useState({});
	const [techMapsSelected, setTechMapsSelected] = useState({});
	const [techMaps, setTechMaps] = useState([]);

	const [visibleEquipmentSelect, setVisibleEquipmentSelect] = useState(false);
	const [visibleTechMapSelect, setVisibleTechMapSelect] = useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		async function fetchData() {
			try {
				setLoadingConfig(true);
				const eConfig = await apiGetConfigByObject({
					configName: 'controlPointsEquipments'
				});
				eConfig.data.hierarchical = false;
				setEquipmentsConfig(eConfig.data);

				const tConfig = await apiGetConfigByObject({
					configName: 'controlPointsTechMaps'
				});
				tConfig.data.hierarchical = false;
				setTechMapsConfig(tConfig.data);
				setLoadingConfig(false);

				if (params.id === 'new') {
					setInitFormObject({
						code: null,
						name: null,
						parentId: null,
						equipments: [],
						techMaps: [],
						isGroup: false
					});
					form.resetFields();
				} else {
					const cpResp = await apiGetFlatDataByConfigName(
						'controlPoints'
					)({data: {id: params.id}});
					setInitFormObject(cpResp.data[0]);

					const eResp = await apiGetFlatDataByConfigName(
						'controlPointsEquipments'
					)({data: {controlPointsId: params.id}});
					setEquipments(eResp.data);

					const tmResp = await apiGetFlatDataByConfigName(
						'controlPointsTechMaps'
					)({data: {controlPointsId: params.id}});
					setTechMaps(tmResp.data);

					form.resetFields();
				}
			} catch (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			}
		}
		fetchData();
	}, [params, params.id, form]);

	const onSave = () => {
		// const formData = new FormData();
		form.validateFields()
			.then(values => {
				const saveObject = {
					...initFormObject,
					...values,
					equipments: equipments,
					techMaps: techMaps
				};
				const method = params.id === 'new' ? 'POST' : 'PUT';
				console.log('onSave:', method, saveObject);
			})
			.catch(info => {
				console.log('Validate Failed:', info);
			});
	};

	const onCancel = () => {
		confirm({
			title: 'Подтверждение отмены',
			icon: <ExclamationCircleOutlined />,
			content:
				'Несохраненные данные контрольной точки будут утеряны. Отменить редактирование?',
			centered: true,
			okText: 'Ок',
			cancelText: 'Отмена',
			onOk() {
				history.push(paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path);
			},
			onCancel() {}
		});
	};

	const onClickAddEquipments = () => {
		setVisibleEquipmentSelect(true);
	};
	const onAddEquipment = equipment => {
		if (equipments.findIndex(item => item.id === equipment.id) === -1)
			setEquipments([...equipments, equipment]);
	};
	const onClickAddTechMaps = () => {
		setVisibleTechMapSelect(true);
	};
	const onAddTechMap = techMap => {
		if (techMaps.findIndex(item => item.id === techMap.id) === -1)
			setTechMaps([...techMaps, techMap]);
	};

	const layout = {
		labelCol: {span: 4},
		wrapperCol: {span: 20}
	};

	const selectHandler = (name, keys) => {
		if (keys && keys.length > 0) return keys[0];
		else return null;
	};

	return (
		<BasePage
			className={'ControlPointData PageForm'}
			breadcrumb={
				params.id === 'new'
					? 'Создание контрольной точки'
					: `Контрольная точка ${initFormObject.code}`
			}
		>
			<div className={'PageFormTitle'}>
				Информация о контрольной точке
			</div>
			<Form
				{...layout}
				name='PageFormData'
				form={form}
				size={'small'}
				labelAlign={'left'}
				initialValues={{
					code: initFormObject && initFormObject.code,
					name: initFormObject && initFormObject.name,
					parentId:
						initFormObject && initFormObject.parentId
							? initFormObject.parentId
							: null
				}}
			>
				<div className={'PageFormDataTitle'}>Описание</div>
				{params.id !== 'new' ? (
					<Form.Item
						label='Код'
						name='code'
						rules={[
							{
								required: true,
								message: 'Пожалуйста введите код'
							}
						]}
					>
						<InputNumber
							style={{width: '100%'}}
							min={1}
							max={99999999}
							size={'small'}
							placeholder='Введите значение'
						/>
					</Form.Item>
				) : null}
				<Form.Item
					label='Наименование'
					name='name'
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите наименование'
						}
					]}
				>
					<Input size={'small'} placeholder='Введите значение' />
				</Form.Item>
				<Form.Item
					label='Группа'
					name='parentId'
					className={'NoRequiredField'}
					getValueFromEvent={selectHandler}
					trigger={'onChangeKeys'}
				>
					<Select
						name={'parentId'}
						section={'SelectTechMapsParent'}
						type={'SingleSelect'}
						expandColumnKey={'id'}
						rowRender={'name'}
						nodeAssociated={false}
						expandDefaultAll={true}
						widthControl={0}
						heightPopup={300}
						defaultSelectedRowKeys={
							initFormObject && initFormObject.parentId
								? [initFormObject.parentId]
								: null
						}
						// onChangeKeys={selectParentHandler}
						// requestLoadRows={ apiGetHierarchicalDataByConfigName('techMaps') }
						requestLoadRows={({data, params}) =>
							apiGetDataByConfigName({
								configName: 'controlPoints',
								hierarchical: true,
								lazyLoad: false,
								data: {...data, isGroup: true},
								params
							})
						}
						requestLoadDefault={apiGetFlatDataByConfigName(
							'controlPoints'
						)}
					/>
				</Form.Item>
				<div className={'PageFormDataTitle'}>Оборудование</div>
				<div className={'PageFormDataTable'}>
					{!loadingConfig ? (
						<AdvancedTable
							configData={equipmentsConfig}
							type={'localSide'}
							rows={equipments}
							setRows={setEquipments}
							selectedRowKeys={
								equipmentsSelected && equipmentsSelected.id
									? [equipmentsSelected.id]
									: []
							}
							onRowClick={({rowData}) =>
								setEquipmentsSelected(rowData)
							}
							commandPanelProps={{
								onClickAdd: onClickAddEquipments,
								showElements: ['add', 'delete']
							}}
						/>
					) : null}
				</div>
				<div className={'PageFormDataTitle'}>Технологические карты</div>
				<div className={'PageFormDataTable'}>
					{!loadingConfig ? (
						<AdvancedTable
							configData={techMapsConfig}
							type={'localSide'}
							rows={techMaps}
							setRows={setTechMaps}
							selectedRowKeys={
								techMapsSelected && techMapsSelected.id
									? [techMapsSelected.id]
									: []
							}
							onRowClick={({rowData}) =>
								setTechMapsSelected(rowData)
							}
							commandPanelProps={{
								onClickAdd: onClickAddTechMaps,
								showElements: ['add', 'delete']
							}}
						/>
					) : null}
				</div>
				<div className={'PageFormFooter'}>
					<Button className={'cancelButton'} onClick={onCancel}>
						Отмена
					</Button>
					<Button type='primary' onClick={onSave}>
						Сохранитьd
					</Button>
				</div>
			</Form>
			<EquipmentSelectModal
				visible={visibleEquipmentSelect}
				setVisible={setVisibleEquipmentSelect}
				onSelect={onAddEquipment}
			/>
			<TechMapSelectModal
				visible={visibleTechMapSelect}
				setVisible={setVisibleTechMapSelect}
				onSelect={onAddTechMap}
			/>
		</BasePage>
	);
};

ControlPointData.propTypes = {};

export default ControlPointData;
