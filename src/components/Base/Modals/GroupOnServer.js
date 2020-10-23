import {
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveBaseCatalogWithParentIdD
} from '../../../apis/catalog.api';
import {codeInput} from '../Inputs/CodeInput';

const loadRowsHandler = (catalogName, sRow, {params, data}) => {
	// Формрование нового объекта
	// isGroup: true - получить только группы
	// owner - исключает собственный id и всю ветку под собой из выдачи сервером
	const newData = {...data, isGroup: true, owner: sRow && sRow.id};
	return apiGetHierarchicalDataByConfigName(catalogName)({
		params,
		data: newData
	});
};

const GroupOnServer = (type, catalogName, code) => {
	// sRow хранить ту строку с данными которая открывается на редактирование
	let sRow;
	return {
		type: `${type}GroupOnServer`,
		requestSaveRow: apiSaveBaseCatalogWithParentIdD(catalogName),
		width: 500,
		form: {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
			loadInitData: (callBack, row) => {
				// Сохранение строки, которую собираемся редактировать
				sRow = row;

				// Возвращение объекта или null в зависимоти от типа операции
				callBack(type === 'edit' ? row : null);
			},
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
					child: {componentType: 'Input'}
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
						// (info) аналогично ({params, data})
						// Но поскольку тут раскрывать объект не нужно, мы можем просто передать его дальше
						requestLoadRows: info =>
							loadRowsHandler(catalogName, sRow, info),
						requestLoadDefault: apiGetFlatDataByConfigName(
							catalogName
						)
					}
				}
			]
		}
	};
};

export const addGroupOnServer = catalogName =>
	GroupOnServer('add', catalogName, {});

export const editGroupOnServer = catalogName =>
	GroupOnServer('edit', catalogName, codeInput);
