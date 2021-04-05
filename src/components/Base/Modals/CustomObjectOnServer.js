import React from 'react';
import {classic} from 'rt-design';
import {apiSaveByConfigName} from '../../../apis/catalog.api';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {objectOnServer} from '../Functions/CustomObject';

const {FormBody, Modal} = classic;

/**
 *
 * @param catalogName name of server configuration<string>
 * @param unique phrase on Russian<string>
 * @returns {JSX.object}
 *
 */
export const AddCustomObjectOnServer = ({catalogName, unique}) =>
	operationOnServer('add', catalogName, unique);
export const EditCustomObjectOnServer = ({catalogName, unique}) =>
	operationOnServer('edit', catalogName, unique);

/**
 *
 * @param type modal type<string>
 * @param catalogName name of server configuration<string>
 * @param unique phrase on Russian<string>
 * @returns {JSX.object}
 * @desc Modal work only object in row
 */
const operationOnServer = (type, catalogName, unique) => {
	let sRow;
	const loadData = (callBack, row) => {
		sRow = row;
		callBack(type === 'add' ? null : sRow);
	};

	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type !== 'add',
				className: type === 'add' ? 'mr-8' : 'mr-0',
			}}
			toolTipProps={{
				title: type === 'add' ? 'Создать' : 'Редактировать',
			}}
			modalConfig={{
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} ${unique}`,
				width: catalogName === 'equipments' ? 650 : 500,
				bodyStyle: {height: catalogName === 'equipments' ? 700 : 200},
				requestSaveRow: apiSaveByConfigName(
					`${catalogName}CatalogSave`
				),
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					onFinish: (values) => {
						console.log('values', values);
					},
					labelCol: {span: 10},
					wrapperCol: {span: 10},
				},
			}}
			dispatch={{
				path: `catalog.${catalogName}Table.modal.events.${type}OnModal`,
				type: 'event',
			}}
			subscribe={[
				{
					name: `${catalogName}TableInfo`,
					path: `rtd.catalog.${catalogName}Table.table.selected`,
					onChange: ({value, setModalData, setButtonProps}) => {
						value && setModalData && setModalData(value);
						type === 'edit' &&
							value &&
							setButtonProps &&
							setButtonProps({
								disabled: value.isGroup,
								hidden: value.isGroup,
							});
					},
				},
			]}
		>
			<FormBody>{objectOnServer(catalogName)}</FormBody>
		</Modal>
	);
};
