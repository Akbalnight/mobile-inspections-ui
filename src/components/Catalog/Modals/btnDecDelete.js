import {classic} from 'rt-design';
import {DeleteOutlined} from '@ant-design/icons';
import {ReactComponent as Warning} from '../../../imgs/warning-mdl-big.svg';
import React from 'react';
import {apiSaveByConfigName} from '../../../apis/catalog.api';

const {Modal, Text, FormBody} = classic;

/**
 *
 * @param catalogName name of server configuration<string>
 * @param unique phrase on Russian<string>
 * @returns {JSX.object}
 * @desc Delete modal(button)
 */
export const DeleteButton = ({catalogName, unique}) => {
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
				type: 'editOnServer',
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
					apiSaveByConfigName(`${catalogName}CatalogSave`)({
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
				path: `catalog.${catalogName}Table.modal.events.deleteOnModal`,
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
