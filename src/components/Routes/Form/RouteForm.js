import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import React from 'react';
import {classic} from 'rt-design';
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
			const infoByIdResponse = await selectRowsById(
				'routes',
				'id',
				routeId
			)({});
			if (infoByIdResponse.status === 200)
				row = {
					...row,
					name: infoByIdResponse.data[0].name,
					duration: infoByIdResponse.data[0].duration,
				};
			const controlPointsByIdResponse = await selectRowsById(
				'routeControlPoints',
				'routeId',
				routeId
			)({});
			if (controlPointsByIdResponse.status === 200)
				row = {...row, cpById: controlPointsByIdResponse.data};
			const routeMapsByIdResponse = await selectRowsById(
				'routeMaps',
				'routeId',
				routeId
			)({});
			if (routeMapsByIdResponse.status === 200)
				row = {...row, rmById: routeMapsByIdResponse.data};
			callBack({...row});
		} else {
			callBack({
				name: null,
				duration: null,
				cpById: null,
				rmById: null,
			});
		}
	};
	return (
		<Form
			loadInitData={loadData}
			methodSaveForm={routeId ? 'PUT' : 'POST'}
			requestSaveForm={apiSaveByConfigName('routes')}
			onFinish={() => {
				history.push(paths.DETOURS_CONFIGURATOR_ROUTES.path);
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
				<Title
					label={'Контрольные точки'}
					level={5}
					// className={'ml-8'}
				/>
				<Layout style={{border: '1px solid #DFDFDF'}}>
					<Space className={'p-8'}>
						<AddControlPointToRoute />
						<EditControlPointToRoute />
					</Space>
					<Table
						itemProps={{name: 'cpById'}}
						size={'middle'}
						customColumnProps={customColumnProps}
						dispatchPath={
							'routes.routeForm.controlPointsTable.table'
						}
						requestLoadConfig={apiGetConfigByName(
							'routeControlPoints'
						)}
					/>
				</Layout>
				<Title
					label={'Маршрутные карты'}
					level={5}
					className={'mt-16'}
				/>
				{routeId ? (
					<Layout style={{border: '1px solid #DFDFDF'}}>
						<Space
							className={'p-8'}
							style={{justifyContent: 'flex-end'}}
						>
							<Button>1</Button>
						</Space>
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
