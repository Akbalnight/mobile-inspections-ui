/**
 * @desc Object with Item props in this section
 * @type {{measuringPoints: {name: string, className: string, label: string}, constructionType: {name: string, className: string, label: string}, dateWarrantyFinish: {name: string, className: string, label: string}, typeEquipment: {name: string, className: string, label: string}, code: {name: string, className: string, label: string}, departmentId: {name: string, className: string, label: string}, dateFinish: {name: string, className: string, label: string}, dateWarrantyStart: {name: string, className: string, label: string}, dateFinishSchedule: {name: string, className: string, label: string}, manufacturer: {name: string, className: string, label: string}, vacation: {name: string, className: string, label: string}, sapId: {name: string, className: string, label: string}, direction: {name: string, className: string, label: string}, techPlace: {name: string, className: string, label: string}, isGroupTypical: {name: string, className: string, label: string}, techPlacePath: {name: string, className: string, label: string}, weight: {name: string, className: string, label: string}, priority: {name: string, className: string, label: string}, userId: {name: string, className: string, label: string}, parentId: {name: string, className: string, label: string}, dateStartSchedule: {name: string, className: string, label: string}, sickLeaves: {name: string, className: string, label: string}, parentName: {name: string, className: string, label: string}, deleted: {name: string, className: string, label: string}, material: {name: string, className: string, label: string}, size: {name: string, className: string, label: string}, positionId: {name: string, className: string, label: string}, name: {name: string, className: string, label: string}, workSchedules: {name: string, className: string, label: string}}}
 */
