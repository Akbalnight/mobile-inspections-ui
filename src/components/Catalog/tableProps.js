import {addCustomButton, editCustomButton} from './Modals/btnCustomObject';
import {addGroupButton, editGroupButton} from './Modals/btnCustomGroup';
import {addDefaultButton, editDefaultButton} from './Modals/btnDefaultObject';
import {deleteButton} from './Modals/btnDelete';
import {modalDefaultInfo} from './Modals/modalDefaultInfo';

export const headerTable = (catalogName, unique) => {
	const defaultModals = [
		addDefaultButton(catalogName, unique),
		editDefaultButton(catalogName, unique),
		deleteButton(catalogName, unique),
		modalDefaultInfo(catalogName),
	];
	const customModals = [
		addCustomButton(catalogName, unique),
		addGroupButton(catalogName, unique),
		editCustomButton(catalogName, unique),
		editGroupButton(catalogName, unique),
		deleteButton(catalogName, unique),
	];
	return {
		componentType: 'Row', // комментарий ниже
		className: 'p-8',
		children: [
			...(catalogName !== 'equipments' ? defaultModals : customModals),
		],
	};
};

/** Если возвращаемый компонент Space используем данную конструкцию
 * {
			componentType: 'Row',
			children: [
				editCustomButton(catalogName, unique),
				editGroupButton(catalogName, unique),
			],
		},
 */
