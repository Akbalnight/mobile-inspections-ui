import {classic} from 'rt-design';
import {EditOutlined, FolderAddOutlined} from '@ant-design/icons';
import {apiGetHierarchicalDataByConfigName} from '../../../apis/catalog.api';
import React from 'react';
import {itemsInfo} from '../tableProps';

export const AddGroupButton = ({catalogName, unique}) =>
	operationOnServer('add', catalogName, unique);
export const EditGroupButton = ({catalogName, unique}) =>
	operationOnServer('edit', catalogName, unique);

const {Modal, FormBody, Input, TreeSelect} = classic;

const operationOnServer = (type, catalogName, unique) => {
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <FolderAddOutlined /> : <EditOutlined />,
				disabled: type === 'add' ? false : true,
				hidden: type === 'add' ? false : true,
				className: 'mr-8',
			}}
			toolTipProps={{
				title: `${
					type === 'add' ? 'Добавить' : 'Редактировать'
				} группу`,
			}}
			modalConfig={{
				type: `${type}GroupOnServer`,
				title: `${
					type === 'add' ? 'Создать' : 'Редактировать'
				} ${unique}`,
				width: 550,
				bodyStyle: {height: 250},
				// requestSaveRow: apiSaveByConfigName(
				// 	`${catalogName}CatalogSave`
				// ), //не забыть поставить
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					onFinish: (values) => {
						console.log('values', values);
					},
					labelCol: {span: 10},
					wrapperCol: {span: 12},
				},
			}}
			dispatch={{
				path: `catalog.${catalogName}Table.modal.events.on${
					type[0].toUpperCase() + type.substring(1)
				}GroupModal`,
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
								disabled: !value.isGroup,
								hidden: !value.isGroup,
							});
					},
				},
			]}
		>
			<FormBody>
				<Input itemProps={{...itemsInfo.name}} />
				<Input itemProps={{...itemsInfo.techPlace}} />
				<TreeSelect
					itemProps={{...itemsInfo.parentId, label: 'Родитель'}}
					treeCheckStrictly={false}
					treeDefaultExpandAll={true}
					requestLoadRows={({data, params}) =>
						apiGetHierarchicalDataByConfigName('equipments')({
							data: {...data, isGroup: true},
							params,
						})
					}
					optionConverter={(option) => ({
						value: option.techPlacePath, //change
						label: option.name,
						children: option.children,
						// checkable: !option.isGroup,
						// selectable: !option.isGroup,
					})}
				/>
			</FormBody>
		</Modal>
	);
};
