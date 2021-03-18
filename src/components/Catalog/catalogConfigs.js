// import BaseModalWithParentId from "./Forms/BaseModals/BaseModalWithParentId"
// import BaseModal from "./Forms/BaseModals/BaseModal";
// import EquipmentsModal from "./Forms/Equipments/EquipmentsModal";
// import EquipmentsGroupModal from "./Forms/Equipments/EquipmentsGroupModal";

export const catalogConfigs = (paths) => [
	{
		name: 'departments',
		path: `${paths.CATALOG.path}/departments`,
		title: 'Организационная структура предприятия',
		hierarchical: true,
		unique: 'департамент',
	},
	{
		name: 'techMapsStatuses',
		path: `${paths.CATALOG.path}/techMapsStatuses`,
		title: 'Статусы технологических карт',
		hierarchical: false,
		unique: 'статус',
	},
	{
		name: 'staffPositions',
		path: `${paths.CATALOG.path}/staffPositions`,
		title: 'Должности',
		hierarchical: false,
		unique: 'должность',
	},
	{
		name: 'equipments',
		path: `${paths.CATALOG.path}/equipments`,
		title: 'Оборудование',
		hierarchical: true,
		unique: 'оборудование',
	},
	{
		name: 'staffQualifications',
		path: `${paths.CATALOG.path}/staffQualifications`,
		title: 'Квалификации',
		hierarchical: false,
		unique: 'квалификации',
	},
	{
		name: 'defectStatusesProcess',
		path: `${paths.CATALOG.path}/defectStatusesProcess`,
		title: 'Статусы обработки дефектов',
		hierarchical: false,
		unique: 'статус обрадотки дефекта',
	},
	// {
	//     name: 'defectTypicalGroups',
	//     path: `${paths.CATALOG.path}/defectTypicalGroups`,
	//     title: 'Группы типовых дефектов',
	//     SaveForm: BaseModal
	// },
	// {
	//     name: 'panelProblemsPriorities',
	//     path: `${paths.CATALOG.path}/panelProblemsPriorities`,
	//     title: 'Приоритеты панели проблем',
	//     SaveForm: BaseModal
	// },
	// {
	//     name: 'panelProblemsStatuses',
	//     path: `${paths.CATALOG.path}/panelProblemsStatuses`,
	//     title: 'Статусы панели проблем',
	//     SaveForm: BaseModal
	// },
	// {
	//     name: 'sapMessagesToro',
	//     path: `${paths.CATALOG.path}/sapMessagesToro`,
	//     title: 'Сообщения САП',
	//     SaveForm: BaseModal
	// },
	// {
	//     name: 'sapStatusesToro',
	//     path: `${paths.CATALOG.path}/sapStatusesToro`,
	//     title: 'Статусы САП',
	//     SaveForm: BaseModal
	// },
	// {
	//     name: 'filesTypes',
	//     path: `${paths.CATALOG.path}/filesTypes`,
	//     title: 'Типы файлов',
	//     SaveForm: BaseModal
	// },
	// {
	//     name: 'symbolRfid',
	//     path: `${paths.CATALOG.path}/symbolRfid`,
	//     title: 'Метки RFID',
	//     SaveForm: BaseModal
	// },
];

// // Метки RFID
//      symbolRfid("public.symbol_rfid"),
//
//     // Критичность дефектов
//     ++defectCriticality("public.defect_criticality"),
//
//     // Статусы обработки дефектов
//     ++defectStatusesProcess("public.defect_statuses_process"),
//
//     // Группа типовых дефектов (картины повреждений)
//     ++defectTypicalGroups("public.defect_typical_groups"),
//
//     // Марка оборудования
//     ++equipmentMarks("public.equipment_marks"),
//
//     // Модель оборудования
//     ++equipmentModels("public.equipment_models"),
//
//     // Типы файлов (фото, видео, документ)
//     +filesTypes("public.files_types"),
//
//     // Приоритеты панели проблем
//     +panelProblemsPriorities("public.panel_problems_priorities"),
//
//     // Статусы панели проблем
//     +panelProblemsStatuses("public.panel_problems_statuses"),
//
//     // Сообщения САП
//     +sapMessagesToro("public.sap_messages_toro"),
//
//     // Статусы САП
//     +sapStatusesToro("public.sap_statuses_toro"),
//
//     // Должности
//     ++staffPositions("public.staff_positions"),
//
//     // :
//     ++staffQualifications("public.staff_qualifications"),
//
//     // Допуски сотрудников
//     ++staffResolves("public.staff_resolves"),
