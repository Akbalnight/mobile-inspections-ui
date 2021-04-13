import React from 'react';
import {ReactComponent as SendToSap} from '../../../imgs/defects/send-to-sap-btn.svg';
import {ReactComponent as CloseWithNote} from '../../../imgs/defects/close-with-note-btn.svg';
import {ReactComponent as SendToPanel} from '../../../imgs/defects/send-to-panel-btn.svg';
import {
	apiSaveByConfigName,
	apiGetConfigByName,
} from '../../../apis/catalog.api';
import {classic} from 'rt-design';
import {defectDetection} from '../../Base/Block/DefectDetection';
// import {EditOutlined} from "@ant-design/icons";
// import {StatusIcon} from "../tableProps";

const {FormBody, Layout, Text, Table, Modal} = classic;

/**
 *
 * в этом файле находятся все модальные окна вызываемые componetType:'Modal', данные элементы полностью описаны тут.
 * Возникла необходимость передать из родителя ref  в buttonCloseWithNote
 */

export const buttonCloseWithNote = (ref) => {
	/**
	 * в массиве buttonCloseWithNote, есть сущность Modal
	 * она производит сохранение данных в выделенных в таблице дефектов.
	 * Важные аспекты для правильно передачи информации воспользовались hidden -MultiSelect, в него мы поместили больную информацию о выделенных дефектах
	 * послед этого в функции processBeforeSaveForm мы представили полученные данные в форме подходящей для нашего сервера.
	 * получившийся объект мы переадали в requestSaveRow(свойство Modal, важно type: 'editOnServer'), приэтом можем передать requestSaveForm (свойство Form).
	 * Изменения на сервер произошли и мы обновили таблицу при мопомщи конструкции onFinish: (values) => tableRef && tableRef.reloadData({}),
	 */

	const processBeforeSaveForm = (rawValues) => {
		const values = {...rawValues};
		const resultData = values.defectsWithNote.map((el) => {
			return {
				id: el.id,
				dateEliminationFact: values.dateEliminationFact,
				note: values.note,
			};
		});
		return {defectsWithNote: resultData};
	};

	return {
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				type: 'default',
				icon: <CloseWithNote />,
				// className: 'ml-4 mr-8',
				disabled: true,
			},
			modalConfig: {
				type: 'editOnServer',
				title: `Закрыть с примечанием`,
				width: 600,
				bodyStyle: {height: 320},
				okText: 'Передать',
				// onFinish: (values) => ref && ref.reloadData({}),
				onFinish: () => ref && ref.reloadData({}),
				requestSaveRow: apiSaveByConfigName('saveDefectsWithNote'), //Один и вариантов сохранения данных
				form: {
					name: 'defectCloseData',
					noPadding: true,
					labelCol: {span: 10},
					wrapperCol: {span: 12},
					loadInitData: (callBack, row) => {
						callBack(row);
					},
					processBeforeSaveForm: processBeforeSaveForm,
					methodSaveForm: 'PUT',
					body: [
						{
							componentType: 'Col',
							className: 'mt-16',
							children: [
								{
									componentType: 'Item',
									label: 'Выбрано дефектов',
									name: 'length',
									child: {
										componentType: 'Text',
									},
								},
								{
									componentType: 'Item',
									label: 'Дата фактического устранения',
									name: 'dateEliminationFact',
									child: {
										componentType: 'DatePicker',
										showTime: true,
									},
								},
								{
									componentType: 'Item',
									label: `Примечание
										по устранению`,
									name: 'note',
									child: {
										componentType: 'TextArea',
									},
								},
								{
									componentType: 'Item',
									hidden: true,
									name: 'defectsWithNote',
									child: {
										componentType: 'MultiSelect',
										rowRender: 'name',
									},
								},
							],
						},
					],
				},
			},

			dispatch: {
				path: 'defects.defectTable.modal.events.onWithNoteModal',
				type: 'event',
			},
			subscribe: [
				{
					name: 'tableCloseInfo',
					path: 'rtd.defects.defectTable.table.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
						value &&
							setModalData &&
							setModalData({
								defectsWithNote: value,
								length: value.length,
							});
						value &&
							setButtonProps &&
							setButtonProps({disabled: !(value.length > 0)});
					},
				},
			],
		},
	};
};

