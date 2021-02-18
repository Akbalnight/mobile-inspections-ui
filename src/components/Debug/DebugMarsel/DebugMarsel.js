/**
 * Заметил, что state обновляется периодически.
 * работает в штатном режиме 80% случаев использования модального окна(закрытие с примечанием).
 * в остальных случаях не обновляется таблица.
 * В ситуацияхкогда выделений больше одного стабильность выше.
 *
 */
// 	const processBeforeSaveForm = (rawValues) => {
// 		const values = {...rawValues};
// 		const resultData = values.defectsWithNote.map((el) => {
// 			return {
// 				id: el.id,
// 				dateEliminationFact: values.dateEliminationFact,
// 				note: values.note,
// 			};
// 		});
// 		return {defectsWithNote: resultData};
// 	};
// const buttonCloseWithNote = [
// 	{
// 		componentType: 'Item',
// 		child: {
// 			componentType: 'Modal',
// 			buttonProps: {
// 				type: 'default',
// 				icon: <CloseWithNote />,
// 				className: 'ml-4 mr-8',
// 				disabled: true,
// 			},
// 			modalConfig: {
// 				type: 'editOnServer',
// 				title: `Закрыть с примечанием`,
// 				width: 600,
// 				bodyStyle: {height: 320},
// 				okText: 'Передать',
// 				onFinish: (values) => tableRef && tableRef.reloadData({}),
// 				requestSaveRow: apiSaveByConfigName('saveDefectsWithNote'), //Один и вариантов сохранения данных
// 				form: {
// 					name: 'defectCloseData',
// 					noPadding: true,
// 					labelCol: {span: 10},
// 					wrapperCol: {span: 12},
// 					loadInitData: (callBack, row) => {
// 						callBack(row);
// 					},
// 					// requestSaveForm: apiSaveByConfigName(
// 					// 	'saveDefectsWithNote'
// 					// ), //Один и вариантов сохранения данных
// 					processBeforeSaveForm: processBeforeSaveForm,
// 					methodSaveForm: 'PUT',
// 					body: [
// 						{
// 							componentType: 'Col',
// 							className: 'mt-16',
// 							children: [
// 								{
// 									componentType: 'Item',
// 									label: 'Выбрано дефектов',
// 									name: 'length',
// 									child: {
// 										componentType: 'Text',
// 									},
// 								},
// 								{
// 									componentType: 'Item',
// 									label: 'Дата фактического устранения',
// 									name: 'dateEliminationFact',
// 									child: {
// 										componentType: 'DatePicker',
// 										showTime: true,
// 									},
// 								},
// 								{
// 									componentType: 'Item',
// 									label: `Примечание
// 									по устранению`,
// 									name: 'note',
// 									child: {
// 										componentType: 'TextArea',
// 									},
// 								},
// 								{
// 									componentType: 'Item',
// 									hidden: true,
// 									name: 'defectsWithNote',
// 									child: {
// 										componentType: 'MultiSelect',
// 										rowRender: 'name',
// 									},
// 								},
// 							],
// 						},
// 					],
// 				},
// 			},

// 			dispatchPath: 'defects.defectModalSendPanel.modal',
// 			subscribe: {
// 				name: 'tableCloseInfo',
// 				path: 'rtd.defects.defectTable.table.selected',
// 				onChange: ({value, setModalData, setButtonProps}) => {
// 					value &&
// 						setModalData &&
// 						setModalData({
// 							defectsWithNote: value,
// 							length: value.length,
// 						});
// 					value &&
// 						setButtonProps &&
// 						setButtonProps({disabled: !(value.length > 0)});
// 				},
// 			},
// 		},
// 	},
// ];
