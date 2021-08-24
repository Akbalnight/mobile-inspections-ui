import {DeleteOutlined} from '@ant-design/icons';
import {ReactComponent as Warning} from '../../../../imgs/warning-mdl-big.svg';
import {apiSaveByConfigName} from '../../../../apis/catalog.api';
import React from 'react';
import {Modal, Text, FormBody} from 'rt-design';

/**
 *
 * @param catalogName name of server configuration<string>
 * @param unique phrase on Russian<string>
 * @returns {JSX.object}
 * @desc Delete modal(button) maybe not necessary component
 */
export const DeleteDetour = ({catalogName, unique}) => {
	let sRow;
	const loadData = (callBack, row) => {
		sRow = row;
		callBack(sRow);
	};
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
				type: 'save',
				title: (
					<span style={{display: 'flex', flexDirection: 'row'}}>
						<Warning />{' '}
						<div style={{padding: '0px 10px 0px'}}>
							Удаление {unique}
						</div>
					</span>
				),
				width: 420,
				// bodyStyle: {height: 200},
				okText: 'Удалить',
				requestSaveRow: ({method, data, params}) =>
					apiSaveByConfigName(`${catalogName}Save`)({
						method: 'PUT',
						data: {...data, id: sRow.id, deleted: true},
						params,
					}), //не забыть поставить
				form: {
					name: `${catalogName}ModalForm`,
					loadInitData: loadData,
				},
			}}
			dispatch={{
				path: `${catalogName}.mainForm.table.events.deleteOnModal`,
				type: 'event',
			}}
			subscribe={[
				{
					name: `${catalogName}TableInfo`,
					path: `rtd.detours.mainForm.table.selected`,
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
