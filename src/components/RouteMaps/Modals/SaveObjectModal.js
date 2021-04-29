import {classic} from 'rt-design';
import {EditOutlined} from '@ant-design/icons';
import React from 'react';
import {apiSaveByConfigName} from '../../../apis/catalog.api';
import {itemsInfo} from '../../../constants/dictionary';

const {Modal, FormBody, Input} = classic;
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
				type: `editOnServer`,
				title: `Редактирование наименования`,
				width: 450,
				bodyStyle: {
					height: 150,
				},
				requestSaveRow: apiSaveByConfigName('routeMapFileNameSave'),
				form: {
					name: `editModalForm`,
					methodSaveForm: 'PUT',
					labelCol: {span: 10},
					wrapperCol: {span: 12},
				},
			}}
			subscribe={[
				/** Modal data & button(props) change  */
				{
					name: 'editFileName',
					path: 'rtd.routeMaps.mainForm.routeMapsTable.selected',
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
				path: `routeMaps.mainForm.routeMapsTable.modal.editFileName`,
				type: 'event',
			}}
		>
			<FormBody>
				<Input itemProps={{...itemsInfo.name}} />
			</FormBody>
		</Modal>
	);
};
