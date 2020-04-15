import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveEquipment
} from '../../../../apis/catalog.api';
import {Form, Input, InputNumber, Modal, notification, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {Select} from 'rt-design';

const EquipmentsModal = props => {
	const {
		title,
		visible,
		typeOperation,
		setVisibleSaveForm,
		initFormObject,
		setReloadTable
	} = props;

	const [loading, setLoading] = useState(false);

	const [form] = Form.useForm();

	// Первичная загрузка селекта родителя
	useEffect(() => {
		if (visible) {
			setLoading(true);
			setTimeout(() => {
				form.resetFields();
				setLoading(false);
			}, 500);
		}
	}, [visible, form]);

	const onSave = () => {
		form.validateFields()
			.then(values => {
				// onSave(values);
				const saveObject = {...initFormObject, ...values};
				saveObject.isGroup = false;
				// console.log('onSave:', saveObject);
				const method = typeOperation === 'create' ? 'POST' : 'PUT';

				apiSaveEquipment({method, data: saveObject})
					.then(response => {
						// setConfigData(response.data);
						// if (!mounted) setMounted(true);
						// console.log('response -> ', response);
						notification.success({
							message: 'Сохранение прошло успешно'
						});
						setVisibleSaveForm(false);
						setReloadTable();
						form.resetFields();
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

	const layout = {
		labelCol: {span: 8},
		wrapperCol: {span: 16}
	};

	const handleCancel = () => {
		setVisibleSaveForm(false);
	};

	const selectHandler = (name, keys) => {
		if (keys && keys.length > 0) return keys[0];
		else return null;
	};

	return (
		<Modal
			title={title}
			centered
			visible={visible}
			okText='Сохранить'
			cancelText='Отмена'
			onCancel={handleCancel}
			onOk={onSave}
		>
			<Form
				{...layout}
				name='CatalogModalForm'
				form={form}
				size={'small'}
                labelAlign={'left'}
				initialValues={{
					code: initFormObject && initFormObject.code,
					name: initFormObject && initFormObject.name,
					modelId: initFormObject && initFormObject.modelId,
					markId: initFormObject && initFormObject.markId,
					parentId:
						initFormObject && initFormObject.parentId
							? initFormObject.parentId
							: null
				}}
			>
				{!loading ? (
					<>
						{typeOperation === 'update' ? (
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
							<Input
								size={'small'}
								placeholder='Введите значение'
							/>
						</Form.Item>

						<Form.Item
							label='Модели'
							name='modelId'
							getValueFromEvent={selectHandler}
							trigger={'onChangeKeys'}
							rules={[
								{
									required: true,
									message: 'Пожалуйста выберите модель'
								}
							]}
						>
							<Select
								name={'modelId'}
								type={'SingleSelect'}
								rowRender={'name'}
								widthControl={0}
								heightPopup={300}
								defaultSelectedRowKeys={
									initFormObject
										? [initFormObject.modelId]
										: []
								}
								// onChangeKeys={selectParentHandler}
								requestLoadRows={apiGetFlatDataByConfigName(
									'equipmentModels'
								)}
							/>
						</Form.Item>

						<Form.Item
							label='Марка'
							name='markId'
							getValueFromEvent={selectHandler}
							trigger={'onChangeKeys'}
							rules={[
								{
									required: true,
									message: 'Пожалуйста выберите марку'
								}
							]}
						>
							<Select
								name={'markId'}
								type={'SingleSelect'}
								rowRender={'name'}
								widthControl={0}
								heightPopup={300}
								defaultSelectedRowKeys={
									initFormObject
										? [initFormObject.markId]
										: []
								}
								// onChangeKeys={selectParentHandler}
								requestLoadRows={apiGetFlatDataByConfigName(
									'equipmentMarks'
								)}
							/>
						</Form.Item>

						<Form.Item
							label='Группа'
							name='parentId'
							getValueFromEvent={selectHandler}
							trigger={'onChangeKeys'}
							rules={[{required: false}]}
							className={"NoRequiredField"}
						>
							<Select
								name={'parentId'}
								type={'SingleSelect'}
								expandColumnKey={'id'}
								rowRender={'name'}
								nodeAssociated={false}
								expandDefaultAll={true}
								widthControl={0}
								heightPopup={300}
								defaultSelectedRowKeys={
									initFormObject
										? [initFormObject.parentId]
										: []
								}
								// onChangeKeys={selectParentHandler}
								requestLoadRows={apiGetHierarchicalDataByConfigName(
									'equipmentsGroups'
								)}
								requestLoadDefault={apiGetFlatDataByConfigName(
									'equipmentsAutoQuery'
								)}
							/>
						</Form.Item>
					</>
				) : (
					<Spin
						tip='Загрузка...'
						indicator={
							<LoadingOutlined style={{fontSize: 24}} spin />
						}
					/>
				)}
			</Form>
		</Modal>
	);
};

EquipmentsModal.propTypes = {
	title: PropTypes.string,
	visible: PropTypes.bool,
	typeOperation: PropTypes.string,
	setVisibleSaveForm: PropTypes.func,
	initFormObject: PropTypes.object,
	catalogName: PropTypes.string,
	setReloadTable: PropTypes.func,
};

export default EquipmentsModal;
