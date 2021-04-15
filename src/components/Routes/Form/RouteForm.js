import {BasePage} from 'mobile-inspections-base-ui';
import {useHistory, useParams} from 'react-router';
import React from 'react';
import {classic} from 'rt-design';
import {itemsInfo} from '../../../constants/dictionary';

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
	return (
		<Form>
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
				<Space>
					<Input itemProps={{...itemsInfo.name}} />
					<InputNumber />
				</Space>
				<Layout>
					<Table />
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
