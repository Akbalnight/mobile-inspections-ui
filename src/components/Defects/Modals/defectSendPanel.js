import {defectDetection} from '../../Base/Block/DefectDetection';

export const defectSendPanel = () => {
	let Row;
	const loadData = (callBack, row) => {
		Row = row;
		callBack(row);
	};
	const defectDetectionFields = [
		{...defectDetection},
		{
			componentType: 'Item',
			label: 'Передать в SAP',
			name: 'sendedToSap', // не уверен что тут такое название
			className: 'mb-0',
			child: {
				componentType: 'Checkbox',
			},
		},
	];

	// const footerField =[
	//     {
	//         componentType: 'Item',
	//         className: 'mr-16',
	//         child: {
	//             componentType: 'Button',
	//             label: 'Отмена',

	//         }
	//     },
	//     {
	//         componentType: 'Item',
	//         type: 'primary',
	//         child: {
	//             componentType: 'Button',
	//             label: 'Передать',

	//         }
	//     },
	// ]

	return {
		type: 'viewObject', // мое предположение данная модалка должна делать addOnServer в конфиг panelProblems
		// viewObject  стоит для отладки модалки
		title: `Передать в панель проблем ${Row}`,
		width: 600,
		bodyStyle: {height: 420},
		form: {
			name: 'defectSendPanelData',
			noPadding: false,
			loadInitData: loadData,
			style: {
				paddingLeft: 50,
			},
			body: [...defectDetectionFields],
			// footer: [...footerField]
		},
	};
};
