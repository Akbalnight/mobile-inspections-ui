import {classic} from 'rt-design';
import {itemsInfo} from '../../../constants/dictionary';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {apiSaveByConfigName} from '../../../apis/catalog.api';
import React from 'react';
import {objectOnServer} from '../Functions/DefaultObject';

/**
 *
 * @param catalogName name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.object}
 */
export const AddDefaultObjectOnServer = ({catalogName, unique}) =>
	operationOnServer('add', catalogName, unique);
export const EditDefaultObjectOnServer = ({catalogName, unique}) =>
	operationOnServer('edit', catalogName, unique);

const {Modal, FormBody, Input} = classic;

/**
 *
 * @param type modal type<string>
 * @param catalogName name of server configuration<string>
 * @param unique phrase on Russian<string>
 * @returns {JSX.object}
 * @desc Modal work only object in row
 */
const operationOnServer = (type, catalogName, unique) => {
	/**
	 *
	 * @param callBack function change state (row)
	 * @param row info object from table
	 */
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};

	/**
	 *
	 * @param rawValues
	 * @desc Function return few changes in save object
	 */
	const processBeforeSaveForm = (rawValues) => {
		if (catalogName === 'staff') {
			const values = {...rawValues};
			return {
				...values,
				id: values.userId,
			};
		} else return rawValues;
	};

	/**
	 *
	 * @param catalogName name of server configuration<string>
	 * @returns {number}
	 * @desc Func choice height number by catalogName
	 */
	const modalHeight = (catalogName) => {
		switch (catalogName) {
			case 'staff':
				return 350;
			case 'panelProblemsPriorities':
			case 'staffWorkSchedules':
			case 'defectTypical':
				return 210;
			default:
				return 180;
		}
	};

	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type !== 'add',
				className: 'mr-8',
			}}
			toolTipProps={{
				title: type === 'add' ? 'Создать' : 'Редактировать',
			}}
			modalConfig={{
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} ${unique}`,
				width: catalogName !== 'staff' ? 450 : 650,
				bodyStyle: {
					height: modalHeight(catalogName),
				},
				requestSaveRow: apiSaveByConfigName(
					`${catalogName}CatalogSave`
				),
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					processBeforeSaveForm: processBeforeSaveForm,
					methodSaveForm: type === 'add' ? 'POST' : 'PUT',
					onFinish: (values) => {
						console.log('values', values);
					},
					labelCol: {span: 10},
					wrapperCol: {span: 12},
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
						type !== 'add' &&
							setButtonProps &&
							setButtonProps({
								disabled: !value,
							});
					},
				},
			]}
		>
			<FormBody>
				{catalogName !== 'staff' ? (
					<Input itemProps={{...itemsInfo.name}} />
				) : null}
				{objectOnServer(catalogName)}
			</FormBody>
		</Modal>
	);
};
