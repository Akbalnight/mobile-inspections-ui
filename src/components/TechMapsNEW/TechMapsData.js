import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	// Form,
	notificationError,
} from 'rt-design';
import {classic} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveTechMap,
} from '../../apis/catalog.api';
import {useHistory, useParams} from 'react-router';
import {paths} from '../../constants/paths';
import {
	DeleteOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
} from '@ant-design/icons';
import {
	AddTechOperationButton,
	EditTechOperationButton,
} from './Modals/EditModal';
import {code, duration, position} from '../Base/customColumnProps';
import {Checkbox} from 'antd';

const {
	Form,
	FormHeader,
	FormBody,
	FormFooter,
	Input,
	Select,
	InputNumber,
	Title,
	TreeSelect,
	Button,
	Table,
	DatePicker,
	Row,
	Col,
	Layout,
	Space,
} = classic;

export const TechMapsAdd = () => {
	return (
		<BasePage>
			<TechMapsData />
		</BasePage>
	);
};

export const TechMapsEdit = () => {
	const pageParams = useParams();

	return (
		<BasePage>
			<TechMapsData techMapId={pageParams.id} />
		</BasePage>
	);
};

export const customColumnProps = [
	{...code},
	{...position, width: '50px', align: 'center'},
	{...duration},
	{
		name: 'needInputData',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
	{
		name: 'equipmentStop',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
	{
		name: 'increasedDanger',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
];
const TechMapsData = (props) => {
	// console.log('props', props)
	const {techMapId} = props;
	const pageParams = useParams();
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
			techMapId: !pageParams.id ? null : pageParams.id,
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
					{/*<Col span={4}>*/}
					{techMapId ? (
						<InputNumber
							itemProps={{
								name: 'code',
								label: 'Код',
								hidden: true,
							}}
						/>
					) : null}
					{/*</Col>*/}
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
				<Layout className={'mb-16'}>
					<Title level={5}>Технологические операции</Title>
					<Space className={'mb-8'}>
						<AddTechOperationButton />
						<EditTechOperationButton />
						<Button
							itemProps={{name: 'btnDelete'}}
							icon={<DeleteOutlined />}
							type={'default'}
							disabled={true}
							dispatch={{
								path:
									'techMaps.techOperations.btnDelete.events',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'onTechMapsTechOperationsSelect',
									path:
										'rtd.techMaps.techOperations.table.selected',
									onChange: ({value, setSubscribeProps}) => {
										value
											? setSubscribeProps({
													disabled: false,
											  })
											: setSubscribeProps({
													disabled: true,
											  });
									},
								},
							]}
						/>
						<Button
							icon={<ArrowUpOutlined />}
							disabled={true}
							dispatch={{
								path:
									'techMaps.techOperations.table.actions.onClickMoveUp',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'btnUp',
									path:
										'rtd.techMaps.techOperations.table.selected',
									onChange: ({value, setSubscribeProps}) => {
										value &&
											setSubscribeProps &&
											setSubscribeProps({
												disabled: !value,
											});
									},
								},
							]}
						/>
						<Button
							icon={<ArrowDownOutlined />}
							disabled={true}
							dispatch={{
								path:
									'techMaps.techOperations.table.actions.onClickMoveDown',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'btnUp',
									path:
										'rtd.techMaps.techOperations.table.selected',
									onChange: ({value, setSubscribeProps}) => {
										value &&
											setSubscribeProps &&
											setSubscribeProps({
												disabled: !value,
											});
									},
								},
							]}
						/>
					</Space>
					<Table
						itemProps={{name: 'techOperations'}}
						rowKey={'id'}
						requestLoadRows={loadTechOperationsHandler}
						requestLoadConfig={apiGetConfigByName('techOperations')}
						customFields={[
							{
								name: 'techOperationId',
								value: (row) => row.id,
								validate: (row, rows) => {
									// console.log('row tech maps selected:', row)
									return !row.isGroup
										? !rows
												.map((row) => row.techMapId)
												.includes(row.id)
										: false;
								},
							},
							{
								name: 'id',
								value: () => null,
							},
							{
								name: 'techMapId',
								value: () => techMapId,
							},
						]}
						customColumnProps={customColumnProps}
						dispatchPath={'techMaps.techOperations.table'}
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
									'rtd.techMaps.techOperations.btnDelete.events',

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
