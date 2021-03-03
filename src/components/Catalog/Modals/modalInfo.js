export const modalInfo = (catalogName, unique) => {
	const mainFields = (catalogName) => {
		switch (catalogName) {
			case 'departments':
				return [
					{
						componentType: 'Item',
						name: 'code',
						label: 'Код',
						className: 'mb-0',
						child: {
							componentType: 'Text',
						},
					},
					{
						componentType: 'Item',
						name: 'name',
						label: 'Наименование',
						className: 'mb-0',
						child: {
							componentType: 'Text',
						},
					},
					{
						componentType: 'Item',
						name: 'parentId',
						label: 'Родитель',
						className: 'mb-0',
						child: {
							componentType: 'Text',
						},
					},
				];

			default:
				return [
					{
						componentType: 'Item',
						name: 'code',
						label: 'Код',
						className: 'mb-0',
						child: {
							componentType: 'Text',
						},
					},
					{
						componentType: 'Item',
						name: 'name',
						label: 'Наименование',
						className: 'mb-0',
						child: {
							componentType: 'Text',
						},
					},
				];
		}
	};
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
				bodyStyle: {height: catalogName === 'departments' ? 200 : 150},
				form: {
					name: `${catalogName}ModalInfoForm`,
					loadInitData: loadData,
					labelCol: {span: 12},
					wrapperCol: {span: 12},
					body: [...mainFields(catalogName)],
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
