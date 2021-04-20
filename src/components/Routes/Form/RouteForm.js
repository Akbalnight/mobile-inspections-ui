import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import React from 'react';
import {classic, executeRequest} from 'rt-design';
import {itemsInfo} from '../../../constants/dictionary';
import {selectRowsById} from '../../Base/Functions/TableSelectById';
import {
	apiGetConfigByName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import {paths} from '../../../constants/paths';
import {AttachmentsPreview} from '../../Base/Functions/MediaUtils';
import {
	AddControlPointToRoute,
	EditControlPointToRoute,
} from './Modals/SaveObjectModal';
import {customColumnProps} from '../tableProps';
import {Result} from 'antd';
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {ReactComponent as Warning} from '../../../imgs/warning-mdl-big.svg';

const {
	Form,
	FormHeader,
	FormBody,
	FormFooter,
	Title,
	Input,
	InputNumber,
	Table,
	Layout,
	Space,
	Button,
	Custom,
	Divider,
	Modal,
	Text,
} = classic;
export const RoutesAdd = () => {
	return (
		<BasePage>
			<RouteForm />
		</BasePage>
	);
};
export const RoutesEdit = () => {
	const pageParams = useParams();
	return (
		<BasePage>
			<RouteForm routeId={pageParams.id} />
		</BasePage>
	);
};

const RouteForm = (props) => {
	const {routeId} = props;
	const history = useHistory();

	const loadData = async (callBack, row) => {
		/** 3 request no KISS*/
		if (routeId) {
			let localRow = {...row};
			const infoByIdResponse = await selectRowsById(
				'routes',
				'id',
				routeId
			)({});
			if (infoByIdResponse.status === 200)
				localRow = {
					...localRow,
					...infoByIdResponse.data[0],
				};
			const controlPointsByIdResponse = await selectRowsById(
				'routeControlPoints',
				'routeId',
				routeId
			)({});
			if (controlPointsByIdResponse.status === 200)
				localRow = {
					...localRow,
					controlPoints: controlPointsByIdResponse.data,
				};
			const routeMapsByIdResponse = await selectRowsById(
				'routeMaps',
				'routeId',
				routeId
			)({});
			if (routeMapsByIdResponse.status === 200)
				localRow = {...localRow, rmById: routeMapsByIdResponse.data};
			callBack(localRow);
		} else {
			callBack({
				name: null,
				duration: null,
				controlPoints: null,
				rmById: null,
			});
		}
	};
	return (
		<Form
			name={'routeForm'}
			loadInitData={loadData}
			methodSaveForm={routeId ? 'PUT' : 'POST'}
			requestSaveForm={apiSaveByConfigName('routes')}
			onFinish={() => {
				history.push(paths.DETOURS_CONFIGURATOR_ROUTES.path);
			}}
			dispatch={{
				path: 'routes.routeForm',
			}}
		>
			<FormHeader>
				<Title
					level={3}
					label={
						routeId
							? 'Редактирование маршрута'
							: 'Создание маршрута'
					}
				/>
			</FormHeader>
			<FormBody>
				<Space
					className={'my-16'}
					style={{
						justifyContent: 'space-around',
						width: '60%',
						alignItems: 'flex-start',
					}}
				>
					<Input itemProps={{...itemsInfo.name}} />
					<InputNumber itemProps={{...itemsInfo.duration}} min={0} />
				</Space>
				<Title label={'Контрольные точки'} level={5} />
				<Layout style={{border: '1px solid #DFDFDF'}}>
					<Space className={'p-8'}>
						<AddControlPointToRoute />
						<EditControlPointToRoute />
						<Button
							icon={<ArrowUpOutlined />}
							disabled={true}
							dispatch={{
								path:
									'routes.routeForm.controlPointsTable.table.actions.onClickMoveUp',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'btnUp',
									path:
										'rtd.routes.routeForm.controlPointsTable.table.selected',
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
									'routes.routeForm.controlPointsTable.table.actions.onClickMoveDown',
								type: 'event',
							}}
							subscribe={[
								{
									name: 'btnUp',
									path:
										'rtd.routes.routeForm.controlPointsTable.table.selected',
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
						itemProps={{name: 'controlPoints'}}
						customColumnProps={customColumnProps}
						dispatchPath={
							'routes.routeForm.controlPointsTable.table'
						}
						requestLoadRows={selectRowsById(
							'routeControlPoints',
							'routeId',
							routeId
						)}
						requestLoadConfig={apiGetConfigByName(
							'routeControlPoints'
						)}
						subscribe={[
							/** Add table Items */
							{
								name: 'addOnLocal',
								path:
									'rtd.routes.routeForm.controlPointsTable.modal.events.onAddRow',
								onChange: ({value, addRow}) => {
									value && addRow(value.value);
								},
							},
							/** Eit table Items */
							{
								name: 'editOnLocal',
								path:
									'rtd.routes.routeForm.controlPointsTable.modal.events.onEditRow',
								onChange: ({value, editRow}) => {
									value && editRow(value.value);
								},
							},
							/** Action change state after push on Button */
							{
								name: 'onClickMoveUp',
								path:
									'rtd.routes.routeForm.controlPointsTable.table.actions.onClickMoveUp',
								onChange: ({moveUpRow}) => moveUpRow(),
							},
							/** Action change state after push on Button */
							{
								name: 'onClickMoveDown',
								path:
									'rtd.routes.routeForm.controlPointsTable.table.actions.onClickMoveDown',
								onChange: ({moveDownRow}) => moveDownRow(),
							},

							/** Action change row position in table */
							{
								name: 'onMoveUpRow',
								path:
									'rtd.routes.routeForm.controlPointsTable.table.events.onMoveUpRow',
								onChange: ({value}) => {
									console.log(value);
									executeRequest(
										apiSaveByConfigName(
											'routeMapPositionSave'
										)
									)({
										data: {
											routeMaps: value.value,
										},
										method: 'POST',
									});
								},
							},
							/** Action change row position in table */
							{
								name: 'onMoveDownRow',
								path:
									'rtd.routes.routeForm.controlPointsTable.table.events.onMoveDownRow',
								onChange: ({value}) =>
									executeRequest(
										apiSaveByConfigName(
											'routeMapPositionSave'
										)
									)({
										data: {
											routeMaps: value.value,
										},
										method: 'POST',
									}),
							},
						]}
					/>
				</Layout>
				<Space
					className={'p-8'}
					style={{justifyContent: 'space-between'}}
				>
					<Title
						label={'Маршрутные карты'}
						level={5}
						className={'mt-16'}
					/>
					{routeId ? (
						<Button
							type={'link'}
							onClick={() => {
								history.push(
									`${
										paths.DETOURS_CONFIGURATOR_ROUTE_MAPS
											.path
									}/${routeId ? routeId : ''}`
								);
							}}
						>
							В конструктор
						</Button>
					) : null}
				</Space>
				{routeId ? (
					<Layout style={{border: '1px solid #DFDFDF'}}>
						<Divider className={'my-0'} />
						<Layout className={'p-8'}>
							<Custom
								itemProps={{name: 'rmById'}}
								render={({value}) => {
									return value ? (
										<AttachmentsPreview
											enableTitles={false}
											items={value}
										/>
									) : null;
								}}
							/>
						</Layout>
					</Layout>
				) : (
					<Result
						title={
							'Вы можете перейти в Конструктор маршрутных карт'
						}
						style={{height: '450px'}}
						extra={
							<>
								<Modal
									buttonProps={{
										type: 'primary',
										label: 'В конструктор',
									}}
									modalConfig={{
										type: `addOnServer`,
										title: (
											<span
												style={{
													display: 'flex',
													flexDirection: 'row',
												}}
											>
												<Warning />{' '}
												<div
													style={{
														padding: '0px 10px 0px',
													}}
												>
													Внимание
												</div>
											</span>
										),
										width: 450,
										bodyStyle: {height: 180},
										okText: 'Да',
										cancelText: 'Нет',
										requestSaveRow: apiSaveByConfigName(
											'routes'
										),
										onFinish: () =>
											history.push(
												`${paths.DETOURS_CONFIGURATOR_ROUTE_MAPS.path}/`
											),
										form: {
											name: `wayModalForm`,
											loadInitData: (callBack, row) => {
												console.log(row);
												callBack(row);
											},
											processBeforeSaveForm: (
												rawValues
											) => {
												return {
													...rawValues.saveObject,
												};
											},
										},
									}}
								>
									<FormBody>
										<Text
											label={
												'При переходе на страницу конструктора маршрутных карт, созданный маршрут автоматически сохранится.'
											}
										/>
										<br />
										<Text label={'Вы хотите этого?'} />
										<Input
											itemProps={{
												name: 'saveObject',
												hidden: true,
											}}
											subscribe={[
												{
													name: `wayOutModal`,
													withMount: true,
													path:
														'rtd.routes.routeForm',
													onChange: ({
														value,
														setModalData,
														setButtonProps,
														setSubscribeProps,
													}) => {
														console.log(value);
														value &&
															setSubscribeProps &&
															setSubscribeProps({
																value: value,
															});
														// value && setModalData && setModalData(value);
														// type === 'edit' &&
														// value &&
														// setButtonProps &&
														// setButtonProps({
														//     disabled: !value,
														// });
													},
												},
											]}
										/>
									</FormBody>
								</Modal>
							</>
						}
					/>
				)}
			</FormBody>
			<FormFooter>
				<Button
					label={'Закрыть'}
					onClick={() => {
						history.goBack();
					}}
					className={'mr-8'}
				/>
				<Button
					label={'Сохранить'}
					type={'primary'}
					htmlType={'submit'}
				/>
			</FormFooter>
		</Form>
	);
};
