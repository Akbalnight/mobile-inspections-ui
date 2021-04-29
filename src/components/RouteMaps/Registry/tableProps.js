import {position} from '../../Base/customColumnProps';
import {
	apiGetFlatDataByConfigName,
	apiSaveFileByConfigName,
} from '../../../apis/catalog.api';
import {classic, notificationError} from 'rt-design';
import {EditFileName} from '../Modals/SaveObjectModal';
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import React from 'react';

const {Space, UploadFile, Button} = classic;
export const customColumnProps = [
	{...position, width: '50px', align: 'center'},
];

/**
 * routeMapsTable header
 * */

export const RouteMapsTableHeader = () => {
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
				dataObject={{
					routeMap: {
						id: null,
						position: null,
						fileId: null,
					},
				}}
				requestUploadFile={apiSaveFileByConfigName('routeMapFileSave')}
				subscribe={[
					{
						name: 'makeHidden',
						path: 'rtd.routeMaps.mainForm.events.onSelectRoute',
						onChange: ({value, setSubscribeProps}) => {
							/** возможно лишний запрос, через ExtraData ошибка выходит, думаю над упрощением*/
							apiGetFlatDataByConfigName('routeMaps')({
								data: {
									routeId: value.value,
								},
							})
								.then((response) => {
									setSubscribeProps({
										dataObject: {
											routeMap: {
												id: null,
												position:
													response.data.length + 1,
												fileId: null,
												routeId: value.value,
											},
										},
									});
								})
								.catch((error) =>
									notificationError(
										error,
										'Ошибка загрузки данных формы'
									)
								);
							// 	value &&
							// 	setSubscribeProps &&
							// 	setSubscribeProps({
							// 		dataObject: {
							// 			routeMap: {
							// 				id: null,
							// 				position: null,
							// 				fileId: null,
							// 				routeId:
							// 					value.value,
							// 			},
							// 		},
							// 	});
						},
					},
				]}
			/>
			<EditFileName />
			<Button
				icon={<ArrowUpOutlined />}
				disabled={true}
				dispatch={{
					path:
						'routeMaps.mainForm.routeMapsTable.actions.onClickMoveUp',
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
					path:
						'routeMaps.mainForm.routeMapsTable.actions.onClickMoveDown',
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
