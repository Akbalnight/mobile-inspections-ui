import React from 'react';
import {classic} from 'rt-design';
import {BasePage} from 'mobile-inspections-base-ui';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveFileByConfigName,
} from '../../../apis/application.api';
import {EditOutlined, MehOutlined, ReloadOutlined} from '@ant-design/icons';
const {
	Form,
	Select,
	Button,
	RadioGroup,
	TreeSelect,
	Table,
	FormHeader,
	FormBody,
	FormFooter,
	Title,
	Modal,
	InputNumber,
	Input,
	Space,
	UploadFile,
	Col,
} = classic;

const DebugJSX = () => {
	// console.log(classic);

	const ffff = {
		optionType: 'button',
		buttonStyle: 'solid',
		// dispatch: {
		//     path: 'debug.form.mode.onChange',
		// },
		options: [
			{
				label: 'Table #1',
				value: 0,
			},
			{
				label: 'Table #2',
				value: 1,
			},
		],
	};

	const selectProps = {
		autoClearSearchValue: true,
		showSearch: true,
		searchParamName: 'name',
		showArrow: true,
		filterOption: false,
		// widthControl: '250px',
		dropdownMatchSelectWidth: 400,
		mode: 'multiple',
		allowClear: true,
		infinityMode: true,
		requestLoadRows: apiGetFlatDataByConfigName('routes'),
		optionConverter: (option) => ({
			label: (
				<span>
					{' '}
					<MehOutlined /> [{option.name}]{' '}
				</span>
			),
			value: option.id,
			className: '',
			disabled: undefined,
		}),
		dispatch: {
			path: 'debug.form.table.events.onSelectRoute',
			type: 'event',
		},
	};

	// let isDragging = false;
	// let lastX = null;
	// let width = 200;

	return (
		<BasePage>
			<Form labelCol={{span: 2}} wrapperCol={{span: 22}}>
				<FormHeader>
					<Title className={'mb-0'} level={3}>
						Создание контрольной точки
					</Title>
				</FormHeader>
				<FormBody noPadding={false} scrollable={false}>
					<Space>
						<Modal
							toolTipProps={{title: 'ddw'}}
							buttonProps={{
								type: 'default',
								label: (
									<span>
										{' '}
										<EditOutlined /> Edit{' '}
									</span>
								),
								// className: 'ml-4 mr-8',
								disabled: true,
							}}
							modalConfig={{
								type: 'editOnLocal',
								title: `Изменить элемент`,
								// width: 600,
								// bodyStyle: {height: 320},
								form: {
									name: 'editModalDebug',
									labelCol: {span: 10},
									wrapperCol: {span: 12},
									loadInitData: (callBack, row) => {
										console.log('editModalDebug => ', row);
										callBack(row);
									},
								},
							}}
							dispatch={{
								path: '2debug.form.table.events.onEditModal',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'tableCloseInfo',
									path: 'rtd.2debug.form.table.selected',
									onChange: ({
										value,
										setModalData,
										setButtonProps,
									}) => {
										// console.log('buttonCloseWithNote value => ', value);
										value &&
											setModalData &&
											setModalData(value);
										setButtonProps &&
											setButtonProps({disabled: !value});
									},
								},
							]}
						>
							<FormBody noPadding={false} scrollable={false}>
								<InputNumber
									itemProps={{label: 'Код', name: 'code'}}
								/>
								<Input
									itemProps={{
										label: 'Нименование',
										name: 'name',
									}}
								/>
							</FormBody>
						</Modal>
						<UploadFile
							itemProps={{name: 'upload'}}
							requestUploadFile={apiSaveFileByConfigName(
								'routeMapFileSave'
							)}
							dataObject={{
								routeMap: {
									id: null,
									routeId:
										'ad524bdf-d42d-4dea-82ca-dee022dbcaeb',
									fileId: null,
									position: 3,
								},
							}}
							dispatch={{path: '2debug.form.uploadFile'}}
						/>
					</Space>
					<RadioGroup
						itemProps={{label: 'Mode', name: 'mode'}}
						{...ffff}
					/>
					<Select
						{...selectProps}
						itemProps={{label: 'Select', name: 'selectse2'}}
					/>
					<TreeSelect
						itemProps={{label: 'TreeSelect', name: 'treeSelect'}}
						treeCheckable={true}
						treeCheckStrictly={false}
						// onChange={console.log}
						treeDefaultExpandAll={true}
						requestLoadRows={apiGetHierarchicalDataByConfigName(
							'controlPoints'
						)}
						dropdownMatchSelectWidth={400}
						optionConverter={(option) => {
							// console.log('optionConverter => ', option)
							return {
								label: (
									<span>
										{' '}
										<MehOutlined /> [{option.name}]{' '}
									</span>
								),
								value: option.id,
								children: option.children,
								checkable: !option.isGroup,
								selectable: !option.isGroup,
							};
						}}
					/>
					<Button
						dispatch={{
							path: 'debug.form.table.events.onApplyFilter',
							extraData: 'rtd.debug.form.table.filter',
							type: 'event',
						}}
						htmlType={'submit'}
					>
						Download
					</Button>
					<div style={{display: 'flex', flex: '1 1 auto'}}>
						<Col span={12}>
							<Table
								itemProps={{name: 'table'}}
								requestLoadRows={apiGetFlatDataByConfigName(
									'routes'
								)}
								requestLoadConfig={apiGetConfigByName('routes')}
								dispatch={{path: '2debug.form.table'}}
								subscribe={[
									{
										/** Обработчик события на сохранение модалки */
										name: 'onEditModal',
										path: 'rtd.2debug.form.table.events.onEditModal',
										onChange: ({value, editRow}) => {
											editRow(value.value);
										},
									},
								]}
								footerProps={{
									leftCustomSideElement: () => (
										<Button>
											<ReloadOutlined />
											Any load
										</Button>
									),
									rightCustomSideElement: [
										{
											componentType: 'Item',
											child: {
												componentType: 'Button',
												label: (
													<span>
														{' '}
														<ReloadOutlined />{' '}
														Reload{' '}
													</span>
												),
												dispatch: {
													path: 'debug.form.table.events.onReload',
													type: 'event',
												},
											},
										},
									],
								}}
							/>
						</Col>
						<Col span={12}>
							<Table
								itemProps={{name: 'table'}}
								requestLoadRows={apiGetFlatDataByConfigName(
									'routeMaps'
								)}
								requestLoadConfig={apiGetConfigByName(
									'routeMaps'
								)} //
								subscribe={[
									{
										/** Обработчик события на сохранение модалки */
										name: 'uploadFile',
										path: 'rtd.2debug.form.uploadFile',
										onChange: ({reloadTable}) => {
											reloadTable({});
										},
									},
								]}
							/>
						</Col>
					</div>
				</FormBody>
				<FormFooter>
					<Button className={'mr-8'} onClick={console.log()}>
						Закрыть
					</Button>
					<Button
						className={'mr-8'}
						type={'primary'}
						htmlType={'submit'}
					>
						Сохранить
					</Button>
				</FormFooter>
			</Form>
		</BasePage>
	);
};

DebugJSX.propTypes = {};

export default DebugJSX;
