export const infoTabFields = [
	{
		componentType: 'Layout',
		style: {padding: '24px'},
		children: [
			{
				componentType: 'Col',
				children: [
					{
						componentType: 'Item',
						label: '№ в Журнале Дефектов',
						name: 'code',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Статус',
						name: 'statusProcessName',
						className: 'mb-0',
						child: {
							componentType: 'Text',
						},
					},
				],
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					label: 'Выявление дефекта',
					level: 5,
				},
			},

			{
				componentType: 'Col',
				children: [
					{
						componentType: 'Item',
						label: 'Дата обнаружения',
						name: 'dateDetectDefect',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Оборудование',
						name: 'equipmentName',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Описание',
						name: 'description',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Обнаружил',
						name: 'staffDetectName',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
				],
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					label: 'План устранения',
					level: 5,
				},
			},
			{
				componentType: 'Col',
				children: [
					{
						componentType: 'Item',
						label: 'Плановый срок устранения',
						name: 'dateEliminationPlan',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Диспетчер',
						name: 'staffEliminationId',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'Отклонение от КПЭ',
						name: 'kpi',
						className: 'mb-0',
						valuePropName: 'checked',
						rules: [
							{
								type: 'boolean',
							},
						],
						child: {
							componentType: 'Checkbox',
							disabled: true,
						},
					},

					{
						componentType: 'Item',
						label: 'Причина возникновения',
						name: 'descriptionCauses',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
					{
						componentType: 'Item',
						label: 'План действий',
						name: 'actionPlan',
						className: 'mb-0',
						child: {componentType: 'Text'},
					},
				],
			},
		],
	},
];
