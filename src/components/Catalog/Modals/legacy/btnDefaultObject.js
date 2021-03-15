import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../../apis/catalog.api';

export const addDefaultButton = (catalogName, unique) =>
	operationOnServer('add', catalogName, unique);
export const editDefaultButton = (catalogName, unique) =>
	operationOnServer('edit', catalogName, unique);

const operationOnServer = (type, catalogName, unique) => {
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};
	const mainFields = (catalogName) => {
		switch (catalogName) {
			case 'departments':
				return [
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
						name: 'parentId',
						label: 'Родитель',
						child: {
							componentType: 'Select',
							autoClearSearchValue: true,
							showSearch: true,
							showArrow: true,
							filterOption: false,
							mode: 'single',
							allowClear: true,
							infinityMode: true,
							requestLoadRows: apiGetFlatDataByConfigName(
								catalogName
							),
							optionConverter: (option) => ({
								label: option.name,
								value: option.id,
							}),
						},
					},
				];
			default:
				return [
					{
						componentType: 'Item',
						name: 'name',
						label: 'Наименование',
						child: {
							componentType: 'Input',
						},
					},
				];
		}
	};
	return {
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type === 'add' ? false : true,
				className: 'mr-8',
			},
			modalConfig: {
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создать' : 'Редактировать'
				} ${unique}`,
				width: 450,
				bodyStyle: {height: catalogName === 'departments' ? 200 : 150},
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
					body: [...mainFields(catalogName)],
				},
			},
			dispatch: {
				path: `catalog.${catalogName}Table.modal.events.on${
					type[0].toUpperCase() + type.substring(1)
				}Modal`,
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
								disabled: !value,
							});
					},
				},
			],
		},
	};
};
