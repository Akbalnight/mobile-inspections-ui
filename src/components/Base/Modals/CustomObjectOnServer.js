import React from 'react';
import {FormBody, Modal} from 'rt-design';
import {apiSaveByConfigName} from '../../../apis/catalog.api';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {objectOnServer} from '../Functions/CustomObject';
import {changeStorePath} from '../Functions/ChangeStorePath';
import {catalogConfigs} from '../../Catalog/Registry/catalogConfigs';
import {paths} from '../../../constants/paths';
import {systemEvents} from '../../../constants/systemEvents';

/**
 *
 * @param catalogName name of server configuration<string>
 * @param mainWay name of server configuration<string>
 * @returns {JSX.object}
 *
 */
export const AddCustomObjectOnServer = ({mainWay, catalogName}) =>
	operationOnServer('add', mainWay, catalogName);
export const EditCustomObjectOnServer = ({mainWay, catalogName}) =>
	operationOnServer('edit', mainWay, catalogName);

/**
 *
 * @param type modal type<string>
 * @param catalogName name of server configuration<string>
 * @param mainWay name of server configuration<string>

 * @returns {JSX.object}
 * @desc Modal work only object in row
 */
const operationOnServer = (type, mainWay, catalogName) => {
	let sRow;

	const objByCatalogName = catalogConfigs(paths).find(
		(el) => el.name === catalogName
	);
	const {unique, creation, edition} = objByCatalogName;

	const loadData = (callBack, row) => {
		sRow = row;
		callBack(type === 'add' ? null : sRow);
	};
	const processBeforeSaveForm = (rawValues) => {
		return {
			...rawValues,
			isGroup: false,
			deleted: rawValues?.deleted ? rawValues.deleted : false,
		};
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
				type: `save`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} ${unique}`,
				width: catalogName === 'equipments' ? 650 : 500,
				bodyStyle: {height: catalogName === 'equipments' ? 700 : 200},
				methodSaveForm: type === 'add' ? 'POST' : 'PUT',
				requestSaveForm: apiSaveByConfigName(
					`${catalogName}CatalogSave`,
					systemEvents[type === 'add' ? creation : edition]
				),
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					processBeforeSaveForm,
					labelCol: {span: 10},
					wrapperCol: {span: 10},
				},
			}}
			dispatch={{
				path: `${changeStorePath(
					mainWay,
					catalogName
				)}.events.${type}OnModal`,
				type: 'event',
			}}
			subscribe={[
				{
					name: `${catalogName}TableInfo`,
					path: `rtd.${changeStorePath(
						mainWay,
						catalogName
					)}.selected`,
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
			<FormBody>{objectOnServer(mainWay, catalogName)}</FormBody>
		</Modal>
	);
};
