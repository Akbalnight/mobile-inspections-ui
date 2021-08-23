import React from 'react';
import {useHistory} from 'react-router';
import {ReactComponent as Warning} from '../../../../imgs/warning-mdl-big.svg';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../../apis/catalog.api';
import {paths} from '../../../../constants/paths';
import {Modal, FormBody, Text, Input, notificationError} from 'rt-design';

export const WayOutModal = () => {
	const history = useHistory();
	return (
		<>
			<Modal
				buttonProps={{
					type: 'primary',
					label: 'В конструктор',
					disabled: true,
				}}
				modalConfig={{
					type: `save`,
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
					methodSaveForm: 'POST',
					requestSaveForm: ({data}) => {
						apiSaveByConfigName('routes')({
							method: 'POST',
							data: {...data},
						});
						/** тут поставил искуственное замедление отправил в event loop функцию ниже
						 * мы успеваем сохранить созданный маршрут, после этого ищем его по 2 параемтрам для того чтобы передать
						 * в адресную строку его id.
						 * Это позволяет Нам дальше действовать по схеме введеной на кнопке в разделе редактирвоания, т.е. мы отправляем
						 * данные в МК, в разделе МК срабатывают все элементы(селекты и талицы)
						 *
						 * РЕШЕНИЕ не ЭЛЕГАНТНОЕ
						 * */
						setTimeout(
							() =>
								apiGetFlatDataByConfigName('routesSearch')({
									data: {
										name: data.name,
										duration: data.duration,
									},
									params: {size: 50},
								})
									.then((response) => {
										history.push(
											`${paths.DETOURS_CONFIGURATOR_ROUTE_MAPS.path}/${response.data[0].id}`
										);
									})
									.catch((error) =>
										notificationError(
											error,
											'Ошибка загрузки данных формы'
										)
									),
							1000 // ?
						);
					},

					form: {
						name: `wayModalForm`,
						processBeforeSaveForm: (rawValues) => {
							return {
								...rawValues.saveObject,
							};
						},
					},
				}}
				subscribe={[
					{
						name: `wayOutModal`,
						path: 'rtd.routes.routeForm.data',
						onChange: ({value, setModalData, setButtonProps}) => {
							value &&
								value.name !== null &&
								value.duration !== null &&
								setButtonProps &&
								setButtonProps({disabled: !value});
							value &&
								setModalData &&
								setModalData({
									saveObject: value,
								});
						},
					},
				]}
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
					/>
				</FormBody>
			</Modal>
		</>
	);
};
