export const table = (state = {}, action) => {
	switch (action.type) {
		case 'INIT_TABLE_STORE': {
			// console.log("INIT_TABLE_STORE: ", action.payload);
			const {path, section} = action.payload;
			return getNewState(state, path, section, 'rows', []);
		}
		case 'SET_ROWS': {
			const {path, section, rows} = action.payload;
			// console.log("SET_ROWS: ", path, section);
			return getNewState(state, path, section, 'rows', rows);
		}
		case 'ADD_ROW': {
			// console.log("ADD_ROW: ", action.payload);
			const {path, section, row} = action.payload;
			const {rowData} = row; // rowData, rowIndex, rowKey
			let rows = [...state[path][section].rows];
			rows.push(rowData);
			return getNewState(state, path, section, 'rows', rows);
		}
		case 'CHANGE_ROW': {
			// console.log("CHANGE_ROW: ", action.payload.row);
			const {path, section, row} = action.payload;
			const {rowData, rowIndex} = row; // rowData, rowIndex, rowKey
			let rows = [...state[path][section].rows];
			rows.splice(rowIndex, 1, rowData);
			return getNewState(state, path, section, 'rows', rows);
		}
		case 'DELETE_ROW': {
			// console.log("DELETE_ROW: ", action.payload.row);
			const {path, section, row} = action.payload;
			const {rowIndex} = row; // rowData, rowIndex, rowKey
			let rows = [...state[path][section].rows];
			rows.splice(rowIndex, 1);
			return getNewState(state, path, section, 'rows', rows);
		}
		default:
			return state;
	}
};

const getNewState = (state, path, section, objName, data) => {
	return {
		...state,
		[path]: {
			...state[path],
			[section]: {
				...(state[path] ? state[path][section] : null),
				[objName]: data
			}
		}
	};
};
