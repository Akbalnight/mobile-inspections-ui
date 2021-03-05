import {EditOutlined, FolderAddOutlined} from '@ant-design/icons';
import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';

export const addGroupButton = (catalogName, unique) =>
	operationOnServer('add', catalogName, unique);
export const editGroupButton = (catalogName, unique) =>
	operationOnServer('edit', catalogName, unique);

const operationOnServer = (type, catalogName, unique) => {
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};
	const mainFields = [
		{
			componentType: 'Item',
			name: 'name',
			label: 'Наименование',
			child: {
				componentType: 'Input',
			},
		},
		{
			componentType: 'Item',
			name: 'codeTechPlace',
			label: 'Код технического места',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'Text',
				subscribe: [
					{
						name: `${catalogName}TextArea`,
						path: `rtd.catalog.${catalogName}Table.modal.${type}GroupModalSelect`,
						onChange: ({value, setSubscribeProps}) => {
							value &&
								setSubscribeProps &&
								setSubscribeProps({value: value});
						},
					},
				],
			},
		},
		{
			componentType: 'Item',
			name: 'nameTechPlace',
			label: 'Техническое место',
			className: 'mt-8 mb-0',
			child: {
				componentType: 'Select',
				autoClearSearchValue: true,
				showSearch: true,
				searchParamName: 'name',
				showArrow: true,
				filterOption: false,
				mode: 'single',
				allowClear: true,
				infinityMode: true,
				requestLoadRows: apiGetFlatDataByConfigName('equipmentMarks'),
				optionConverter: (option) => ({
					label: option.name,
					value: option.name, //change
				}),
				dispatch: {
					path: `catalog.${catalogName}Table.modal.${type}GroupModalSelect`,
				},
			},
		},
	];
	return {
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				type: 'default',
				icon: type === 'add' ? <FolderAddOutlined /> : <EditOutlined />,
				disabled: type === 'add' ? false : true,
				hidden: type === 'add' ? false : true,
				className: 'mr-8',
			},
			modalConfig: {
				type: `${type}GroupOnServer`,
				title: `${
					type === 'add' ? 'Создать' : 'Редактировать'
				} ${unique}`,
				width: 550,
				bodyStyle: {height: 400},
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
					body: [...mainFields],
				},
			},
			dispatch: {
				path: `catalog.${catalogName}Table.modal.events.on${
					type[0].toUpperCase() + type.substring(1)
				}GroupModal`,
				type: 'event',
			},
			subscribe: [
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
			],
		},
	};
};
