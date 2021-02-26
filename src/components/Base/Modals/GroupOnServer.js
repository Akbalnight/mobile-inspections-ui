import {
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import {codeInput} from '../Inputs/CodeInput';

const loadRowsHandler = (getCatalogName, sRow, {params, data}) => {
	// Формрование нового объекта
	// isGroup: true - получить только группы
	// owner - исключает собственный id и всю ветку под собой из выдачи сервером
	const newData = {...data, isGroup: true, owner: sRow && sRow.id};
	return apiGetHierarchicalDataByConfigName(getCatalogName)({
		params,
		data: newData,
	});
};

const GroupOnServer = (type, getCatalogName, saveCatalogName, code) => {
	// sRow хранить ту строку с данными которая открывается на редактирование
	let sRow;
	return {
		type: `${type}GroupOnServer`,
		requestSaveRow: apiSaveByConfigName(saveCatalogName),
		width: 500,
		// bodyStyle: {height: 400},
		title: `${
			type === 'edit' ? 'Редактировать' : 'Создать'
		} группы контрольных точек`,
		form: {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
			loadInitData: (callBack, row) => {
				// Сохранение строки, которую собираемся редактировать
				sRow = row;

				// Возвращение объекта или null в зависимоти от типа операции
				callBack(type === 'edit' ? row : null);
			},
			// methodSaveForm: type==='add'? 'POST': 'PUT',
			// requestSaveForm: apiSaveByConfigName(saveCatalogName),
			className: 'lastSelectModal',
			body: [
				code,
				{
					componentType: 'Item',
					label: 'Наименование',
					name: 'name',
					rules: [
						{
							message: 'Заполните наименование',
							required: true,
						},
					],
					child: {componentType: 'Input'},
				},
				{
					componentType: 'Item',
					label: 'Родитель',
					name: 'parentId',
					child: {
						componentType: 'SingleSelect',
						widthControl: 0,
						heightPopup: 300,
						widthPopup: 300,
						expandColumnKey: 'id',
						rowRender: 'name',
						nodeAssociated: false,
						expandDefaultAll: true,
						// (info) аналогично ({params, data})
						// Но поскольку тут раскрывать объект не нужно, мы можем просто передать его дальше
						requestLoadRows: (info) =>
							loadRowsHandler(getCatalogName, sRow, info),
						requestLoadDefault: apiGetFlatDataByConfigName(
							getCatalogName
						),
					},
				},
			],
		},
	};
};

export const addGroupOnServer = (getCatalogName, saveCatalogName) =>
	GroupOnServer('add', getCatalogName, saveCatalogName, {});

export const editGroupOnServer = (getCatalogName, saveCatalogName) =>
	GroupOnServer('edit', getCatalogName, saveCatalogName, codeInput);
