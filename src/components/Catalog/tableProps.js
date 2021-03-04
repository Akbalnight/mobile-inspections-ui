import {addCustomButton, editCustomButton} from './Modals/btnCustomAddEdit';
import {addDefaultButton, editDefaultButton} from './Modals/btnDefaultAddEdit';
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
		editCustomButton(catalogName, unique),
		deleteButton(catalogName, unique),
	];
	return {
		componentType: 'Space',
		className: 'p-8',
		children: [
			...(catalogName !== 'equipments' ? defaultModals : customModals),
		],
	};
};
