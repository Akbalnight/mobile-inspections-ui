export const itemsInfo = {
	/*
	 * btnDecCustomObject.js
	 * */
	typeEquipment: {
		name: 'typeEquipment',
		label: 'Тип единицы оборудования',
		className: 'mb-0',
	},
	sapId: {
		name: 'sapId',
		label: 'SAP_ID',
		className: 'mt-8 mb-0',
	},
	name: {
		name: 'name',
		label: 'Наименование',
		className: 'mt-8 mb-0',
	},
	techPlacePath: {
		name: 'techPlacePath',
		label: 'Код технического места',
		className: 'mt-8 mb-0',
	},
	parentId: {
		name: 'parentId',
		label: 'Техническое место',
		className: 'mt-8 mb-0',
	},
	constructionType: {
		name: 'constructionType',
		label: 'Тип конструкции',
		className: 'mt-8 mb-0',
	},
	material: {
		name: 'material',
		label: 'Материал',
		className: 'mt-8 mb-0',
	},
	size: {
		name: 'size',
		label: 'Величина/размер',
		className: 'mt-8 mb-0',
	},
	weight: {
		name: 'weight',
		label: 'Вес',
		className: 'mt-8 mb-0',
	},
	manufacturer: {
		name: 'manufacturer',
		label: 'Изготовитель',
		className: 'mt-8 mb-0',
	},
	deleted: {
		name: 'deleted',
		label: 'Метка удаления',
		className: 'mt-8 mb-0',
	},
	dateFinish: {
		name: 'dateFinish',
		label: 'Действителен до',
		className: 'mt-8 mb-0',
	},
	measuringPoints: {
		name: 'measuringPoints',
		label: 'Точки измерений',
		className: 'mt-8 mb-0',
	},

	dateWarrantyStart: {
		name: 'dateWarrantyStart',
		label: 'Начало гарантии',
		className: 'mt-8 mb-0',
	},

	dateWarrantyFinish: {
		name: 'dateWarrantyFinish',
		label: 'Окончание гарантии',
		className: 'mt-8 mb-0',
	},

	/*
	 * btnDecCustomGroup.js
	 * */
	techPlace: {
		name: 'techPlace',
		label: 'Техническое место',
		className: 'mt-8 mb-0',
	},
};

// import {addCustomButton, editCustomButton} from './Modals/legacy/btnCustomObject';
// import {addGroupButton, editGroupButton} from './Modals/legacy/btnCustomGroup';
// import {addDefaultButton, editDefaultButton} from './Modals/legacy/btnDefaultObject';
// import {deleteButton} from './Modals/legacy/btnDelete';
// import {modalDefaultInfo} from './Modals/legacy/modalDefaultInfo';
//
// export const headerTable = (catalogName, unique) => {
// 	const defaultModals = [
// 		addDefaultButton(catalogName, unique),
// 		editDefaultButton(catalogName, unique),
// 		deleteButton(catalogName, unique),
// 		modalDefaultInfo(catalogName),
// 	];
// 	const customModals = [
// 		addCustomButton(catalogName, unique),
// 		addGroupButton(catalogName, unique),
// 		editCustomButton(catalogName, unique),
// 		editGroupButton(catalogName, unique),
// 		deleteButton(catalogName, unique),
// 	];
// 	return {
// 		componentType: 'Row', // комментарий ниже
// 		className: 'p-8',
// 		children: [
// 			...(catalogName !== 'equipments' ? defaultModals : customModals),
// 		],
// 	};
// };

/** Если возвращаемый компонент Space используем данную конструкцию
 * {
			componentType: 'Row',
			children: [
				editCustomButton(catalogName, unique),
				editGroupButton(catalogName, unique),
			],
		},
 */
