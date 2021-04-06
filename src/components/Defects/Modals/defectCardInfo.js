import {ReactComponent as InfoTab} from '../../../imgs/tabPane/defectCardInfo/infoTab.svg';
import {ReactComponent as FilesTab} from '../../../imgs/tabPane/defectCardInfo/filesTab.svg';
import {ReactComponent as EquipmentsTab} from '../../../imgs/tabPane/defectCardInfo/equipmentsTab.svg';
import {ReactComponent as ScheduleTab} from '../../../imgs/tabPane/defectCardInfo/scheduleTab.svg';
import {ReactComponent as HistoryTab} from '../../../imgs/tabPane/defectCardInfo/historyTab.svg';
import {infoTabFields} from '../Tabs/infoFields';
import {fileManagerFields} from '../Tabs/fileManagerFields';
import {equipmentFields} from '../Tabs/equipmentFields';
import {scheduleFields} from '../Tabs/scheduleFields';
import {historyFields} from '../Tabs/historyFields';
import {classic} from 'rt-design';
import React from 'react';

const {
	Layout,
	Form,
	Space,
	FormHeader,
	FormBody,
	FormFooter,
	Divider,
	Table,
	Button,
	Title,
	Search,
	Modal,
} = classic;
/**
 *
 * Карточка информации дефекта
 */
export const DefectCardInfoModal = () => {
	let sRow;
	let defectId = null;
	const loadData = (callBack, row) => {
		sRow = row;
		// defectId = row.id
		callBack(row);
	};
	// console.log(sRow)

	const tabsField = (transferId) => [
		{
			componentType: 'Tabs',
			type: 'card',
			size: 'large',
			style: {paddingTop: '24px'},
			children: [
				{
					componentType: 'TabPane',
					tab: <InfoTab />,
					key: 'infoTab',
					children: [infoTabFields()],
				},
				{
					componentType: 'TabPane',
					tab: <FilesTab />,
					key: 'fileTab',
					children: [fileManagerFields(transferId)],
				},
				{
					componentType: 'TabPane',
					tab: <EquipmentsTab />,
					key: 'equipmentTab',
					children: [equipmentFields(transferId)],
				},
				{
					componentType: 'TabPane',
					tab: <ScheduleTab />,
					key: 'scheduleTab',
					children: [scheduleFields(transferId)],
				},
				{
					componentType: 'TabPane',
					tab: <HistoryTab />,
					key: 'historyTab',
					children: [historyFields(transferId)],
				},
			],
		},
	];

	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Карточка дефекта`,
				width: 800,
				bodyStyle: {height: 650},
				form: {
					name: 'defectDataView',
					noPadding: true,
					labelCol: {span: 8},
					wrapperCol: {span: 16},
					loadInitData: loadData,
					// body: tabsField(defectId),
				},
			}}
			subscribe={[
				{
					name: 'infoForm',
					path:
						'rtd.defects.defectTable.table.events.onRowDoubleClick',
					onChange: ({value, setModalData, openModal}) => {
						if (value && setModalData) {
							defectId = value.value.id;
							setModalData({
								...value.value,
							});
						}
						openModal();
					},
				},
			]}
			// dispatch:'defects.defectsTable.modalViewObject.event'
		>
			{/*{tabsField(defectId)}*/}
		</Modal>
	);

	const dummy = {
		componentType: 'Item',
		child: {
			componentType: 'Modal',
			modalConfig: {
				type: 'viewObject',
				title: `Карточка дефекта`,
				width: 800,
				bodyStyle: {height: 650},
				form: {
					name: 'defectDataView',
					noPadding: true,
					labelCol: {span: 8},
					wrapperCol: {span: 16},
					loadInitData: loadData,
					body: tabsField(defectId),
				},
				// dispatch:'defects.defectsTable.modalViewObject.event'
			},
			subscribe: [
				{
					name: 'infoForm',
					path:
						'rtd.defects.defectTable.table.events.onRowDoubleClick',
					onChange: ({value, setModalData, openModal}) => {
						if (value && setModalData) {
							defectId = value.value.id;
							setModalData({
								...value.value,
							});
						}
						openModal();
					},
				},
			],
		},
	};
};