export const itemsInfo = {
	/**
	 * btnDecCustomObject.js
	 */
	typeEquipment: {
		name: 'typeEquipment',
		label: 'Тип единицы оборудования',
		className: 'mb-8',
	},
	sapId: {
		name: 'sapId',
		label: 'SAP_ID',
		className: 'mb-8',
	},
	name: {
		name: 'name',
		label: 'Наименование',
		className: 'mb-8',
		rules: [
			{
				required: true,
				message: 'Заполните наименование',
			},
		],
	},
	techPlacePath: {
		name: 'techPlacePath',
		label: 'Код технического места',
		className: 'mb-8',
	},
	parentId: {
		name: 'parentId',
		label: 'Техническое место',
		className: 'mb-8',
	},
	constructionType: {
		name: 'constructionType',
		label: 'Тип конструкции',
		className: 'mb-8',
	},
	material: {
		name: 'material',
		label: 'Материал',
		className: 'mb-8',
	},
	size: {
		name: 'size',
		label: 'Величина/размер',
		className: 'mb-8',
	},
	weight: {
		name: 'weight',
		label: 'Вес',
		className: 'mb-8',
	},
	manufacturer: {
		name: 'manufacturer',
		label: 'Изготовитель',
		className: 'mb-8',
	},
	deleted: {
		name: 'deleted',
		label: 'Метка удаления',
		className: 'mb-8',
	},
	dateFinish: {
		name: 'dateFinish',
		label: 'Действителен до',
		className: 'mb-8',
	},
	measuringPoints: {
		name: 'measuringPoints',
		label: 'Точки измерений',
		className: 'mb-8',
	},

	dateWarrantyStart: {
		name: 'dateWarrantyStart',
		label: 'Начало гарантии',
		className: 'mb-8',
	},

	dateWarrantyFinish: {
		name: 'dateWarrantyFinish',
		label: 'Окончание гарантии',
		className: 'mb-8',
	},
	parentName: {
		name: 'parentName',
		label: 'Техническое место',
		className: 'mb-8',
	},

	/**
	 * CustomGroupOnServer.js
	 */
	techPlace: {
		name: 'techPlace',
		label: 'Техническое место',
		className: 'mb-8',
	},
	/**
	 * DefaultObjectView.js
	 */
	code: {
		name: 'code',
		label: 'Код',
		className: 'mb-8',
	},
	direction: {
		name: 'direction',
		label: 'Направление',
		className: 'mb-8',
	},
	priority: {
		name: 'priority',
		label: 'Приоритет',
		className: 'mb-8',
	},
	dateStartSchedule: {
		name: 'dateStart',
		label: 'Начало работы',
		className: 'mb-8',
	},
	dateFinishSchedule: {
		name: 'dateFinish',
		label: 'Окончание работы',
		className: 'mb-8',
	},
	isGroupTypical: {
		name: 'isGroup',
		label: 'Группа',
		className: 'mb-8',
	},
	positionId: {
		name: 'positionId',
		label: 'Должность',
		className: 'mb-8',
	},
	departmentId: {
		name: 'departmentId',
		label: 'Департамент',
		className: 'mb-8',
	},
	userId: {
		name: 'userId',
		label: 'Имя пользователя',
		className: 'mb-8',
	},
	workSchedules: {
		name: 'workSchedules',
		label: 'Рабочие графики',
		className: 'mb-8',
	},
	sickLeaves: {
		name: 'sickLeaves',
		label: 'Больничные',
		className: 'mb-8',
	},
	vacation: {
		name: 'vacation',
		label: 'Отпуска',
		className: 'mb-8',
	},
	username: {
		name: 'username',
		label: 'Имя сотрудника',
		className: 'mb-8',
	},
	positionName: {
		name: 'positionName',
		label: 'Должность',
		className: 'mb-8',
	},
	departmentName: {
		name: 'departmentName',
		label: 'Департамент',
		className: 'mb-8',
	},

	/**
	 * Detours/Registry/Modals/SaveObjectModal.js
	 */
	dateStartPlan: {
		name: 'dateStartPlan',
		label: 'Начало обхода (план)',
		className: 'mb-8',
		rules: [
			{
				message: 'Заполните дату начала обхода',
				required: true,
			},
		],
	},
	dateFinishPlan: {
		name: 'dateFinishPlan',
		label: 'Окончание обхода (план)',
		className: 'mb-8',
		rules: [
			{
				message: 'Заполните дату окончания обхода',
				required: true,
			},
		],
	},
	routeId: {
		name: 'routeId',
		label: 'Маршрут',
		className: 'mb-8',
		rules: [
			{
				message: 'Заполните маршрут',
				required: true,
			},
		],
	},
	detourStatusId: {
		name: 'statusId',
		label: 'Статус',
		className: 'mb-8',
		rules: [
			{
				message: 'Заполните статус',
				required: true,
			},
		],
	},
	executorId: {
		label: 'Доступные испольнители',
		name: 'staffId',
		className: 'mb-8',
	},
	saveOrderControlPoints: {
		label: 'Учитывать порядок обхода',
		name: 'saveOrderControlPoints',
		valuePropName: 'checked',
		className: 'mb-8',
	},
	takeIntoAccountTimeLocation: {
		name: 'takeIntoAccountTimeLocation',
		label: 'Учитывать время обхода',
		valuePropName: 'checked',
		className: 'mb-8',
	},
	takeIntoAccountDateStart: {
		name: 'takeIntoAccountDateStart',
		label: 'Учитывать время начала',
		valuePropName: 'checked',
		className: 'mb-8',
	},
	takeIntoAccountDateFinish: {
		name: 'takeIntoAccountDateFinish',
		label: 'Учитывать время окончания',
		valuePropName: 'checked',
		className: 'mb-8',
	},
	possibleDeviationLocationTime: {
		name: 'possibleDeviationLocationTime',
		label: 'Допустимое откл. на точке, мин',
		className: 'mb-8',
	},
	possibleDeviationDateStart: {
		name: 'possibleDeviationDateStart',
		label: 'Допустимое откл., мин',
		className: 'mb-8',
	},
	possibleDeviationDateFinish: {
		name: 'possibleDeviationDateFinish',
		label: 'Допустимое откл., мин',
		className: 'mb-8',
	},
};
