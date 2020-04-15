import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useHistory, useParams} from 'react-router';
import {
	apiGetConfigByName,
	apiGetDataByConfigName, apiGetFlatDataByConfigName,
	apiGetTechMapById, apiSaveTechMap
} from '../../apis/catalog.api';
import {Form, Input, InputNumber, DatePicker, Checkbox, Button, notification, Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {AdvancedTable, Select} from 'rt-design';
import BasePage from '../App/BasePage';
import {generateUUID} from "rt-design/src/components/utils/baseUtils";
import TechOperationsModal from "./TechOperationsModal";
import {paths} from "../../constants/paths";

const { confirm } = Modal;

const TechMapData = props => {
	const params = useParams();
	let history = useHistory();

    const [loadingConfig, setLoadingConfig] = useState(false);
    const [initFormObject, setInitFormObject] = useState({});
	// const [techMapTypeOperation, setTechMapTypeOperation] = useState({});
	const [techOperationsConfig, setTechOperationsConfig] = useState({});
	const [techOperations, setTechOperations] = useState([]);

	const [techOperationSelected, setTechOperationSelected] = useState({});
	const [techOperationModalVisible, setTechOperationModalVisible] = useState(false);
	const [techOperationModalTitle, setTechOperationModalTitle] = useState('');
	const [techOperationModalTypeOperation, setTechOperationModalTypeOperation] = useState('');


	const [form] = Form.useForm();

	useEffect(() => {
        setLoadingConfig(true);
		loadForm();
	}, [params, params.id]);

	async function loadForm() {
		try {
			const toConfig = await apiGetConfigByName({
				configName: 'techOperations'
			});
			setTechOperationsConfig(toConfig.data);
			setLoadingConfig(false);


			if( params.id === 'new'){
				setInitFormObject({
					"code": null,
					"name": null,
					"parentId": null,
					"techMapsStatusId": null,
					"dateStart": undefined,
					"techOperations": [],
					'isGroup': false,
				});
				form.resetFields();
			} else {
				const techMap = await apiGetTechMapById({id: params.id});
				setInitFormObject(techMap.data);

				// Получить объект родителя
				// if (techMap.data.parentId) {
				// 	const parentEquipment = await apiGetTechMapById({
				// 		id: techMap.data.parentId
				// 	});
				// 	setInitParentObject(parentEquipment.data);
				// } else setInitParentObject(null);

				const techOpes = await apiGetDataByConfigName({
					configName: 'techOperations',
					hierarchical: false,
					lazyLoad: false,
					data: {techMapId: params.id}
				});
				setTechOperations(techOpes.data);


				// setReloadTable(true);

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

	const selectHandler = (name, keys) => {
		if (keys && keys.length > 0) return keys[0];
		else return null;
	};

	const customCellRenders = [
		{
			name: 'code',
			cellRender: ({rowData}) => String(rowData.code).padStart(8, '0')
		},
		{
			name: 'position',
			cellRender: ({rowIndex}) => rowIndex + 1
		},
		{
			// needInputData equipmentStop increasedDanger
			name: 'needInputData',
			cellRender: ({cellData}) => (
				<Checkbox checked={cellData} disabled />
			)
		},
		{
			name: 'equipmentStop',
			cellRender: ({cellData}) => (
				<Checkbox checked={cellData} disabled />
			)
		},
		{
			name: 'increasedDanger',
			cellRender: ({cellData}) => (
				<Checkbox checked={cellData} disabled />
			)
		},
		{
			name: 'duration',
			cellRender: ({cellData}) => `${cellData} мин.`
		}
	];

    const layout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20}
    };

	const onCancel = () => {
		confirm({
			title: 'Подтверждение отмены',
			icon: <ExclamationCircleOutlined />,
			content: 'Несохраненные данные технологической карты будут утеряны. Отменить редактирование?',
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
			.then(values => {
				// onSave(values);
				const saveObject = {
					...initFormObject,
					...values,
					dateStart: values['dateStart'].format(),
					techOperations: techOperations.map((item, index) =>{ item.position = index + 1; return item; })
				};
				// saveObject.isGroup = false;
				console.log('onSave:', saveObject);
				const method = params.id === 'new' ? 'POST' : 'PUT';
				// const method = 'POST';

				apiSaveTechMap({method, data: saveObject})
					.then(response => {
						// setConfigData(response.data);
						// if (!mounted) setMounted(true);
						// console.log('response -> ', response);
						notification.success({
							message: 'Сохранение прошло успешно'
						});
						history.push(paths.CONTROL_EQUIPMENTS_TECH_MAPS.path);
						// form.resetFields();
					})
					.catch(error => {
						console.log('error -> ', error);
						notification.error({
							message: 'Произошла ошибка при хохранении'
						});
					});
			})
			.catch(info => {
				console.log('Validate Failed:', info);
			});
	};

	const onClickAddHandler = (event) => {
		setTechOperationSelected({
			id: generateUUID(),
			name: '',
			code: parseInt(techOperations.reduce((max, current) => current.code > max ? current.code : max, 0)) + 1,
			needInputData: false,
			labelInputData: null,
			equipmentStop: false,
			increasedDanger: false,
			duration: 0,
			position: techOperations.length + 1,
			techMapId: params.id !== 'new' ? params.id : null
		});
		setTechOperationModalVisible(true);
		setTechOperationModalTypeOperation('create');
		setTechOperationModalTitle('Создание техологической операции')
	};

	const onClickEditHandler = (event, {rowData}) => {
		console.log('onClickEditHandler', rowData);
		setTechOperationSelected(rowData);
		setTechOperationModalVisible(true);
		setTechOperationModalTypeOperation('update');
		setTechOperationModalTitle('Изменение техологической операции')
	};

	const onClickAddAsCopyHandler = (event, row) => {
		let nRow = {...row};
		nRow.id = generateUUID();
		let localArr = [...techOperations];
		console.log("New row -> ", nRow);
		localArr.push(nRow);
		setTechOperations(localArr);
	};

	const saveRowToTable = (row) => {
		if(techOperationModalTypeOperation === 'create'){
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
			className={'TechMapData'}
			breadcrumb={params.id === 'new' ? 'Создание технологической карты' : `Технологическая карта ${initFormObject.code}`}
		>
			<Form
                {...layout}
				name='TechMapDataForm'
				form={form}
				size={'small'}
                labelAlign={'left'}
				// onFinish={onFinish}
				// onFinishFailed={onFinishFailed}
				initialValues={{
					code: initFormObject && initFormObject.code,
					name: initFormObject && initFormObject.name,
					techMapsStatusId:
						initFormObject && initFormObject.techMapsStatusId
							? initFormObject.techMapsStatusId
							: null,
					dateStart:
						initFormObject && initFormObject.dateStart ? moment(initFormObject.dateStart) : null,
					parentId:
						initFormObject && initFormObject.parentId
							? initFormObject.parentId
							: null
				}}
			>
				<div className={'tmTitle'}>
					Информация о технологической карте
				</div>
				<div className={'FieldsLine'}>
					{ params.id !== 'new'
						?
						<Form.Item
							className={'tmCode'}
							label='Код'
							name='code'
							rules={[
								{required: true, message: 'Пожалуйста введите код'}
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
						: null }
					<Form.Item
						className={'tmName'}
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
						getValueFromEvent={selectHandler}
						trigger={'onChangeKeys'}
						rules={[
							{
								required: true,
								message: 'Пожалуйста выберите группу'
							}
						]}
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
							defaultSelectedRowKeys={ initFormObject && initFormObject.parentId ? [initFormObject.parentId] : null }
							// onChangeKeys={selectParentHandler}
							// requestLoadRows={ apiGetHierarchicalDataByConfigName('techMaps') }
							requestLoadRows={({data, params}) =>
								apiGetDataByConfigName({
									configName: 'techMaps',
									hierarchical: true,
									lazyLoad: false,
									data: {...data, isGroup: true},
									params
								})
							}
                            requestLoadDefault={ apiGetFlatDataByConfigName('techMaps') }
						/>
					</Form.Item>


					<Form.Item
						label='Статус'
						name='techMapsStatusId'
						getValueFromEvent={selectHandler}
						trigger={'onChangeKeys'}
						rules={[
							{
								required: true,
								message: 'Пожалуйста выберите статус'
							}
						]}
					>
						<Select
							name={'techMapsStatusId'}
							section={'SelectTechMapsStatus'}
							type={'SingleSelect'}
							rowRender={'name'}
							widthControl={0}
							heightPopup={300}
							defaultSelectedRowKeys={
								initFormObject && initFormObject.techMapsStatusId
									? [initFormObject.techMapsStatusId]
									: []
							}
							// onChangeKeys={selectParentHandler}
							requestLoadRows={({data, params}) =>
								apiGetDataByConfigName({
									configName: 'techMapsStatuses',
									hierarchical: false,
									lazyLoad: false,
									data,
									params
								})
							}
						/>
					</Form.Item>
					<Form.Item
						className={'tmDateStart'}
						label='Действует с'
						name='dateStart'
						rules={[
							{
								required: true,
								message: 'Пожалуйста выберите дату'
							}
						]}
					>
						<DatePicker format={'DD.MM.YYYY'} />
					</Form.Item>
				</div>
                <div className={'InfoTitle'} >Технологические операции</div>
				<div className={'OperationsTable'}>
					{!loadingConfig ? (
						<AdvancedTable
							configData={techOperationsConfig}
							customCellRenders={customCellRenders}
							type={'localSide'}
							headerHeight={50}
                            rows={techOperations}
							setRows={setTechOperations}
							selectedRowKeys={techOperationSelected ? [techOperationSelected.id] : []}
							onRowClick={({rowData}) => setTechOperationSelected(rowData)}
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
									'down'
								]
							}}
							// requestLoadRows={({data, params}) =>
                            //     apiGetDataByConfigName({
                            //         configName: 'techOperations',
                            //         hierarchical: false,
                            //         lazyLoad: false,
                            //         data: {
                            //             ...data,
                            //             techMapId: initFormObject.id
                            //         },
                            //         params
                            //     })
							// }
						/>
					) : null}
				</div>
				<div className={'tmDataFooter'}>
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
