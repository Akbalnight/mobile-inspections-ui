export const modalInfo = (catalogName, unique) => {
	const mainFields = [
		{
			componentType: 'Item',
			name: 'code',
			label: 'Код',
			child: {
				componentType: 'Text',
			},
		},
		{
			componentType: 'Item',
			name: 'name',
			label: 'Наименование',
			child: {
				componentType: 'Text',
			},
		},
	];
	const loadData = (callBack, row) => {
		callBack(row);
	};

	return {
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			modalConfig: {
				type: 'viewObject',
				title: `Подробная информация`,
				width: 350,
				bodyStyle: {height: 200},
				form: {
					name: `${catalogName}ModalInfoForm`,
					loadInitData: loadData,
					labelCol: {span: 10},
					wrapperCol: {span: 12},
					body: [...mainFields],
				},
			},
			subscribe: [
				{
					name: `${catalogName}ModalInfo`,
					path: `rtd.catalog.${catalogName}Table.table.events.onRowDoubleClick`,
					onChange: ({value, setModalData, openModal}) => {
						value &&
							setModalData &&
							setModalData({
								...value.value,
							});
						openModal();
					},
				},
			],
		},
	};
};
