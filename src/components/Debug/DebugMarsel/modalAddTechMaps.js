import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
/**
 * это модальное окно дополнение к уже готовому которое находится в TechMapSelectModal.js на
 * выбор можно оставить уже работающую или поставить ту которая в этом файле
 */
export const techMapsSelectModal = () => {
	const loadData = (callBack, row) => {
		callBack(row);
	};

	const selectFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Col',
					children: [
						{
							componentType: 'Item',
							label: 'Группа',
							name: 'techMapsGroupName',
							rules: [
								{
									message: 'Заполните группу',
									required: true,
								},
							],
							child: {
								componentType: 'SingleSelect',
								rowRender: 'name',
								widthControl: 0,
								dispatchPath:
									'controlPointData.modal.techMapGroup',
								requestLoadRows: ({data, params}) =>
									apiGetHierarchicalDataByConfigName(
										'techMaps'
									)({
										data: {
											...data,
											isGroup: true,
										},
										params,
									}),
								requestLoadConfig: apiGetConfigByName(
									'techMaps'
								),
							},
						},
						{
							componentType: 'Item',
							label: 'Технологическая карта',
							name: 'techMapsName',
							rules: [
								{
									message: 'Заполните технологическую карту',
									required: true,
								},
							],
							child: {
								componentType: 'SingleSelect',
								rowRender: 'name',
								widthControl: 0,
								defaultFilter: {parentId: null},
								dispatchPath:
									'controlPointData.modal.techMapName',
								// подписка на селектор выше
								subscribe: {
									name: 'techMap',
									path:
										'rtd.controlPointData.modal.techMapGroup.selected',
									onChange: ({value, setReloadTable}) => {
										console.log(
											'TechMapSelectModal subscribe',
											value.id
										);
										value &&
											setReloadTable &&
											setReloadTable({
												filter: {parentId: value.id},
											});
									},
								},
								requestLoadRows: apiGetFlatDataByConfigName(
									'techMaps'
								),
								requestLoadConfig: apiGetConfigByName(
									'techMaps'
								),
							},
						},
					],
				},
			],
		},
	];

	const tableFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'equipmetTable',
					child: {
						componentType: 'Title',
						label: 'Оборудование',
						level: 5,
					},
				},
				{
					componentType: 'Layout',
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'ServerTable',
								className: 'mb-0',
								style: {minHeight: 150},
								dispatchPath:
									'controlPointData.modal.techMapTable',
								defaultFilter: {techMapId: null},
								// подписка на селектор выше
								subscribe: {
									name: 'techMap',
									path:
										'rtd.controlPointData.modal.techMapName.selected',
									onChange: ({value, setReloadTable}) => {
										value &&
											setReloadTable &&
											setReloadTable({
												filter: {techMapId: value.id},
											});
									},
								},
								requestLoadRows: apiGetFlatDataByConfigName(
									'techOperationsSmall'
								),
								requestLoadConfig: apiGetConfigByName(
									'techOperationsSmall'
								),
								footerProps: {
									rightCustomSideElement: [
										{
											componentType: 'Item',
											name: 'duration',
											child: {
												componentType: 'Text',
												// подписка на таблицу выше дял подсчета результируещего времени
												subscribe: {
													name:
														'controlPointTechMapEquipmentTable',
													path:
														'rtd.controlPointData.modal.techMapTable.rows',
													onChange: ({
														value,
														setSubscribeProps,
													}) => {
														const totalDuration = value.reduce(
															(total, item) =>
																total +
																item.duration,
															0
														);
														setSubscribeProps({
															label: `Продолжительность всех операций: ${totalDuration} мин`,
															value: totalDuration,
														});
													},
												},
											},
										},
									],
								},
							},
						},
					],
				},
			],
		},
	];
	return {
		type: 'select',
		title: 'Добавить технологическую карту',
		width: 500,
		bodyStyle: {height: 450},
		form: {
			name: 'techMapsAddData',
			loadInitData: loadData,
			labelCol: {span: 12},
			wrapperCol: {span: 8},
			body: [...selectFields, ...tableFields],
		},
	};
};
