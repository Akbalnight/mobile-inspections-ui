import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import React from 'react';
import {classic, notificationError} from 'rt-design';
import {itemsInfo} from '../../../constants/dictionary';
import {selectRowsById} from '../../Base/Functions/TableSelectById';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {paths} from '../../../constants/paths';

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

	const loadData = (callBack) => {
		if (routeId) {
			apiGetFlatDataByConfigName('routes')({
				data: {id: routeId},
			})
				.then((response) => {
					callBack(response.data[0]);
				})
				.catch((error) =>
					notificationError(error, 'Ошибка загрузки данных формы')
				);
		} else {
			callBack({
				name: null,
				duration: null,
			});
		}
	};
	return (
		<Form
			loadInitData={loadData}
			methodSaveForm={routeId ? 'PUT' : 'POST'}
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
			<FormBody noPadding={true}>
				<Space
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
					className={'ml-8'}
				/>
				<Layout>
					<Space className={'p-8'}>
						<Button>1</Button>
					</Space>
					<Table
						requestLoadRows={selectRowsById(
							'routeControlPoints',
							'routeId',
							routeId ? routeId : undefined
						)}
						requestLoadConfig={apiGetConfigByName(
							'routeControlPoints'
						)}
					/>
				</Layout>
				<Layout>
					<div>Начать отсюда</div>
				</Layout>
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
