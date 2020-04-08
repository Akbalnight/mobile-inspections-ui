import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {useParams} from 'react-router';
import {
    apiGetConfigByName,
    apiGetDataByConfigName,
    apiGetTechMapById
} from '../../apis/catalog.api';
import {Form, Input, InputNumber, DatePicker, Checkbox, Button} from 'antd';
import {AdvancedTable, Select, setTableRows} from 'rt-design';

const TechMapGroupData = props => {
	const params = useParams();

	const [initFormObject, setInitFormObject] = useState({});
	const [initParentObject, setInitParentObject] = useState({});

	const [form] = Form.useForm();

	useEffect(() => {
		loadForm();
	}, [params && params.id]);

	async function loadForm() {
		try {
			const techMap = await apiGetTechMapById({id: params.id});
			setInitFormObject(techMap.data);

			// Получить объект родителя
			if (techMap.data.parentId) {
				const parentEquipment = await apiGetTechMapById({
					id: techMap.data.parentId
				});
				setInitParentObject(parentEquipment.data);
			} else setInitParentObject(null);

			form.resetFields();
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

	const onFinish = values => {
		console.log('Success:', { ...values});
		//
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Form
			layout={'Vertical'}
			name='TechMapDataForm'
			form={form}
			size={'small'}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			initialValues={{
				code: initFormObject && initFormObject.code,
				name: initFormObject && initFormObject.name,
				techMapsStatusId:
					initFormObject && initFormObject.techMapsStatusId,
				dateStart: initFormObject && moment(initFormObject.dateStart),
				parentId:
					initFormObject && initFormObject.parentId
						? initFormObject.parentId
						: null
			}}
		>
			<div className={'tmTitle'}>Информация о группе технологических карт</div>
			<div className={'FieldsLine'}>
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
						{required: true, message: 'Пожалуйста выберите группу'}
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
						widthControl={200}
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
								configName: 'techMaps',
								hierarchical: true,
								lazyLoad: false,
								data,
								params
							})
						}
					/>
				</Form.Item>
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
			</div>
			<div className={'OperationsTable'}>
            </div>
			<div className={'tmDataFooter'}>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Сохранить
					</Button>
				</Form.Item>
			</div>
		</Form>
	);
};

TechMapGroupData.propTypes = {};

export default TechMapGroupData;
