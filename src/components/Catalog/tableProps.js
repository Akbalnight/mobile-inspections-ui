import {addButton, editButton} from './Modals/btnAddEdit';
import {deleteButton} from './Modals/btnDelete';
import {modalInfo} from './Modals/modalInfo';

export const headerTable = (catalogName, unique) => {
	return {
		componentType: 'Space',
		className: 'p-8',
		children: [
			addButton(catalogName, unique),
			editButton(catalogName, unique),
			deleteButton(catalogName, unique),
			modalInfo(catalogName, unique),
		],
	};
};
