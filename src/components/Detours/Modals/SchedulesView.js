export const schedulesViewModal = () => {
	let Row;

	const loadData = (callBack, row) => {
		Row = row;
		callBack(row);
	};
	/**
	 * Найминг в этом разделе взят из фигмы, такого нейминкга с сервера может не быть
	 *
	 * ключевые имена
	 * name -Наименование обхода
	 * route- Маршрут
	 * dateStart -дата начала
	 * dateEnd - дата окончания
	 * executor - исполнитель
	 *
	 * вспомогательные зависимые друг от друга
	 * пара 1
	 * orderSchedules - порядок обхода
	 *deviationOrderSchedules - допустимое отклониение
	 * пара 2
	 * timeSchedules- время обхода
	 * deviationTimeSchedules - допустимое отклониение
	 * пара 3
	 * timeStartSchedules- время начала обхода
	 * deviationTimeStartSchedules - допустимое отклониение
	 *
	 * пара 4
	 * timeEndSchedules- время окончания обхода
	 * deviationTimeEndSchedules - допустимое отклониение
	 *
	 *
	 */
	const infoFields = [
		{
			componentType: 'Row',
			// gutter: [8, 8],
			children: [
				{
					componentType: 'Col',
					// span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Наименование обхода',
							name: 'name',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},

						{
							componentType: 'Item',
							label: 'Маршрут',
							name: 'route',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Дата начала',
							name: 'dateStart',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Дата окончания',
							name: 'dateEnd',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Исполнитель',
							name: 'executor',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Порядок обхода',
							name: 'orderSchedules',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Допустимое откл., мин',
							name: 'deviationOrderSchedules',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Время обхода',
							name: 'timeSchedules',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Допустимое откл. на точке, мин',
							name: 'deviationTimeSchedules',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Время начала обхода',
							name: 'timeStartSchedules',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Допустимое откл., мин',
							name: 'deviationTimeStartSchedules',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Время окончания обхода',
							name: 'timeEndSchedules',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
						{
							componentType: 'Item',
							label: 'Допустимое откл., мин',
							name: 'deviationTimeEndSchedules',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
					],
				},
			],
		},
	];

	return {
		type: 'viewObject',
		title: `Просмотр обхода ${Row}`, //  Row  тут чтобы husky не ругался
		width: 426,
		bodyStyle: {
			height: 539,
		},
		form: {
			name: 'schedulesDataView',
			loadInitData: loadData,
			body: [...infoFields],
		},
	};
};
