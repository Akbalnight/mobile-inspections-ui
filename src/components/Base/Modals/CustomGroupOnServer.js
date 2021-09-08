import {Modal, FormBody, Input, TreeSelect} from 'rt-design';
import {EditOutlined, FolderAddOutlined} from '@ant-design/icons';
import {
	apiGetHierarchicalDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import React from 'react';
import {itemsInfo} from '../../../constants/dictionary';
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
export const AddCustomGroupOnServer = ({mainWay, catalogName}) =>
	operationOnServer('add', mainWay, catalogName);
export const EditCustomGroupOnServer = ({mainWay, catalogName}) =>
	operationOnServer('edit', mainWay, catalogName);

/**
 *
 * @param type modal type<string>
 * @param catalogName name of server configuration<string>
 * @param mainWay name of server configuration<string>
 * @returns {JSX.object}
 * @desc Modal work if table have is_group props in row
 */
const operationOnServer = (type, mainWay, catalogName) => {
	const objByCatalogName = catalogConfigs(paths).find(
		(el) => el.name === catalogName
	);
	const {unique, creationGroup, editionGroup} = objByCatalogName;

	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};

	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <FolderAddOutlined /> : <EditOutlined />,
				disabled: type !== 'add',
				hidden: type !== 'add',
				className: 'mr-8',
			}}
			toolTipProps={{
				title: `${type === 'add' ? 'Создать' : 'Редактировать'} группу`,
			}}
			modalConfig={{
				type: `save`,
				title: `${
					type === 'add' ? 'Создание' : 'Редактирование'
				} группы ${unique}`,
				width: 500,
				bodyStyle: {height: catalogName === 'equipments' ? 250 : 200},
				methodSaveForm: type === 'add' ? 'POST' : 'PUT',
				requestSaveForm: ({data, params}) =>
					apiSaveByConfigName(
						`${catalogName}CatalogSave`,
						systemEvents[
							type === 'add' ? creationGroup : editionGroup
						]
					)({
						method: type === 'add' ? 'POST' : 'PUT',
						data: {...data, isGroup: true},
						params,
					}),
				form: {
					name: `${type}GroupModalForm`,
					loadInitData: loadData,

					labelCol: {span: 10},
					wrapperCol: {span: 12},
				},
			}}
			dispatch={{
				path: `${changeStorePath(
					mainWay,
					catalogName
				)}.events.${type}OnGroupModal`,
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
						type !== 'add' &&
							value &&
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
				{catalogName === 'equipments' ? (
					<Input itemProps={{...itemsInfo.techPlace}} />
				) : null}
				<TreeSelect
					itemProps={{...itemsInfo.parentId, label: 'Родитель'}}
					treeCheckStrictly={false}
					treeDefaultExpandAll={true}
					requestLoadRows={({data, params}) =>
						apiGetHierarchicalDataByConfigName(catalogName)({
							data: {...data, isGroup: true},
							params,
						})
					}
					optionConverter={(option) => ({
						value: option.id,
						label: option.name,
						children: option.children,
					})}
				/>
			</FormBody>
		</Modal>
	);
};
