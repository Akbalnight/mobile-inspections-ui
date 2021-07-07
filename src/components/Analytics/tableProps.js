import React, {useState} from 'react';
import {Drawer} from 'antd';
import {
	Custom,
	Space,
	Button,
	Select,
	TreeSelect,
	DatePicker,
	Text,
	Title,
	UploadFile,
	Checkbox,
	Divider,
	Search,
} from 'rt-design';
import {Access} from 'mobile-inspections-base-ui';
import {
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../apis/catalog.api';
import {reloadFilterFields} from '../Base/Functions/ReloadField';
import {disabledEndDate, disabledStartDate} from '../Base/Functions/DateLimits';
import {FolderOutlined, ReloadOutlined, ToolOutlined} from '@ant-design/icons';
import {StatusIcon} from '../Defects/tableProps';

export const DrawerChoose = ({analyticName}) => {
	const [visibleDrawer, setVisibleDrawer] = useState(false);

	return (
		<Custom
			itemProps={{name: 'drawerField'}}
			render={({onChange}) => (
				<Drawer
					width={520}
					// placement={'top'}
					visible={visibleDrawer}
					closable={true}
					onClose={() => setVisibleDrawer((state) => !state)}
				>
					<Title level={4}>Панель фильтрации</Title>
					<Space
						className={'py-8'}
						direction={'vertical'}
						style={{
							height: '100%',
							justifyContent: 'space-between',
						}}
					>
						<Space direction={'vertical'}>
							<Space direction={'vertical'}>
								<Text label={'Период:'} className={'ml-16'} />
								<Space className={'ml-8'}>
									<DatePicker
										itemProps={{
											name: 'startDate',
											label: 'с',
											className: 'mb-0',
										}}
										format={'DD-MM-YYYY HH:mm:ss'}
										onChange={(date, dateString) =>
											date?.startOf('day')
										}
										dispatch={{
											path: `analytic.${analyticName}Table.filter.events.startDate`,
										}}
										subscribe={[
											{
												name: 'finishDate',
												path: `rtd.analytic.${analyticName}Table.filter.events.finishDate`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														disabledDate: (
															startValue
														) =>
															disabledStartDate(
																startValue,
																value
															),
													});
												},
											},
											reloadFilterFields(
												`analytic.${analyticName}Table.filter.events.onReload`
											),
										]}
									/>
									<DatePicker
										itemProps={{
											name: 'finishDate',
											label: 'по',
											className: 'mb-0',
										}}
										format={'DD-MM-YYYY HH:mm:ss'}
										onChange={(date, dateString) =>
											date?.endOf('day')
										}
										dispatch={{
											path: `analytic.${analyticName}Table.filter.events.finishDate`,
										}}
										subscribe={[
											{
												name: 'startDate',
												path: `rtd.analytic.${analyticName}Table.filter.events.startDate`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														disabledDate: (
															endValue
														) =>
															disabledEndDate(
																value,
																endValue
															),
													});
												},
											},
											reloadFilterFields(
												`analytic.${analyticName}Table.filter.events.onReload`
											),
										]}
									/>
								</Space>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text>Приоритет Панели проблем</Text>
								<Select
									itemProps={{name: 'panelProblemPriority'}}
									autoClearSearchValue={true}
									showSearch={true}
									searchParamName={'name'}
									showArrow={true}
									filterOption={false}
									widthControl={220}
									mode={'single'}
									allowClear={true}
									placeholder={'Выберите приоритет'}
									requestLoadRows={apiGetFlatDataByConfigName(
										'panelProblemsPriorities'
									)}
									optionConverter={(option) => ({
										label: <span>{option.name}</span>,
										value: option.id,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.panelPriority`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Типовой дефект:'} />
								<Select
									itemProps={{name: 'defectTypicalId'}}
									placeholder={'Выберите типовой дефект'}
									mode={'multiple'}
									allowClear={true}
									showSearch={true}
									filterOption={false}
									widthControl={220}
									searchParamName={'name'}
									requestLoadRows={({data, params}) =>
										apiGetFlatDataByConfigName(
											'defectTypical'
										)({
											data: {...data, isGroup: false},
											params,
										})
									}
									optionConverter={(option) => ({
										value: option.id,
										label: option.name,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.defectTypicalId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Ответственный:'} />
								<Select
									itemProps={{name: 'staffEliminationId'}}
									placeholder={'Выберите сотрудника'}
									mode={'single'}
									allowClear={true}
									showSearch={true}
									filterOption={false}
									widthControl={220}
									searchParamName={'username'}
									requestLoadRows={apiGetFlatDataByConfigName(
										'staff'
									)}
									optionConverter={(option) => ({
										value: option.id,
										label: option.username,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.staffEliminationId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Обнаружил:'} />
								<Select
									itemProps={{name: 'staffDetectId'}}
									placeholder={'Выберите сотрудника'}
									mode={'single'}
									allowClear={true}
									showSearch={true}
									filterOption={false}
									widthControl={220}
									searchParamName={'username'}
									requestLoadRows={apiGetFlatDataByConfigName(
										'staff'
									)}
									optionConverter={(option) => ({
										value: option.id,
										label: option.username,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.staffDetectId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text className={'mb-0'}>Статус обработки</Text>
								<Select
									itemProps={{name: 'selectId'}}
									autoClearSearchValue={true}
									showSearch={true}
									searchParamName={'name'}
									showArrow={true}
									filterOption={false}
									widthControl={220}
									mode={'single'}
									allowClear={true}
									requestLoadRows={apiGetFlatDataByConfigName(
										'defectStatusesProcess'
									)}
									optionConverter={(option) => ({
										label: (
											<>
												<StatusIcon
													statusId={option.id}
													keyToFind={
														'statusProcessId'
													}
												/>{' '}
												<span className={'ml-8'}>
													{option.name}
												</span>
											</>
										),
										value: option.id,
										className: '',
										disabled: undefined,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.statusProcessId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Оборудование:'} />
								<TreeSelect
									style={{width: '220px'}}
									itemProps={{name: 'equipmentId'}}
									// widthControl={3000}
									treeCheckStrictly={false}
									treeDefaultExpandAll={true}
									requestLoadRows={({data, params}) =>
										apiGetHierarchicalDataByConfigName(
											'equipments'
										)({
											data: {...data, isGroup: false},
											params,
										})
									}
									optionConverter={(option) => ({
										value: option.id, //change
										label: (
											<span>
												{option.isGroup ? (
													<FolderOutlined />
												) : (
													<ToolOutlined />
												)}{' '}
												{option.techPlacePath}
											</span>
										),
										children: option.children,
									})}
								/>
							</Space>

							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Маршрут:'} />
								<Select
									itemProps={{name: 'routeId'}}
									placeholder={'Выберите маршрут'}
									mode={'single'}
									allowClear={true}
									showSearch={true}
									filterOption={false}
									searchParamName={'name'}
									widthControl={220}
									requestLoadRows={apiGetFlatDataByConfigName(
										'routes'
									)}
									optionConverter={(option) => ({
										value: option.id,
										label: option.name,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.routeId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Обходчик:'} />
								<Select
									itemProps={{name: 'staffId'}}
									placeholder={'Выберите исполнителя'}
									mode={'single'}
									allowClear={true}
									showSearch={true}
									filterOption={false}
									widthControl={220}
									searchParamName={'username'}
									requestLoadRows={apiGetFlatDataByConfigName(
										'staff'
									)}
									optionConverter={(option) => ({
										value: option.id,
										label: option.username,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.staffId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
						</Space>
						<Space
							direction={'vertical'}
							style={{justifyContent: 'space-between'}}
							className={'mr-8'}
						>
							<Text
								label={'Период:'}
								itemProps={{hidden: true}}
								hidden={true}
							/>
							<Space>
								<Button
									className={'mt-4'}
									type={'primary'}
									dispatch={{
										path: `analytic.${analyticName}Table.table.onApplyFilter`,
										extraData: `rtd.analytic.${analyticName}Table.filter.events`,
										type: 'event',
									}}
								>
									Применить
								</Button>
								<Button
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.onReload`,
									}}
								>
									Сбросить
								</Button>
							</Space>
						</Space>
					</Space>
				</Drawer>
			)}
			subscribe={[
				{
					name: 'openDrawer',
					path: `rtd.analytic.${analyticName}Table.table.filterCheckbox`,
					onChange: ({value}) => {
						value && setVisibleDrawer(value);
					},
				},
			]}
		/>
	);
};

