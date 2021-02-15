/**
 * Модальное окно информации о группе КТ, если группа наивысшего порядка, то родителя не будет
 * Надо обдумать как вырулить данную ситуацию
 */

export const controlPointsGroupInfo = () => {
	const loadData = (callBack, row) => {
		callBack(row);
	};
	const infoFields = [
		{
			componentType: 'Item',
			label: 'Код',
			name: 'code',
			child: {
				componentType: 'Text',
			},
		},
		{
			componentType: 'Item',
			label: 'Наименование',
			name: 'name',
			child: {
				componentType: 'Text',
			},
		},
		/**
		 * если кликать на главный родительский элемент,
		 * то TEXT будет пустым не кого - вписать.
		 * Возможно сюда можно применить условие при котором эта графа не будет видна
		 */
		{
			componentType: 'Item',
			label: 'Родитель',
			name: 'parentName',
			child: {
				componentType: 'Text',
			},
		},
	];
	return {
		type: 'viewGroup',
		title: `Информация о группе контрольных точек`,
		width: 430,
		bodyStyle: {height: 220},
		form: {
			name: 'controlPointsGroupView',
			noPadding: true,
			loadInitData: loadData,
			labelCol: {span: 8},
			wrapperCol: {span: 16},
			body: [...infoFields],
		},
	};
};
