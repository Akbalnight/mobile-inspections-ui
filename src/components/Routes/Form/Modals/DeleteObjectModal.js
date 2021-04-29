import {classic} from 'rt-design';
import {DeleteOutlined} from '@ant-design/icons';
import React from 'react';
import {ReactComponent as Warning} from '../../../../imgs/warning-mdl-big.svg';

const {Modal, FormBody, Text} = classic;
export const DeleteControlPointToRoute = () => {
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: <DeleteOutlined />,
				disabled: true,
			}}
			toolTipProps={{
				title: `Удалить`,
			}}
			modalConfig={{
				type: 'editOnLocal',
				title: (
					<span style={{display: 'flex', flexDirection: 'row'}}>
						<Warning />{' '}
						<div style={{padding: '0px 10px 0px'}}>
							Удаление контрольной точки
						</div>
					</span>
				),
				width: 420,
				okText: 'Удалить',
				form: {
					name: `deleteModalForm`,
				},
			}}
			dispatch={{
				path:
					'routes.routeForm.controlPointsTable.modal.events.onRemoveRow',
				type: 'event',
			}}
			subscribe={[
				{
					name: 'btnDelete',
					path:
						'rtd.routes.routeForm.controlPointsTable.table.selected',
					onChange: ({value, setButtonProps}) => {
						value &&
							setButtonProps &&
							setButtonProps({
								disabled: !value,
							});
					},
				},
			]}
		>
			<FormBody>
				<Text
					label={'Вы действительно хотите удалить контрольную точку?'}
				/>
			</FormBody>
		</Modal>
	);
};
