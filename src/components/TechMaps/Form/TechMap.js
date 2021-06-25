import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	Form,
	FormHeader,
	FormBody,
	FormFooter,
	Input,
	Select,
	Title,
	TreeSelect,
	Button,
	Table,
	DatePicker,
	Row,
	Col,
	Layout,
	notificationError,
} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveTechMap,
} from '../../../apis/catalog.api';
import {useHistory, useParams} from 'react-router';
import {paths} from '../../../constants/paths';
import {formCustomColumnProps, TechOperTableHeader} from '../tableProps';
import {uuid} from '../../../utils/baseUtils';

export const TechMapsAdd = () => {
	return (
		<BasePage>
			<TechMap />
		</BasePage>
	);
};

export const TechMapsEdit = () => {
	const pageParams = useParams();

	return (
		<BasePage>
			<TechMap techMapId={pageParams.id} />
		</BasePage>
	);
};

const TechMap = (props) => {
	const {techMapId} = props;
	const history = useHistory();

	const loadData = (callBack) => {
		if (techMapId) {
			apiGetFlatDataByConfigName('techMaps')({
				data: {id: techMapId},
			})
				.then((response) => {
					callBack(response.data[0]);
				})
				.catch((error) =>
					notificationError(error, 'Ошибка загрузки данных формы')
				);
		} else {
			callBack({
				code: null,
				name: null,
				parentId: null,
				equipments: [],
				techMaps: [],
				isGroup: false,
			});
		}
	};

	const onFinish = () => {
		history.push(
			paths.DETOURS_CONFIGURATOR_TECH_MAPS_FORM_NEW_VERSION.path
		);
	};

	const loadTechOperationsHandler = ({data, params}) => {
		const newData = {
			...data,
			techMapId: !techMapId ? null : techMapId,
		};
		return apiGetFlatDataByConfigName('techOperations')({
			data: newData,
			params,
		});
	};

	return (
		<Form
			name={'TechMapsForm'}
			loadInitData={loadData}
			requestSaveForm={apiSaveTechMap}
			methodSaveForm={techMapId ? 'PUT' : 'POST'}
			onFinish={onFinish}
			labelCol={{span: 8}}
			wrapperCol={{span: 16}}
		>
			<FormHeader>
				<Title level={3}>
					{techMapId
						? `Редактирование технологической карты`
						: `Создание технологической карты`}
				</Title>
			</FormHeader>
			<FormBody>
				<Row style={{justifyContent: 'flex-start'}}>
					<Col span={8}>
						<Input
							itemProps={{
								name: 'name',
								label: 'Наименование',
								rules: [
									{
										message: 'Заполните наименование',
										required: true,
									},
								],
							}}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<TreeSelect
							itemProps={{name: 'parentId', label: 'Группа'}}
							allowClear={true}
							optionConverter={(option) => {
								return {
									label: option.name,
									value: option.id,
									children: option.children,
								};
							}}
							requestLoadRows={({data, params}) =>
								apiGetHierarchicalDataByConfigName('techMaps')({
									data: {...data, isGroup: true},
									params,
								})
							}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Select
							itemProps={{
								name: 'techMapsStatusId',
								label: 'Статус',
							}}
							allowClear={true}
							optionConverter={(option) => {
								return {
									label: option.name,
									value: option.id,
									children: option.children,
								};
							}}
							requestLoadRows={({data, params}) =>
								apiGetHierarchicalDataByConfigName(
									'techMapsStatuses'
								)({
									data: {...data, isGroup: false},
									params,
								})
							}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<DatePicker
							itemProps={{
								name: 'dateStart',
								label: 'Действует с:',
								disabled: false,
							}}
							format={'DD.MM.YYYY'}
						/>
					</Col>
				</Row>
				<Title level={5}>Технологические операции</Title>
				<Layout style={{border: '1px solid #DFDFDF'}}>
					<TechOperTableHeader />
					<Table
						itemProps={{name: 'techOperations'}}
						rowKey={'id'}
						requestLoadRows={loadTechOperationsHandler}
						requestLoadConfig={apiGetConfigByName('techOperations')}
						customFields={[
							{
								name: 'id',
								value: (row) => (row.id ? row.id : uuid()),
							},
							{
								name: 'techMapId',
								value: () => techMapId,
							},
							{
								name: 'code',
								value: (row, rows) =>
									parseInt(
										rows.reduce(
											(max, current) =>
												parseInt(current.code) > max
													? current.code
													: max,
											0
										)
									) + 1,
							},
							{
								name: 'position',
								value: (row, rows) => rows.length + 1,
							},
						]}
						customColumnProps={formCustomColumnProps}
						dispatch={{path: 'techMaps.techOperations.table'}}
						subscribe={[
							/** Add table Items */
							{
								name: 'techOperationAddOnLocal',
								path:
									'rtd.techMaps.techOperations.table.modal.events.onAddRow',
								onChange: ({value, addRow}) => {
									value && addRow(value.value);
								},
							},
							/** Edit table Items */
							{
								name: 'techOperationEditOnLocal',
								path:
									'rtd.techMaps.techOperations.table.modal.events.onEditRow',
								onChange: ({value, editRow}) => {
									value && editRow(value.value);
								},
							},
							{
								name: 'techOperationDeleteOnLocal',
								path:
									'rtd.techMaps.techOperations.table.events.btnDelete',
								onChange: ({removeRow}) => {
									removeRow();
								},
							},
							{
								name: 'onClickMoveUp',
								path:
									'rtd.techMaps.techOperations.table.actions.onClickMoveUp',
								onChange: ({moveUpRow}) => moveUpRow(),
							},
							{
								name: 'onClickMoveDown',
								path:
									'rtd.techMaps.techOperations.table.actions.onClickMoveDown',
								onChange: ({moveDownRow}) => moveDownRow(),
							},
						]}
					/>
				</Layout>
			</FormBody>
			<FormFooter>
				<Button className={'mr-8'} onClick={() => history.goBack()}>
					Закрыть
				</Button>
				<Button type={'primary'} htmlType={'submit'}>
					Сохранить
				</Button>
			</FormFooter>
		</Form>
	);
};
