import React, {useState, useEffect} from 'react';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {Input as AntInput} from 'antd';

const IIInput = ({onChange, value}) => {
	const [_value, setValue] = useState();

	useEffect(() => {
		setValue(value);
	}, [value]);

	const onChangeHandler = (e) => {
		// setValue(e.target.value)
		onChange(e.target.value);
	};

	return <AntInput onChange={onChangeHandler} value={_value} />;
};

const DocExample = () => {
	const {
		Form,
		FormHeader,
		FormBody,
		FormFooter,
		Space,
		Row,
		Col,
		Layout,
		Tabs,
		TabPane,

		Button,
		Title,
		Text,
		Divider,
		Checkbox,
		DatePicker,
		DateText,
		Input,
		Search,
		TextArea,
		Password,
		InputNumber,
		Switch,
		RadioGroup,
		Select,
		TreeSelect,
		Table,
		Modal,
		Custom,
		Switcher,
	} = classic;
	return (
		<BasePage>
			<Form labelCol={{span: 8}} wrapperCol={{span: 16}}>
				<FormHeader>
					<Title className={'mb-0'} level={3}>
						Reload table page
					</Title>
				</FormHeader>
				<FormBody noPadding={true} scrollable={true}>
					<Tabs defaultActiveKey='2' type='card'>
						<TabPane tab='OnlineFilter' key='1'>
							<Layout>
								<Row>
									<Col span={12}>
										<Select
											itemProps={{
												label: 'Select',
												name: 'status',
												className: 'mb-0',
											}}
											// widthControl={'250px'}
											requestLoadRows={apiGetFlatDataByConfigName(
												'defectStatusesProcess'
											)}
											optionConverter={(option) => ({
												label: (
													<span>{option.name}</span>
												),
												value: option.id,
											})}
											dispatch={{
												path:
													'example.form.table.filter.statusProcessId',
											}}
										/>
									</Col>
									<Col span={12}>
										<TreeSelect
											itemProps={{
												label: 'TreeSelect',
												name: 'treeSelect',
											}}
											treeCheckable={true}
											treeCheckStrictly={false}
											treeDefaultExpandAll={true}
											requestLoadRows={apiGetHierarchicalDataByConfigName(
												'equipments'
											)}
											dropdownMatchSelectWidth={400}
											optionConverter={(option) => {
												return {
													label: (
														<span>
															{option.name}
														</span>
													),
													value: option.id,
													children: option.children,
													checkable: !option.isGroup,
													selectable: !option.isGroup,
												};
											}}
											dispatch={{
												path:
													'example.form.table.filter.equipmentId',
											}}
										/>
									</Col>
								</Row>
								<Table
									itemProps={{name: 'table'}}
									requestLoadRows={apiGetFlatDataByConfigName(
										'defects'
									)}
									requestLoadConfig={apiGetConfigByName(
										'defects'
									)}
									subscribe={[
										{
											name: 'defectStatus',
											path:
												'rtd.example.form.table.filter.statusProcessId',
											extraData:
												'rtd.example.form.table.filter',
											onChange: ({
												extraData,
												reloadTable,
											}) => {
												reloadTable({
													filter: extraData,
												});
											},
										},
										{
											name: 'defectEquipments',
											path:
												'rtd.example.form.table.filter.equipmentId',
											extraData:
												'rtd.example.form.table.filter',
											onChange: ({
												extraData,
												reloadTable,
											}) => {
												reloadTable({
													filter: extraData,
												});
											},
										},
										{
											name: 'onReloadTable',
											path:
												'rtd.example.form.table.events.onReloadTable',
											extraData:
												'rtd.example.form.table.filter',
											onChange: ({
												extraData,
												reloadTable,
											}) => {
												reloadTable({
													filter: extraData,
												});
											},
										},
									]}
								/>
							</Layout>
						</TabPane>
						<TabPane tab='Form' key='2' scrollable={true}>
							<Layout>
								<Text itemProps={{label: 'Text'}}>
									{' '}
									Some text{' '}
								</Text>
								<Button
									itemProps={{label: 'Button'}}
									dispatch={{
										path:
											'example.form.table.events.onReloadTable',
										type: 'event',
									}}
								>
									{' '}
									Reload table on first Tab
								</Button>
								<Checkbox itemProps={{label: 'Checkbox'}}>
									{' '}
									Check Any
								</Checkbox>
								<DatePicker
									itemProps={{label: 'DatePicker'}}
									format={'DD.MM.YYYY'}
								/>
								<Input itemProps={{label: 'Input'}} />
								<Search itemProps={{label: 'Search'}} />
								<TextArea itemProps={{label: 'TextArea'}} />
								<Password itemProps={{label: 'Password'}} />
								<InputNumber
									itemProps={{label: 'InputNumber'}}
								/>
								<Divider />
								<Switch itemProps={{label: 'Switch'}} />
								<RadioGroup
									itemProps={{
										label:
											'RadioGroup. Click for use Switcher',
										name: 'SwitcherRadioGroup',
									}}
									dispatch={{
										path:
											'example.form.tab3.SwitcherRadioGroup',
									}}
									optionType={'button'}
									buttonStyle={'solid'}
									options={[
										{label: 'Table #1', value: 0},
										{label: 'Table #2', value: 1},
									]}
								/>
								<Switcher
									subscribe={[
										{
											name: 'SwitcherRadioGroup',
											path:
												'rtd.example.form.tab3.SwitcherRadioGroup',
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												setSubscribeProps({
													value: value,
												});
											},
										},
									]}
								>
									<Button itemProps={{label: 'Button'}}>
										First Button in Switcher
									</Button>
									<Button itemProps={{label: 'Button'}}>
										Second Button in Switcher
									</Button>
								</Switcher>
								{/*My component*/}
								<Custom
									itemProps={{
										label: 'Custom',
										name: 'custom',
									}}
									subscribe={[
										{
											name: 'SwitcherRadioGroup',
											path:
												'rtd.example.form.tab3.SwitcherRadioGroup',
											onChange: ({
												value,
												setSubscribeProps,
											}) => {
												console.log('Custom subscribe');
												setSubscribeProps({
													value: value,
												});
											},
										},
									]}
								>
									<IIInput />
								</Custom>
								<Row itemProps={{label: 'Row'}}>
									<Col span={8}>
										<Button>Col 8 btn</Button>
									</Col>
									<Col span={16}>
										<Button>Col 16 btn</Button>
									</Col>
								</Row>
								<Space itemProps={{label: 'Space and Row'}}>
									<Button>Space 1</Button>
									<Button>Space 2</Button>
								</Space>
							</Layout>
						</TabPane>
						<TabPane tab='Tab 3' key='3'>
							<Layout>
								<Space direction='vertical'>
									<Modal
										toolTipProps={{title: 'Add'}}
										buttonProps={{label: 'Add'}}
										modalConfig={{
											type: 'addOnLocal',
											title: `Создать элемент`,
											form: {
												name: 'addModalExample',
												labelCol: {span: 10},
												wrapperCol: {span: 12},
											},
										}}
										dispatch={{
											path:
												'example.form.tab3.addModalExample',
										}}
									>
										<FormBody
											noPadding={false}
											scrollable={false}
										>
											<InputNumber
												itemProps={{
													label: 'Код',
													name: 'code',
												}}
											/>
											<Input
												itemProps={{
													label: 'Нименование',
													name: 'name',
												}}
											/>
											<DatePicker
												itemProps={{
													label: 'DatePicker',
													name: 'modalDate',
												}}
												format={'DD.MM.YYYY'}
											/>
										</FormBody>
									</Modal>

									<TextArea
										itemProps={{
											label: 'Data modal to JSON',
										}}
										rows={4}
										subscribe={[
											{
												name: 'addModalExample',
												path:
													'rtd.example.form.tab3.addModalExample',
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														value: JSON.stringify(
															value,
															null,
															4
														),
													});
												},
											},
										]}
									/>
									<DateText
										itemProps={{
											label: 'Date modal as text',
										}}
										format={'DD.MM.YYYY'}
										subscribe={[
											{
												name: 'addModalExample',
												path:
													'rtd.example.form.tab3.addModalExample',
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														value: value.modalDate,
													});
												},
											},
										]}
									/>
								</Space>
							</Layout>
						</TabPane>
					</Tabs>
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

export default DocExample;
