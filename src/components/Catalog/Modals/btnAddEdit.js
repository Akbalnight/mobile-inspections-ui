import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {apiGetFlatDataByConfigName} from '../../../apis/catalog.api';

export const addButton = (catalogName, unique) =>
	operationOnServer('add', catalogName, unique);
export const editButton = (catalogName, unique) =>
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
							// searchParamName: 'name',
							showArrow: true,
							filterOption: false,
							// widthControl: '250px',
							// dropdownMatchSelectWidth: 400,
							mode: 'single',
							allowClear: true,
							infinityMode: true,
							requestLoadRows: apiGetFlatDataByConfigName(
								catalogName
							),
							optionConverter: (option) => ({
								label: <span>{option.name}</span>,
								value: option.id,
								className: '',
								disabled: undefined,
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
			},
			modalConfig: {
				type: `${type}OnServer`,
				title: `${
					type === 'add' ? 'Создать' : 'Редактировать'
				} ${unique}`,
				width: 450,
				bodyStyle: {height: catalogName === 'departments' ? 200 : 150},
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
					body: [...mainFields(catalogName)],
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
					onChange: ({
						value,
						setModalData,
						setButtonProps,
						setSubscribeProps,
					}) => {
						// console.log(value.children.length);
						value && setModalData && setModalData(value);
						type !== 'add' &&
							setButtonProps &&
							setButtonProps({
								disabled: !value, //временно (value.children.length === 0)
							});
						// type ==='add' && value.children.length>=1 &&
						// setSubscribeProps && setSubscribeProps({title:'12'})
					},
				},
			],
		},
	};
};
