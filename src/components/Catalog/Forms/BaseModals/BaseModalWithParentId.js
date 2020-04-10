import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Input, InputNumber, notification, Spin, Form} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {Select} from 'rt-design';
import {
	apiSaveBaseCatalogWithParentId,
	apiGetHierarchicalDataByConfigName,
	apiGetFlatDataByConfigName
} from '../../../../apis/catalog.api';

const BaseModalWithParentId = props => {
	const {
		title,
		visible,
		typeOperation,
		setVisibleSaveForm,
		initFormObject,
		catalogName,
		setReloadTable
	} = props;

	const [mounted, setMounted] = useState(false);
	const [loading, setLoading] = useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		setMounted(true);
	}, [mounted]);

	// Первичная загрузка селекта родителя
	useEffect(() => {
		if (visible) {
			if (mounted) {
				setLoading(true);
				setTimeout(() => {
					form.resetFields();
					setLoading(false);
				}, 500);
			}
		}
	}, [visible, mounted, form]);

	const onSave = () => {
		form.validateFields()
			.then(values => {
				const saveObject = {...initFormObject, ...values};
				// console.log('onSave:', );
				const method = typeOperation === 'create' ? 'POST' : 'PUT';

				apiSaveBaseCatalogWithParentId({
					catalogName,
					method,
					data: saveObject
				})
					.then(response => {
						// setConfigData(response.data);
						// if (!mounted) setMounted(true);
						// console.log('response -> ', response);
						notification.success({
							message: 'Сохранение прошло успешно'
						});
						setVisibleSaveForm(false);
						setReloadTable(true);
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

	const handleCancel = () => {
		setVisibleSaveForm(false);
	};

	const layout = {
		labelCol: {span: 8},
		wrapperCol: {span: 16}
	};

	const parentIdHandler = (name, keys) => {
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
							label='Родитель'
							name='parentId'
							getValueFromEvent={parentIdHandler}
							trigger={'onChangeKeys'}
							rules={[{required: false}]}
							className={"NoRequiredField"}
						>
							<Select
								name={'parentId'}
								// section={'SelectPhysicalHierarchyParent'}
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
									catalogName
								)}
								requestLoadDefault={apiGetFlatDataByConfigName(
									catalogName
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

BaseModalWithParentId.propTypes = {
	title: PropTypes.string,
	visible: PropTypes.bool,
	typeOperation: PropTypes.string,
	setVisibleSaveForm: PropTypes.func,
	initFormObject: PropTypes.func,
	catalogName: PropTypes.string,
	setReloadTable: PropTypes.func,
};

export default BaseModalWithParentId;