export const TableHeaderAnalytics = ({analyticName}) => {
	const configAnalyticName = (analyticName) => {
		switch (analyticName) {
			case 'defects':
				return (
					<>
						<Access
							roles={[
								'ROLE_ADMIN',
								'ROLE_MI_ADMIN',
								'ROLE_MI_SHIFT_SUPERVISOR',
							]}
						>
							<Space
								direction={'vertical'}
								className={'mr-8 ml-8'}
							>
								<Text className={'mb-0 ml-1'}>
									Период обнаружения
								</Text>
								<Space>
									<DatePicker
										itemProps={{
											name: 'dateDetectDefectStart',
											label: 'c',
											className: 'mb-0',
										}}
										onChange={(date, dateString) =>
											date?.startOf('day')
										}
										dispatch={{
											path: `analytic.${analyticName}Table.filter.events.detectStartDate`,
										}}
										subscribe={[
											{
												name: 'startDate',
												path: `rtd.analytic.${analyticName}Table.filter.events.detectEndDate`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														disabledDate: (
															startValue
														) =>
															disabledStartDate(
																startValue,
																value
															),
													});
												},
											},
											reloadFilterFields(
												`analytic.${analyticName}Table.filter.events.onReload`
											),
										]}
									/>
									<DatePicker
										itemProps={{
											name: 'dateDetectDefectEnd',
											label: 'по',
											className: 'mb-0',
										}}
										onChange={(date, dateString) =>
											date?.endOf('day')
										}
										dispatch={{
											path: `analytic.${analyticName}Table.filter.events.detectEndDate`,
										}}
										subscribe={[
											{
												name: 'endDate',
												path: `rtd.analytic.${analyticName}Table.filter.events.detectStartDate`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														disabledDate: (
															endValue
														) =>
															disabledEndDate(
																value,
																endValue
															),
													});
												},
											},
											reloadFilterFields(
												`analytic.${analyticName}Table.filter.events.onReload`
											),
										]}
									/>
								</Space>
							</Space>
							<Space direction={'vertical'} className={'mr-8'}>
								<Text className={'mb-0 ml-16'}>
									Период устранения
								</Text>
								<Space>
									<DatePicker
										itemProps={{
											name: 'dateEliminationPlan',
											label: 'c',
											className: 'mb-0',
										}}
										onChange={(date, dateString) =>
											date?.startOf('day')
										}
										dispatch={{
											path: `analytic.${analyticName}Table.filter.events.eliminateStartDate`,
										}}
										subscribe={[
											{
												name: 'startDate',
												path: `rtd.analytic.${analyticName}Table.filter.events.eliminateEndDate`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														disabledDate: (
															startValue
														) =>
															disabledStartDate(
																startValue,
																value
															),
													});
												},
											},
											reloadFilterFields(
												`analytic.${analyticName}Table.filter.events.onReload`
											),
										]}
									/>
									<DatePicker
										itemProps={{
											name: 'dateEliminationFact',
											label: 'по',
											className: 'mb-0',
										}}
										onChange={(date, dateString) =>
											date?.endOf('day')
										}
										dispatch={{
											path: `analytic.${analyticName}Table.filter.events.eliminateEndDate`,
										}}
										subscribe={[
											{
												name: 'endDate',
												path: `rtd.analytic.${analyticName}Table.filter.events.eliminateStartDate`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														disabledDate: (
															endValue
														) =>
															disabledEndDate(
																value,
																endValue
															),
													});
												},
											},
											reloadFilterFields(
												`analytic.${analyticName}Table.filter.events.onReload`
											),
										]}
									/>
								</Space>
							</Space>
							<Space direction={'vertical'}>
								<Text>Приоритет Панели проблем</Text>
								<Select
									itemProps={{name: 'panelProblemPriority'}}
									autoClearSearchValue={true}
									showSearch={true}
									searchParamName={'name'}
									showArrow={true}
									filterOption={false}
									widthControl={170}
									mode={'single'}
									allowClear={true}
									placeholder={'Выберите приоритет'}
									requestLoadRows={apiGetFlatDataByConfigName(
										'panelProblemsPriorities'
									)}
									optionConverter={(option) => ({
										label: <span>{option.name}</span>,
										value: option.id,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.panelPriority`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Типовой дефект:'} />
								<Select
									itemProps={{name: 'defectTypicalId'}}
									placeholder={'Выберите дефект'}
									mode={'multiple'}
									allowClear={true}
									showSearch={true}
									filterOption={false}
									widthControl={170}
									searchParamName={'name'}
									requestLoadRows={({data, params}) =>
										apiGetFlatDataByConfigName(
											'defectTypical'
										)({
											data: {...data, isGroup: false},
											params,
										})
									}
									optionConverter={(option) => ({
										value: option.id,
										label: option.name,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.defectTypicalId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Ответственный:'} />
								<Select
									itemProps={{name: 'staffEliminationId'}}
									placeholder={'Выберите сотрудника'}
									mode={'single'}
									allowClear={true}
									showSearch={true}
									filterOption={false}
									widthControl={170}
									searchParamName={'username'}
									requestLoadRows={apiGetFlatDataByConfigName(
										'staff'
									)}
									optionConverter={(option) => ({
										value: option.id,
										label: option.username,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.staffEliminationId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
						</Access>
					</>
				);
			case 'detours':
				return (
					<>
						<Access
							roles={[
								'ROLE_ADMIN',
								'ROLE_MI_ADMIN',
								'ROLE_MI_SHIFT_SUPERVISOR',
							]}
						>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Маршрут:'} />
								<Select
									itemProps={{name: 'routeId'}}
									placeholder={'Выберите маршрут'}
									mode={'single'}
									allowClear={true}
									showSearch={true}
									filterOption={false}
									searchParamName={'name'}
									widthControl={200}
									requestLoadRows={apiGetFlatDataByConfigName(
										'routes'
									)}
									optionConverter={(option) => ({
										value: option.id,
										label: option.name,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.routeId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Исполнитель:'} />
								<Select
									itemProps={{name: 'staffId'}}
									placeholder={'Выберите исполнителя'}
									mode={'single'}
									allowClear={true}
									showSearch={true}
									filterOption={false}
									widthControl={200}
									searchParamName={'username'}
									requestLoadRows={apiGetFlatDataByConfigName(
										'staff'
									)}
									optionConverter={(option) => ({
										value: option.id,
										label: option.username,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.staffId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>
							<Space direction={'vertical'} className={'ml-8'}>
								<Text label={'Типовой дефект:'} />
								<Select
									itemProps={{name: 'defectTypicalId'}}
									placeholder={'Выберите типовой дефект'}
									mode={'multiple'}
									allowClear={true}
									showSearch={true}
									filterOption={false}
									widthControl={200}
									searchParamName={'name'}
									requestLoadRows={({data, params}) =>
										apiGetFlatDataByConfigName(
											'defectTypical'
										)({
											data: {...data, isGroup: false},
											params,
										})
									}
									optionConverter={(option) => ({
										value: option.id,
										label: option.name,
									})}
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.defectTypicalId`,
									}}
									subscribe={[
										reloadFilterFields(
											`analytic.${analyticName}Table.filter.events.onReload`
										),
									]}
								/>
							</Space>

							<Space direction={'vertical'}>
								<Text label={'Период:'} className={'ml-16'} />
								<Space className={'ml-8'}>
									<DatePicker
										itemProps={{
											name: 'startDate',
											label: 'с',
											className: 'mb-0',
										}}
										format={'DD-MM-YYYY HH:mm:ss'}
										onChange={(date, dateString) =>
											date?.startOf('day')
										}
										dispatch={{
											path: `analytic.${analyticName}Table.filter.events.startDate`,
										}}
										subscribe={[
											{
												name: 'finishDate',
												path: `rtd.analytic.${analyticName}Table.filter.events.finishDate`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														disabledDate: (
															startValue
														) =>
															disabledStartDate(
																startValue,
																value
															),
													});
												},
											},
											reloadFilterFields(
												`analytic.${analyticName}Table.filter.events.onReload`
											),
										]}
									/>
									<DatePicker
										itemProps={{
											name: 'finishDate',
											label: 'по',
											className: 'mb-0',
										}}
										format={'DD-MM-YYYY HH:mm:ss'}
										onChange={(date, dateString) =>
											date?.endOf('day')
										}
										dispatch={{
											path: `analytic.${analyticName}Table.filter.events.finishDate`,
										}}
										subscribe={[
											{
												name: 'startDate',
												path: `rtd.analytic.${analyticName}Table.filter.events.startDate`,
												onChange: ({
													value,
													setSubscribeProps,
												}) => {
													setSubscribeProps({
														disabledDate: (
															endValue
														) =>
															disabledEndDate(
																value,
																endValue
															),
													});
												},
											},
											reloadFilterFields(
												`analytic.${analyticName}Table.filter.events.onReload`
											),
										]}
									/>
								</Space>
							</Space>
						</Access>
					</>
				);
			default:
				return <div>2</div>;
		}
	};

	return (
		<Space direction={'vertical'} className={'py-8'}>
			<Space
				className={'px-8'}
				style={{justifyContent: 'space-between', width: '100%'}}
			>
				<Space>
					<UploadFile />
					{analyticName === 'constructorReports' ? (
						<Checkbox
							itemProps={{
								name: 'filterChoose',
								valuePropName: 'checked',
							}}
							label={'Применить фильтры'}
							dispatch={{
								path: `analytic.${analyticName}Table.table.filterCheckbox`,
							}}
						/>
					) : null}

					<Button
						icon={<ReloadOutlined />}
						hidden={true}
						subscribe={[
							/** Action search activate btn*/
							{
								name: 'onSearchPush',
								path: `rtd.analytic.${analyticName}Table.filter.events.onSearch`,
								onChange: ({value, setSubscribeProps}) => {
									value &&
										setSubscribeProps &&
										setSubscribeProps({hidden: !value});
								},
							},
							/** Action reload in mainForm.table deactivate btn*/
							{
								name: 'onReloadPush',
								path: `rtd.analytic.${analyticName}Table.table.rows`,
								onChange: ({value, setSubscribeProps}) => {
									/** We might thinking about ${path}.rows array length*/

									value &&
										value.length >= 4 &&
										setSubscribeProps &&
										setSubscribeProps({hidden: value});
								},
							},
						]}
						dispatch={{
							path: `analytic.${analyticName}Table.filter.events.onReload`,
						}}
					/>
				</Space>{' '}
				<Search
					itemProps={{name: 'searchInput'}}
					placeholder={'Введите наименование'}
					dispatch={{
						path: `analytic.${analyticName}Table.filter.events.onSearch`,
					}}
					subscribe={[
						reloadFilterFields(
							`analytic.${analyticName}Table.filter.events.onReload`
						),
					]}
				/>
			</Space>
			{analyticName === 'constructorReports' ? null : (
				<>
					<Divider className={'my-0'} />
					<Space
						style={{justifyContent: 'space-between', width: '100%'}}
					>
						<Space>{configAnalyticName(analyticName)}</Space>
						<Space
							direction={'vertical'}
							style={{justifyContent: 'space-between'}}
							className={'mr-8'}
						>
							<Text
								label={'Период:'}
								itemProps={{hidden: true}}
								hidden={true}
							/>
							<Space>
								<Button
									className={'mt-4'}
									type={'primary'}
									dispatch={{
										path: `analytic.${analyticName}Table.table.onApplyFilter`,
										extraData: `rtd.analytic.${analyticName}Table.filter.events`,
										type: 'event',
									}}
								>
									Применить
								</Button>
								<Button
									dispatch={{
										path: `analytic.${analyticName}Table.filter.events.onReload`,
									}}
								>
									Сбросить
								</Button>
							</Space>
						</Space>
					</Space>
				</>
			)}
		</Space>
	);
};
