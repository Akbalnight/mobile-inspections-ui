import {Modal, FormBody, Input} from 'rt-design';
import {EditOutlined} from '@ant-design/icons';
import React from 'react';
import {apiSaveByConfigName} from '../../../apis/application.api';
import {itemsInfo} from '../../../constants/dictionary';
import {systemEvents} from '../../../constants/systemEvents';

export const EditFileName = () => {
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: <EditOutlined />,
				disabled: true,
			}}
			toolTipProps={{
				title: 'Редактировать наименование',
			}}
			modalConfig={{
				type: `save`,
				title: `Редактирование наименования`,
				width: 450,
				bodyStyle: {
					height: 150,
				},
				methodSaveForm: 'PUT',
				requestSaveForm: apiSaveByConfigName(
					'routeMapFileNameSave',
					systemEvents.ROUTE_MAPS_FILES_NAME_EDITION_SUCCESS
				),
				form: {
					name: `editModalForm`,
					labelCol: {span: 10},
					wrapperCol: {span: 12},
				},
			}}
			subscribe={[
				/** Modal data & button(props) change  */
				{
					name: 'editFileName',
					path: 'rtd.routeMaps.routeMapsTable.selected',
					onChange: ({value, setButtonProps, setModalData}) => {
						value && setModalData && setModalData({...value});
						value &&
							setButtonProps &&
							setButtonProps({
								disabled: !value,
							});
					},
				},
			]}
			dispatch={{
				path: `routeMaps.routeMapsTable.events.editFileName`,
				type: 'event',
			}}
		>
			<FormBody>
				<Input itemProps={{...itemsInfo.name}} />
			</FormBody>
		</Modal>
	);
};
