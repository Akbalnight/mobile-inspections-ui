import {classic} from 'rt-design';
import {DeleteOutlined} from '@ant-design/icons';
import {ReactComponent as Warning} from '../../../imgs/warning-mdl-big.svg';
import React from 'react';

const {Modal, Text, FormBody} = classic;
export const DeleteButton = ({catalogName, unique}) => {
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: <DeleteOutlined />,
				disabled: true,
				className: 'mr-8',
			}}
			toolTipProps={{
				title: `Удалить ${unique}`,
			}}
			modalConfig={{
				type: 'editOnServer',
				title: (
					<span style={{display: 'flex', flexDirection: 'row'}}>
						<Warning />{' '}
						<div style={{padding: '0px 10px 0px'}}>
							Удалить {unique}
						</div>
					</span>
				),
				width: 420,
				// bodyStyle: {height: 200},
				okText: 'Удалить',
				form: {
					name: `${catalogName}ModalForm`,
					loadInitData: (callBack, row) => callBack(row),
				},
			}}
			dispatch={{
				path: `catalog.${catalogName}Table.modal.events.onDeleteModal`,
				type: 'event',
			}}
			subscribe={[
				{
					name: `${catalogName}TableInfo`,
					path: `rtd.catalog.${catalogName}Table.table.selected`,
					onChange: ({value, setModalData, setButtonProps}) => {
						value && setModalData && setModalData(value);

						setButtonProps && setButtonProps({disabled: !value});
					},
				},
			]}
		>
			<FormBody>
				<Text label={'Вы действительно хотите удалить выбранное?'} />
			</FormBody>
		</Modal>
	);
};
