import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Input, InputNumber, notification} from 'antd';
import {Select} from 'rt-design';
import {
	apiGetDataByConfigName,
	apiGetCatalogWithParentById,
	apiSaveBaseCatalogWithParentId
} from '../../../../apis/catalog.api';

import {Form} from 'antd';

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
	const [initParentObject, setInitParentObject] = useState({});
	const [form] = Form.useForm();

	useEffect(() => {
		setMounted(true);
	}, []);

	// Первичная загрузка селекта родителя
	useEffect(() => {
		if (visible) {
			if (initFormObject) {
				if (initFormObject.parentId) {
					apiGetCatalogWithParentById({
						catalogName,
						id: initFormObject.parentId
					})
						.then(response => {
							// console.log('response -> ', response);
							setInitParentObject(response.data);
							form.resetFields();
						})
						.catch(error => {
							console.log('error -> ', error);
						});
				} else {
					if (mounted) {
						setInitParentObject(null);
						setTimeout(() => form.resetFields(), 100);
					}
				}
			}
		}
	}, [visible]);

	const onSave = values => {
		const saveObject = {...initFormObject, ...values};
		// console.log('onSave:', );
		const method = typeOperation === 'create' ? 'POST' : 'PUT';

		apiSaveBaseCatalogWithParentId({catalogName, method, data: saveObject})
			.then(response => {
				// setConfigData(response.data);
				// if (!mounted) setMounted(true);
				// console.log('response -> ', response);
				notification.success({message: 'Сохранение прошло успешно'});
				setVisibleSaveForm(false);
                setReloadTable(true);
			})
			.catch(error => {
				console.log('error -> ', error);
				notification.error({
					message: 'Произошла ошибка при хохранении'
				});
			});
	};

	const handleCancel = () => {
		setVisibleSaveForm(false);
	};

	const layout = {
		labelCol: {span: 8},
		wrapperCol: {span: 16}
	};
	const tailLayout = {
		wrapperCol: {offset: 8, span: 16}
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
			onOk={() => {
				form.validateFields()
					.then(values => {
						onSave(values);
						form.resetFields();
					})
					.catch(info => {
						console.log('Validate Failed:', info);
					});
			}}
		>
			<Form
				{...layout}
				name='PhysicalHierarchyAdd'
				form={form}
				size={'small'}
				initialValues={{
					code: initFormObject && initFormObject.code,
					name: initFormObject && initFormObject.name,
					parentId:
						initFormObject && initFormObject.parentId
							? initFormObject.parentId
							: null
				}}
			>
				{/*<div style={{display: 'flex'}}>*/}
				{typeOperation === 'update' ? (
					<Form.Item
						label='Код'
						name='code'
						rules={[
							{required: true, message: 'Пожалуйста введите код'}
						]}
					>
						<InputNumber style={{width: '100%'}} min={1} max={99999999} size={'small'} placeholder='Введите значение' />
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
					label='Родитель'
					name='parentId'
					getValueFromEvent={parentIdHandler}
					trigger={'onChangeKeys'}
					rules={[{required: false}]}
				>
					<Select
						name={'parentId'}
						section={'SelectPhysicalHierarchyParent'}
						type={'SingleSelect'}
						expandColumnKey={'id'}
						rowRender={'name'}
						nodeAssociated={false}
						expandDefaultAll={true}
						widthControl={0}
						heightPopup={300}
						defaultSelectedRowKeys={
							initParentObject ? [initParentObject.id] : []
						}
						defaultSelectedRowObjects={
							initParentObject ? [initParentObject] : []
						}
						// onChangeKeys={selectParentHandler}
						requestLoadRows={({data, params}) =>
							apiGetDataByConfigName({
								configName: catalogName,
								hierarchical: true,
								lazyLoad: false,
								data: {...data, owner: initFormObject && initFormObject.id},
								params
							})
						}
					/>
				</Form.Item>
				{/*</div>*/}
			</Form>
		</Modal>
	);
};

BaseModalWithParentId.propTypes = {};

export default BaseModalWithParentId;
