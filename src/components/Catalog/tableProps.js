export const itemsInfo = {
	/*
	 * btnDecCustomObject.js
	 * */
	typeEquipment: {
		name: 'typeEquipment',
		label: 'Тип единицы оборудования',
		className: 'mb-8',
	},
	sapId: {
		name: 'sapId',
		label: 'SAP_ID',
		className: 'mb-8',
	},
	name: {
		name: 'name',
		label: 'Наименование',
		className: 'mb-8',
	},
	techPlacePath: {
		name: 'techPlacePath',
		label: 'Код технического места',
		className: 'mb-8',
	},
	parentId: {
		name: 'parentId',
		label: 'Техническое место',
		className: 'mb-8',
	},
	constructionType: {
		name: 'constructionType',
		label: 'Тип конструкции',
		className: 'mb-8',
	},
	material: {
		name: 'material',
		label: 'Материал',
		className: 'mb-8',
	},
	size: {
		name: 'size',
		label: 'Величина/размер',
		className: 'mb-8',
	},
	weight: {
		name: 'weight',
		label: 'Вес',
		className: 'mb-8',
	},
	manufacturer: {
		name: 'manufacturer',
		label: 'Изготовитель',
		className: 'mb-8',
	},
	deleted: {
		name: 'deleted',
		label: 'Метка удаления',
		className: 'mb-8',
	},
	dateFinish: {
		name: 'dateFinish',
		label: 'Действителен до',
		className: 'mb-8',
	},
	measuringPoints: {
		name: 'measuringPoints',
		label: 'Точки измерений',
		className: 'mb-8',
	},

	dateWarrantyStart: {
		name: 'dateWarrantyStart',
		label: 'Начало гарантии',
		className: 'mb-8',
	},

	dateWarrantyFinish: {
		name: 'dateWarrantyFinish',
		label: 'Окончание гарантии',
		className: 'mb-8',
	},

	/*
	 * btnDecCustomGroup.js
	 * */
	techPlace: {
		name: 'techPlace',
		label: 'Техническое место',
		className: 'mb-8',
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
