import {
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveBaseCatalogWithParentIdD
} from '../../../apis/catalog.api';

export const addGroupOnServer = catalogName =>
	GroupOnServer('add', catalogName, {});
export const editGroupOnServer = catalogName =>
	GroupOnServer('edit', catalogName, {
		componentType: 'Item',
		label: 'Код',
		name: 'code',
		rules: [
			{
				message: 'Заполните наименование',
				required: true
			}
		],
		child: {
			componentType: 'InputNumber'
		}
	});

const GroupOnServer = (type, catalogName, code) => {
	let sRow;
	return {
		type: `${type}GroupOnServer`,
		initialValues: row => {
			sRow = row;
			return type === 'edit' ? row : null;
		},
		requestSaveRow: apiSaveBaseCatalogWithParentIdD(catalogName),
		width: 500,
		form: {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
			body: [
				code,
				{
					componentType: 'Item',
					label: 'Наименование',
					name: 'name',
					rules: [
						{
							message: 'Заполните наименование',
							required: true
						}
					],
					child: {
						componentType: 'Input'
					}
				},
				{
					componentType: 'Item',
					label: 'Родитель',
					name: 'parentId',
					child: {
						componentType: 'SingleSelect',
						widthControl: 0,
						heightPopup: 300,
						expandColumnKey: 'id',
						rowRender: 'name',
						nodeAssociated: false,
						expandDefaultAll: true,
						requestLoadRows: ({data, params}) =>
							apiGetHierarchicalDataByConfigName(catalogName)({
								data: {
									...data,
									isGroup: true,
									owner: sRow && sRow.id
								},
								params
							}),
						requestLoadDefault: apiGetFlatDataByConfigName(
							catalogName
						)
					}
				}
			]
		}
	};
};
