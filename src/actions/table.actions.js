export const initTableStore = (path, section) => ({
	type: 'INIT_TABLE_STORE',
	payload: {path, section},
});

export const setRows = (path, section, rows) => ({
	type: 'SET_ROWS',
	payload: {path, section, rows},
});
export const addRow = (path, section, row) => ({
	type: 'ADD_ROW',
	payload: {path, section, row},
});
export const changeRow = (path, section, row) => ({
	type: 'CHANGE_ROW',
	payload: {path, section, row},
});
export const deleteRow = (path, section, row) => ({
	type: 'DELETE_ROW',
	payload: {path, section, row},
});
