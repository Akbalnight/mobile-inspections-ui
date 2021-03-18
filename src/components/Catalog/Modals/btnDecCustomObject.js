import React from 'react';
import {classic} from 'rt-design';
import {
	EditOutlined,
	FolderOutlined,
	PlusOutlined,
	ToolOutlined,
} from '@ant-design/icons';
import {
	apiGetHierarchicalDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import {disabledEndDate, disabledStartDate} from '../../Base/baseFunctions';
import {itemsInfo} from '../tableProps';

const {
	Text,
	FormBody,
	TreeSelect,
	Modal,
	Checkbox,
	Input,
	DatePicker,
	Title,
} = classic;
export const AddObjectButton = ({catalogName, unique}) =>
	operationOnServer('add', catalogName, unique);
export const EditObjectButton = ({catalogName, unique}) =>
	operationOnServer('edit', catalogName, unique);

const operationOnServer = (type, catalogName, unique) => {
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};
	return (
		<Modal
			buttonProps={{
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type === 'add' ? false : true,
				// hidden: type === 'add' ? false : true,
				className: type === 'add' ? 'mr-8' : 'mr-0',
			}}
			toolTipProps={{
				title: type === 'add' ? 'Добавить' : 'Редактировать',
			}}
			modalConfig={{
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создать' : 'Редактировать'
				} ${unique}`,
				width: 550,
				bodyStyle: {height: 750},
				requestSaveRow: apiSaveByConfigName(
					`${catalogName}CatalogSave`
				), //не забыть поставить
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
				path: `catalog.${catalogName}Table.modal.events.${type}OnModal`,
				type: 'event',
			}}
			subscribe={[
				{
					name: `${catalogName}TableInfo`,
					path: `rtd.catalog.${catalogName}Table.table.selected`,
					onChange: ({value, setModalData, setButtonProps}) => {
						value && setModalData && setModalData(value);
						// console.log(value);
						type === 'edit' &&
							setButtonProps &&
							setButtonProps({
								disabled: value.isGroup,
								hidden: value.isGroup,
							});
					},
				},
			]}
		>
			<FormBody>
				<Input itemProps={{...itemsInfo.typeEquipment}} />
				<Input itemProps={{...itemsInfo.sapId}} />
				<Input itemProps={{...itemsInfo.name}} />
				<Text
					itemProps={{...itemsInfo.techPlacePath}}
					subscribe={[
						{
							name: `${catalogName}TextArea`,
							path: `rtd.catalog.${catalogName}Table.modal.${type}ModalSelect`,
							onChange: ({value, setSubscribeProps}) => {
								value &&
									setSubscribeProps &&
									setSubscribeProps({value: value});
							},
						},
					]}
				/>
				<TreeSelect
					itemProps={{...itemsInfo.parentId}}
					// treeCheckable={true}

					treeCheckStrictly={false}
					treeDefaultExpandAll={true}
					requestLoadRows={({data, params}) =>
						apiGetHierarchicalDataByConfigName('equipments')({
							data: {...data, isGroup: true},
							params,
						})
					}
					optionConverter={(option) => ({
						value: option.id, //change
						label: (
							<span>
								{option.isGroup ? (
									<FolderOutlined />
								) : (
									<ToolOutlined />
								)}{' '}
								{option.name}
							</span>
						),
						children: option.children,
						// checkable: !option.isGroup,
						// selectable: !option.isGroup,
					})}
					dispatch={{
						path: `catalog.${catalogName}Table.modal.${type}ModalSelect`,
					}}
				/>
				<Input itemProps={{...itemsInfo.constructionType}} />
				<Input itemProps={{...itemsInfo.material}} />
				<Input itemProps={{...itemsInfo.size}} />
				<Input itemProps={{...itemsInfo.weight}} />
				<Input itemProps={{...itemsInfo.manufacturer}} />
				<Checkbox
					itemProps={{...itemsInfo.deleted, valuePropName: 'checked'}}
				/>

				<DatePicker
					itemProps={{...itemsInfo.dateFinish}}
					onChange={(date, dateString) => {
						return dateString;
					}}
					format={'DD.MM.YYYY'}
				/>
				<Title label={'Гарантии'} level={5} />
				<DatePicker
					itemProps={{...itemsInfo.dateWarrantyStart}}
					dispatch={{
						path: `catalog.${catalogName}Table.modal.${type}ModalStartDate`,
					}}
					subscribe={[
						{
							name: `${catalogName}StartDate`,
							path: `rtd.catalog.${catalogName}Table.modal.${type}ModalFinishDate`,
							onChange: ({value, setSubscribeProps}) => {
								setSubscribeProps({
									disabledDate: (startValue) =>
										disabledStartDate(startValue, value),
								});
							},
						},
					]}
					format={'DD.MM.YYYY'}
				/>
				<DatePicker
					itemProps={{...itemsInfo.dateWarrantyFinish}}
					dispatch={{
						path: `catalog.${catalogName}Table.modal.${type}ModalFinishDate`,
					}}
					subscribe={[
						{
							name: 'endDate',
							path: `rtd.catalog.${catalogName}Table.modal.${type}ModalStartDate`,
							onChange: ({value, setSubscribeProps}) => {
								// console.log(value)
								setSubscribeProps({
									disabledDate: (endValue) =>
										disabledEndDate(value, endValue),
								});
							},
						},
					]}
					format={'DD.MM.YYYY'}
				/>
			</FormBody>
		</Modal>
	);
};
/**
 * */
