import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Input, InputNumber, notification} from 'antd';
import {Select} from 'rt-design';
import {
	apiSaveBaseCatalog
} from '../../../../apis/catalog.api';

import {Form} from 'antd';

const BaseModal = props => {
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
	const [form] = Form.useForm();

	useEffect(() => {
		setMounted(true);
	}, []);

	// Первичная загрузка селекта родителя
	useEffect(() => {
		if (visible && initFormObject && mounted) {
			setTimeout(() => form.resetFields(), 100);
		}
	}, [visible]);

	const onSave = values => {
		const saveObject = {...initFormObject, ...values};
		// console.log('onSave:', );
		const method = typeOperation === 'create' ? 'POST' : 'PUT';

		apiSaveBaseCatalog({catalogName, method, data: saveObject})
			.then(response => {
				// setConfigData(response.data);
				// if (!mounted) setMounted(true);
				// console.log('response -> ', response);
				notification.success({message: 'Сохранение прошло успешно'});
				form.resetFields();
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
					})
					.catch(info => {
						console.log('Validate Failed:', info);
					});
			}}
		>
			<Form
				{...layout}
				name={title}
				form={form}
				size={'small'}
				initialValues={{
					code: initFormObject && initFormObject.code,
					name: initFormObject && initFormObject.name,
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
				{/*</div>*/}
			</Form>
		</Modal>
	);
};

BaseModal.propTypes = {};

export default BaseModal;
