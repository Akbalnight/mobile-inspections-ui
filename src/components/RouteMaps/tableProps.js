import {position} from '../Base/customColumnProps';
import {
	apiGetDataCountByConfigName,
	apiSaveFileByConfigName,
} from '../../apis/catalog.api';
import {Space, UploadFile, Button, notificationError} from 'rt-design';
import {EditFileName} from './Modals/SaveObjectModal';
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setDataStore} from 'rt-design/lib/redux/rtd.actions';
import moment from 'moment';

export const customColumnProps = [
	{...position, width: '50px', align: 'center'},
];

export const routesCustomColumnProps = [
	{name: 'code', hidden: true},
	{name: 'duration', hidden: true},
];

/**
 * routeMapsTable header
 * */

export const RouteMapsTableHeader = ({routeId}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		// console.log('RouteMapsTableHeader useEffect =>', routeId)
		dispatch(
			setDataStore('routeMaps.mainForm.routeMapsTable.actions.onReload', {
				timestamp: moment(),
			})
		);
	}, [routeId]);

	const loadDataObject = (callBack) => {
		apiGetDataCountByConfigName('routeMaps')({
			data: {routeId: routeId},
		})
			.then((response) => {
				// console.log('RouteMapsTableHeader loadDataObject =>', routeId)
				callBack({
					routeMap: {
						id: null,
						position: response.data + 1,
						fileId: null,
						routeId: routeId,
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
