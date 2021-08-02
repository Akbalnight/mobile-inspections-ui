import {position} from '../Base/customColumnProps';
import {
	apiGetDataCountByConfigName,
	apiSaveFileByConfigName,
} from '../../apis/catalog.api';
import {Space, UploadFile, Button, notificationError} from 'rt-design';
import {EditFileName} from './Modals/SaveObjectModal';
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDateStore} from 'rt-design/lib/redux/rtd.actions';
import moment from 'moment';

export const customColumnProps = [
	{...position, width: '50px', align: 'center'},
];

/**
 * routeMapsTable header
 * */

export const RouteMapsTableHeader = () => {
	const dispatch = useDispatch();

	const onSelectRoute = useSelector(
		(state) => state.rtd.routeMaps.mainForm.events.onSelectRoute.value
	);

	useEffect(() => {
		dispatch(
			setDateStore('routeMaps.mainForm.routeMapsTable.actions.onReload', {
				timestamp: moment(),
			})
		);
	}, [onSelectRoute]);

	const loadDataObject = (callBack) => {
		apiGetDataCountByConfigName('routeMaps')({
			data: {routeId: onSelectRoute},
		})
			.then((response) => {
				console.log('apiGetDataCountByConfigName ', {
					routeId: onSelectRoute,
					position: response.data,
				});
				callBack({
					routeMap: {
						id: null,
						position: response.data + 1,
						fileId: null,
						routeId: onSelectRoute,
					},
				});
			})
			.catch((error) =>
				notificationError(error, 'Ошибка загрузки данных формы')
			);
	};
	return (
		<Space className={'p-8'}>
			<UploadFile
				itemProps={{
					name: 'uploadRouteMaps',
					valuePropName: 'dataObject',
				}}
				dispatch={{
					path: `routeMaps.mainForm.routeMapsTable.routeMapUpload`,
					type: 'event',
				}}
				requestUploadFile={apiSaveFileByConfigName('routeMapFileSave')}
				subscribe={[
					{
						name: 'makeHidden',
						path: 'rtd.routeMaps.mainForm.routeMapsTable.actions.onReload',
						onChange: ({setSubscribeProps}) => {
							// /** возможно лишний запрос, через ExtraData ошибка выходит, думаю над упрощением*/
							loadDataObject((v) =>
								setSubscribeProps({dataObject: v})
							);
						},
					},
				]}
			/>
			<EditFileName />
			<Button
				icon={<ArrowUpOutlined />}
				disabled={true}
				dispatch={{
					path: 'routeMaps.mainForm.routeMapsTable.actions.onClickMoveUp',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'btnUp',
						path: 'rtd.routeMaps.mainForm.routeMapsTable.selected',
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
					path: 'routeMaps.mainForm.routeMapsTable.actions.onClickMoveDown',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'btnUp',
						path: 'rtd.routeMaps.mainForm.routeMapsTable.selected',
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
	);
};
