import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Input, InputNumber, notification, Form} from 'antd';
import {apiSaveBaseCatalog} from '../../../../apis/catalog.api';
import {notificationError} from 'rt-design';

const BaseModal = (props) => {
	const {
		title,
		visible,
		typeOperation,
		setVisibleSaveForm,
		initFormObject,
		catalogName,
		setReloadTable,
	} = props;

	const [mounted, setMounted] = useState(false);
	const [form] = Form.useForm();

	useEffect(() => {
		setMounted(true);
	}, [mounted]);

	// Сброс значений формы
	useEffect(() => {
		if (visible && initFormObject && mounted) {
			setTimeout(() => form.resetFields(), 100);
		}
	}, [visible, initFormObject, mounted, form]);

	const onSave = (values) => {
		const saveObject = {...initFormObject, ...values};
		// console.log('onSave:', );
		const method = typeOperation === 'create' ? 'POST' : 'PUT';

		apiSaveBaseCatalog({catalogName, method, data: saveObject})
			.then((response) => {
				// setConfigData(response.data);
				// if (!mounted) setMounted(true);
				// console.log('response -> ', response);
				notification.success({message: 'Сохранение прошло успешно'});
				form.resetFields();
				setVisibleSaveForm(false);
				// console.log('setReloadTable', setReloadTable);
				setReloadTable({});
			})
			.catch((error) => notificationError(error, 'Ошибка сохранения'));
	};

	const handleCancel = () => {
		setVisibleSaveForm(false);
	};

	const layout = {
		labelCol: {span: 8},
		wrapperCol: {span: 16},
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
					.then((values) => {
						onSave(values);
					})
					.catch((info) => {
						console.log('Validate Failed:', info);
					});
			}}
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
				}}
			>
				{typeOperation === 'update' ? (
					<Form.Item
						label='Код'
						name='code'
						rules={[
							{required: true, message: 'Пожалуйста введите код'},
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
							message: 'Пожалуйста введите наименование',
						},
					]}
				>
					<Input size={'small'} placeholder='Введите значение' />
				</Form.Item>
			</Form>
		</Modal>
	);
};

BaseModal.propTypes = {
	title: PropTypes.string,
	visible: PropTypes.bool,
	typeOperation: PropTypes.string,
	setVisibleSaveForm: PropTypes.func,
	initFormObject: PropTypes.object,
	catalogName: PropTypes.string,
	setReloadTable: PropTypes.func,
};

export default BaseModal;
