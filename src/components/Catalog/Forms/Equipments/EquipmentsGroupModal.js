import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Input, notification, Spin, Form} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {Select} from 'rt-design';
import {
	apiGetDataByConfigName,
	apiSaveEquipment,
	apiGetFlatDataByConfigName, apiGetHierarchicalDataByConfigName
} from '../../../../apis/catalog.api';

const EquipmentsGroupModal = props => {
	const {
		title,
		visible,
        typeOperation,
		setVisibleSaveForm,
		initFormObject,
		setReloadTable,
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
				const saveObject = {...initFormObject, ...values};
				saveObject.isGroup = true;
				// console.log('onSave:', );
				const method = typeOperation === 'create' ? 'POST' : 'PUT';

				apiSaveEquipment({method, data: saveObject})
					.then(response => {
						// setConfigData(response.data);
						// if (!mounted) setMounted(true);
						// console.log('response -> ', response);
						notification.success({message: 'Сохранение прошло успешно'});
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

	const handleCancel = () => {
		setVisibleSaveForm(false);
		// form.resetFields()
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
					// ref={_setFormRef()}
					size={'small'}
					labelAlign={'left'}
					initialValues={{
						code: initFormObject && initFormObject.code,
						techPlace: initFormObject && initFormObject.techPlace,
						name: initFormObject && initFormObject.name,
						parentId:
							initFormObject && initFormObject.parentId
								? initFormObject.parentId
								: null
					}}
				>
					{ !loading ?
						<>
							<Form.Item
								label='Тех. место'
								name='techPlace'
								rules={[
									{
										required: true,
										message: 'Пожалуйста введите тех. место'
									}
								]}
							>
								<Input size={'small'} placeholder='Введите значение'/>
							</Form.Item>

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
								<Input size={'small'} placeholder='Введите значение'/>
							</Form.Item>

							<Form.Item
								label='Группа'
								name='parentId'
								getValueFromEvent={parentIdHandler}
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
									defaultSelectedRowKeys={initFormObject && initFormObject.parentId ? [initFormObject.parentId] : []}
									// onChangeKeys={selectParentHandler}
									requestLoadRows={({data, params}) =>
										apiGetDataByConfigName({
											configName: 'equipmentsAutoQuery', //'equipmentsGroups',
											hierarchical: true,
											lazyLoad: false,
											data: {...data, isGroup: true, owner: initFormObject && initFormObject.id},
											params
										})
									}
									requestLoadDefault={apiGetFlatDataByConfigName('equipmentsAutoQuery')}
								/>
							</Form.Item>
						</>
						: <Spin
						tip='Загрузка...'
						indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}
						/>
					}
					{/*</div>*/}
				</Form>

		</Modal>
	);
};

EquipmentsGroupModal.propTypes = {
	title: PropTypes.string,
	visible: PropTypes.bool,
	typeOperation: PropTypes.string,
	setVisibleSaveForm: PropTypes.func,
	initFormObject: PropTypes.object,
	setReloadTable: PropTypes.func,
};

export default EquipmentsGroupModal;
