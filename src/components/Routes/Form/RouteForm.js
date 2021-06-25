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
import {ControlPointTableHeader, customColumnProps} from '../tableProps';
import {Result} from 'antd';
import {WayOutModal} from './Modals/WayOutModal';

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
					<ControlPointTableHeader />
					<Table
						itemProps={{name: 'controlPoints'}}
						rowKey={'controlPointId'}
						customColumnProps={customColumnProps}
						dispatch={{
							path: 'routes.routeForm.controlPointsTable.table',
						}}
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
								path: 'rtd.routes.routeForm.controlPointsTable.modal.events.onAddRow',
								onChange: ({value, addRow}) => {
									value && addRow(value.value);
								},
							},
							/** Edit table Items */
							{
								name: 'editOnLocal',
								path: 'rtd.routes.routeForm.controlPointsTable.modal.events.onEditRow',
								onChange: ({value, editRow}) => {
									value && editRow(value.value);
								},
							},
							/** Delete table Items */
							{
								name: 'deleteOnLocal',
								path: 'rtd.routes.routeForm.controlPointsTable.modal.events.onRemoveRow',
								onChange: ({value, removeRow}) => {
									removeRow();
								},
							},
							/** Action change state after push on Button */
							{
								name: 'onClickMoveUp',
								path: 'rtd.routes.routeForm.controlPointsTable.table.actions.onClickMoveUp',
								onChange: ({moveUpRow}) => moveUpRow(),
							},
							/** Action change state after push on Button */
							{
								name: 'onClickMoveDown',
								path: 'rtd.routes.routeForm.controlPointsTable.table.actions.onClickMoveDown',
								onChange: ({moveDownRow}) => moveDownRow(),
							},

							/** Action change row position in table */
							{
								name: 'onMoveUpRow',
								path: 'rtd.routes.routeForm.controlPointsTable.table.events.onMoveUpRow',
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
								path: 'rtd.routes.routeForm.controlPointsTable.table.events.onMoveDownRow',
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
						extra={<WayOutModal />}
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
