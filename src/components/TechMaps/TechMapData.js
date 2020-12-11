import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useHistory, useParams} from 'react-router';
import {
	apiGetConfigByObject,
	apiGetDataByConfigName,
	apiGetFlatDataByConfigName,
	apiGetTechMapById,
	apiSaveTechMap,
} from '../../apis/catalog.api';
import {
	Form,
	Input,
	InputNumber,
	DatePicker,
	Checkbox,
	Button,
	notification,
	Modal,
} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {AdvancedTable, notificationError, Select} from 'rt-design';
import {BasePage} from 'mobile-inspections-base-ui';
import {uuid} from '../../utils/baseUtils';
import TechOperationsModal from './TechOperationsModal';
import {paths} from '../../constants/paths';

const {confirm} = Modal;

const TechMapData = () => {
	const params = useParams();
	let history = useHistory();

	const [loadingConfig, setLoadingConfig] = useState(false);
	const [initFormObject, setInitFormObject] = useState({});
	const [techOperationsConfig, setTechOperationsConfig] = useState({});
	const [techOperations, setTechOperations] = useState([]);

	const [techOperationSelected, setTechOperationSelected] = useState({});
	const [techOperationModalVisible, setTechOperationModalVisible] = useState(
		false
	);
	const [techOperationModalTitle, setTechOperationModalTitle] = useState('');
	const [
		techOperationModalTypeOperation,
		setTechOperationModalTypeOperation,
	] = useState('');

	const [form] = Form.useForm();

	useEffect(() => {
		async function fetchData() {
			try {
				setLoadingConfig(true);
				const toConfig = await apiGetConfigByObject({
					configName: 'techOperations',
				});
				setTechOperationsConfig(toConfig.data);
				setTechOperationSelected({});
				setLoadingConfig(false);

				if (params.id === 'new') {
					setInitFormObject({
						code: null,
						name: null,
						parentId: null,
						techMapsStatusId: null,
						dateStart: undefined,
						techOperations: [],
						isGroup: false,
					});
					form.resetFields();
				} else {
					const techMap = await apiGetTechMapById({id: params.id});
					setInitFormObject(techMap.data);

					const techOpes = await apiGetDataByConfigName({
						configName: 'techOperations',
						hierarchical: false,
						lazyLoad: false,
						data: {techMapId: params.id},
					});
					setTechOperations(techOpes.data);

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

	const selectHandler = (name, keys) => {
		if (keys && keys.length > 0) return keys[0];
		else return null;
	};

	const customCellRenders = [
		{
			name: 'code',
			cellRenderer: ({rowData}) => String(rowData.code).padStart(8, '0'),
		},
		{
			name: 'position',
			cellRenderer: ({rowIndex}) => rowIndex + 1,
		},
		{
			// needInputData equipmentStop increasedDanger
			name: 'needInputData',
			cellRenderer: ({cellData}) => (
				<Checkbox checked={cellData} disabled />
			),
		},
		{
			name: 'equipmentStop',
			cellRenderer: ({cellData}) => (
				<Checkbox checked={cellData} disabled />
			),
		},
		{
			name: 'increasedDanger',
			cellRenderer: ({cellData}) => (
				<Checkbox checked={cellData} disabled />
			),
		},
		{
			name: 'duration',
			cellRenderer: ({cellData}) => `${cellData} мин.`,
		},
	];

	const layout = {
		labelCol: {span: 4},
		wrapperCol: {span: 20},
	};

	const onCancel = () => {
		confirm({
			title: 'Подтверждение отмены',
			icon: <ExclamationCircleOutlined />,
			content:
				'Несохраненные данные технологической карты будут утеряны. Отменить редактирование?',
			centered: true,
			okText: 'Ок',
			cancelText: 'Отмена',
			onOk() {
				history.push(paths.CONTROL_EQUIPMENTS_TECH_MAPS.path);
			},
			onCancel() {},
		});
	};

	const onSave = () => {
		form.validateFields()
			.then((values) => {
				const saveObject = {
					...initFormObject,
					...values,
					dateStart: values['dateStart'].format(),
					techOperations: techOperations.map((item, index) => {
						item.position = index + 1;
						return item;
					}),
				};
				console.log('onSave:', saveObject);
				const method = params.id === 'new' ? 'POST' : 'PUT';

				apiSaveTechMap({method, data: saveObject})
					.then((response) => {
						// console.log('response -> ', response);
						notification.success({
							message: 'Сохранение прошло успешно',
						});
						history.push(paths.CONTROL_EQUIPMENTS_TECH_MAPS.path);
						// form.resetFields();
					})
					.catch((error) =>
						notificationError(error, 'Ошибка сохранения')
					);
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};

	const onClickAddHandler = (event) => {
		setTechOperationSelected({
			id: uuid(),
			name: '',
			code:
				parseInt(
					techOperations.reduce(
						(max, current) =>
							current.code > max ? current.code : max,
						0
					)
				) + 1,
			needInputData: false,
			labelInputData: null,
			equipmentStop: false,
			increasedDanger: false,
			duration: 0,
			position: techOperations.length + 1,
			techMapId: params.id !== 'new' ? params.id : null,
		});
		setTechOperationModalVisible(true);
		setTechOperationModalTypeOperation('create');
		setTechOperationModalTitle('Создание техологической операции');
	};

	const onClickEditHandler = (event, {rowData}) => {
		console.log('onClickEditHandler', rowData);
		setTechOperationSelected(rowData);
		setTechOperationModalVisible(true);
		setTechOperationModalTypeOperation('update');
		setTechOperationModalTitle('Изменение техологической операции');
	};

	const onClickAddAsCopyHandler = (event, row) => {
		let nRow = {...row};
		nRow.id = uuid();
		let localArr = [...techOperations];
		console.log('New row -> ', nRow);
		localArr.push(nRow);
		setTechOperations(localArr);
	};

	const saveRowToTable = (row) => {
		if (techOperationModalTypeOperation === 'create') {
			setTechOperations([...techOperations, row]);
		} else {
			let arr = [...techOperations];
			const rowIndex = arr.findIndex((item) => item.id === row.id);
			arr.splice(rowIndex, 1, row);
			setTechOperations(arr);
			// console.log()
		}
	};

	return (
		<BasePage
			className={'TechMapData PageForm'}
			breadcrumb={
				params.id === 'new'
					? 'Создание технологической карты'
					: `Технологическая карта ${initFormObject.code}`
			}
		>
			<div className={'PageFormTitle'}>
				Информация о технологической карте
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
					techMapsStatusId:
						initFormObject && initFormObject.techMapsStatusId
							? [initFormObject.techMapsStatusId]
							: [],
					dateStart:
						initFormObject && initFormObject.dateStart
							? moment(initFormObject.dateStart)
							: null,
					parentId:
						initFormObject && initFormObject.parentId
							? initFormObject.parentId
							: null,
				}}
			>
				{/*<div className={'FieldsLine'}>*/}
				<div className={'PageFormDataTitle'}>Описание</div>
				{params.id !== 'new' ? (
					<Form.Item
						className={'tmCode'}
						label='Код'
						name='code'
						rules={[
							{
								required: true,
								message: 'Пожалуйста введите код',
							},
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
					className={'tmName'}
					label='Наименование'
					name='name'
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите наименование',
						},
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
					valuePropName={'defaultSelectedRowKeys'}
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
						// defaultSelectedRowKeys={
						//     initFormObject && initFormObject.parentId
						//                               ? [initFormObject.parentId]
						//                               : null
						//}
						// onChangeKeys={selectParentHandler}
						// requestLoadRows={ apiGetHierarchicalDataByConfigName('techMaps') }
						requestLoadRows={({data, params}) =>
							apiGetDataByConfigName({
								configName: 'techMaps',
								hierarchical: true,
								lazyLoad: false,
								data: {...data, isGroup: true},
								params,
							})
						}
						requestLoadDefault={apiGetFlatDataByConfigName(
							'techMaps'
						)}
					/>
				</Form.Item>

				<Form.Item
					label='Статус'
					name='techMapsStatusId'
					className={'NoRequiredField'}
					getValueFromEvent={selectHandler}
					trigger={'onChangeKeys'}
					valuePropName={'defaultSelectedRowKeys'}
				>
					<Select
						name={'techMapsStatusId'}
						section={'SelectTechMapsStatus'}
						type={'SingleSelect'}
						rowRender={'name'}
						widthControl={0}
						heightPopup={300}
						// defaultSelectedRowKeys={
						//     initFormObject &&
						//     initFormObject.techMapsStatusId
						//         ? [initFormObject.techMapsStatusId]
						//         : []
						// }
						// onChangeKeys={selectParentHandler}
						requestLoadRows={({data, params}) =>
							apiGetDataByConfigName({
								configName: 'techMapsStatuses',
								hierarchical: false,
								lazyLoad: false,
								data,
								params,
							})
						}
						// requestLoadDefault={apiGetFlatDataByConfigName(
						// 	'techMapsStatuses'
						// )}
					/>
				</Form.Item>
				<Form.Item
					label='Действует с'
					name='dateStart'
					className={'NoRequiredField'}
				>
					<DatePicker format={'DD.MM.YYYY'} />
				</Form.Item>
				{/*</div>*/}
				<div className={'PageFormDataTitle'}>
					Технологические операции
				</div>
				<div className={'PageFormDataTable'}>
					{!loadingConfig ? (
						<AdvancedTable
							configData={techOperationsConfig}
							customColumnProps={customCellRenders}
							type={'localSide'}
							headerHeight={50}
							rows={techOperations}
							setRows={setTechOperations}
							selectedRowKeys={
								techOperationSelected &&
								techOperationSelected.id
									? [techOperationSelected.id]
									: []
							}
							onRowClick={({rowData}) =>
								setTechOperationSelected(rowData)
							}
							commandPanelProps={{
								onClickAdd: onClickAddHandler,
								onClickEdit: onClickEditHandler,
								onClickAddAsCopy: onClickAddAsCopyHandler,
								showElements: [
									'add',
									'addAsCopy',
									'edit',
									'delete',
									'up',
									'down',
								],
							}}
						/>
					) : null}
				</div>
				<div className={'PageFormFooter'}>
					<Button className={'cancelButton'} onClick={onCancel}>
						Отмена
					</Button>
					<Button type='primary' onClick={onSave}>
						Сохранить
					</Button>
				</div>
			</Form>
			<TechOperationsModal
				title={techOperationModalTitle}
				visible={techOperationModalVisible}
				setVisible={setTechOperationModalVisible}
				initFormObject={techOperationSelected}
				typeOperation={techOperationModalTypeOperation}
				onSave={saveRowToTable}
			/>
		</BasePage>
	);
};

TechMapData.propTypes = {};

export default TechMapData;
