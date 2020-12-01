export const defectCloseModal = () => {
	let Row;
	const loadData = (callBack, row) => {
		Row = row;
		callBack(row);
	};

	const bodyFields = [
		{
			componentType: 'Layout',
			style: {
				marginLeft: 50,
			},
			children: [
				{
					componentType: 'Col',
					span: 20,
					children: [
						{
							componentType: 'Item',
							label: 'Выбрано дефектов',
							name: 'defectCount', // после выбора в таблице появится данное значение
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Дата фактического устранения',
							name: 'dateEliminationFact',
							child: {
								componentType: 'DatePicker',
							},
						},
						{
							componentType: 'Item',
							label: 'Примечание',
							name: 'note',
							child: {
								componentType: 'TextArea',
							},
						},
					],
				},
			],
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
		type: 'viewObject', // 'select' хотел попробовать, но в библиотеке он в файле formTable(modal events) закомментирован.
		// viewObject  стоит для отладки модалки
		title: `Закрыть с примечанием ${Row}`,
		width: 600,
		bodyStyle: {height: 320},
		form: {
			name: 'defectClodeData',
			noPadding: true,
			loadInitData: loadData,
			body: [...bodyFields],
			// footer: [...footerField]
		},
	};
};