export const buttonSendToPanel = [
	{
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			buttonProps: {
				type: 'default',
				icon: <SendToPanel />,
				disabled: true,
			},
			modalConfig: {
				type: 'select',
				title: `Передать в панель проблем`,
				width: 600,
				bodyStyle: {height: 420},
				okText: 'Передать',
				form: {
					name: 'defectSendData',
					noPadding: true,
					labelCol: {span: 10},
					wrapperCol: {span: 12},
					style: {
						paddingTop: 30,
					},
					loadInitData: (callBack, row) => {
						callBack(row);
					},
					body: [
						{...defectDetection},
						{
							componentType: 'Item',
							label: 'Передать в SAP',
							name: 'sendedToSap',
							valuePropName: 'checked',
							rules: [
								{
									type: 'boolean',
								},
							],
							className: 'mb-0',
							child: {
								componentType: 'Checkbox',
							},
						},
					],
				},
			},

			dispatch: {
				path: 'defects.defectTable.modal.events.onSendPanelModal',
				type: 'event',
			},
			subscribe: [
				{
					name: 'tableSend',
					path: 'rtd.defects.defectTable.table.selected',
					onChange: ({value, setModalData, setButtonProps}) => {
						value &&
							setModalData &&
							setModalData({
								...value[value.length - 1],
							});
						value &&
							setButtonProps &&
							setButtonProps({disabled: !(value.length === 1)});
					},
				},
			],
		},
	},
];

export const ButtonSendToSap = () => {
	const processBeforeSaveForm = (rawValues) => {
		// console.log('rawValues', rawValues)
		const defectsToSapQueueArray =
			rawValues &&
			rawValues.defectsToSapQueueArray.map((row) => {
				return {...row, sendedToSap: true, viewOnPanel: true};
			});
		//console.log('modifiedValues', modifiedValues)
		return {defectsToSapQueueArray};
	};
	return (
		<>
			<Modal
				buttonProps={{
					type: 'default',
					icon: <SendToSap />,
					disabled: true,
				}}
				modalConfig={{
					okText: 'Передать',
					type: 'editOnServer',
					title: `Передать в SAP`,
					width: 650,
					bodyStyle: {height: 450},
					requestSaveRow: apiSaveByConfigName(`sapViewOnPanelSave`),
					form: {
						name: 'defectsToSapQueueModal',
						noPadding: false,
						methodSaveForm: 'POST',
						labelCol: {span: 12},
						wrapperCol: {span: 6},
						loadInitData: (callBack, row) => {
							callBack(row);
						},
						processBeforeSaveForm: processBeforeSaveForm,
					},
				}}
				dispatch={{
					path: 'defects.defectTable.modal.events.onSendToSapModal',
					// диспатчим туда же, где фильтр таблицы, т.к. перезагрузка таблицы одинаковая
					// path: 'rtd.defects.defectTable.events.onApplyFilter',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'sendToSap',
						path: 'rtd.defects.defectTable.table.selected',
						onChange: ({value, setModalData, setButtonProps}) => {
							value &&
								setModalData &&
								setModalData({
									defectsToSapQueueArray: value,
									length: value.length,
								});
							value &&
								setButtonProps &&
								setButtonProps({disabled: !(value.length > 0)});
						},
					},
				]}
			>
				<FormBody>
					<Text
						itemProps={{
							name: 'length',
							label: 'Выбрано дефектов',
							className: 'mb-0',
						}}
					/>
					<Layout>
						<Table
							itemProps={{
								name: 'defectsToSapQueueArray',
							}}
							fixWidthColumn={true}
							requestLoadConfig={apiGetConfigByName('defects')}
						/>
					</Layout>
				</FormBody>
			</Modal>
		</>
	);
};
