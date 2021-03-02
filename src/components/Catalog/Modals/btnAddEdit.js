import {EditOutlined, PlusOutlined} from '@ant-design/icons';

export const addButton = (catalogName, unique) =>
	operationOnServer('add', catalogName, unique);
export const editButton = (catalogName, unique) =>
	operationOnServer('edit', catalogName, unique);

const operationOnServer = (type, catalogName, unique) => {
	const loadData = (callBack, row) => {
		callBack(type === 'add' ? null : row);
	};

	return {
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				type: 'default',
				icon: type === 'add' ? <PlusOutlined /> : <EditOutlined />,
				disabled: type === 'add' ? false : true,
			},
			modalConfig: {
				// ...choiseModalConfig(type,catalogName)
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создать' : 'Редактировать'
				} ${unique}`,
				width: 350,
				bodyStyle: {height: 200},
				// requestSaveRow: funcSave, //не забыть поставить
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					// methodSaveForm: 'PUT',
					onFinish: (values) => {
						console.log('values', values);
					},
					labelCol: {span: 10},
					wrapperCol: {span: 12},
					body: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: '3',
							},
						},
					],
				},
			},
			dispatch: {
				path: `catalog.${catalogName}Table.modal.events.on${
					type[0].toUpperCase() + type.substring(1)
				}Modal`,
			},
			subscribe: [
				{
					name: `${catalogName}TableInfo`,
					path: `rtd.catalog.${catalogName}Table.table.selected`,
					onChange: ({value, setModalData, setButtonProps}) => {
						// console.log(value.children.length);
						value && setModalData && setModalData(value);
						type !== 'add' &&
							setButtonProps &&
							setButtonProps({
								disabled: !(value.children.length === 0),
							});
					},
				},
			],
		},
	};
};
