export const groupView = title => {
	return {
		type: `viewGroup`,
		width: 500,
		title: title,
		form: {
			name: 'TechMapDataView',
			labelCol: {span: 8},
			wrapperCol: {span: 16},
			labelAlign: 'left',
			loadInitData: (callBack, row) => callBack(row),
			body: [
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Описание',
						level: 5
					}
				},
				{
					componentType: 'Row',
					gutter: [16, 16],
					children: [
						{
							componentType: 'Col',
							span: 24,
							children: [
								{
									componentType: 'Item',
									label: 'Код',
									name: 'code',
									className: 'mb-0',
									child: {componentType: 'Text'}
								},
								{
									componentType: 'Item',
									label: 'Наименование',
									name: 'name',
									className: 'mb-0',
									child: {componentType: 'Text'}
								},
								{
									componentType: 'Item',
									label: 'Группа',
									name: 'parentName',
									className: 'mb-0',
									child: {componentType: 'Text'}
								}
							]
						}
					]
				}
			]
		}
	};
};
