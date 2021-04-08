import {ReactComponent as InfoTab} from '../../../imgs/tabPane/defectCardInfo/infoTab.svg';
import {ReactComponent as FilesTab} from '../../../imgs/tabPane/defectCardInfo/filesTab.svg';
import {ReactComponent as EquipmentsTab} from '../../../imgs/tabPane/defectCardInfo/equipmentsTab.svg';
// import {ReactComponent as ScheduleTab} from '../../../imgs/tabPane/defectCardInfo/scheduleTab.svg';
import {ReactComponent as HistoryTab} from '../../../imgs/tabPane/defectCardInfo/historyTab.svg';
import {
	InfoTabFields,
	// infoTabFields
} from '../Tabs/infoFields';
import {
	// fileManagerFields,
	FilesFields,
} from '../Tabs/fileManagerFields';
import {
	EquipmentFields,
	// equipmentFields
} from '../Tabs/equipmentFields';
// import {scheduleFields} from '../Tabs/scheduleFields';
import {
	HistoryFields,
	// historyFields
} from '../Tabs/historyFields';
import {classic} from 'rt-design';
import React from 'react';
// import {apiGetConfigByName, apiGetFlatDataByConfigName} from "../../../apis/catalog.api";
import {selectRowsById} from '../../Base/Functions/TableSelectById';

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

	const loadData = async (callBack, row) => {
		sRow = row;
		defectId = row.id;
		const defectHistoryResponse = await selectRowsById(
			'defectHistory',
			'id',
			row.id
		)({});
		if (defectHistoryResponse.status === 200)
			sRow = {...sRow, defectHistory: defectHistoryResponse.data};
		const defectFilesResponse = await selectRowsById(
			'defectFiles',
			'defectId',
			row.id
		)({});
		if (defectFilesResponse.status === 200)
			sRow = {...sRow, defectFiles: defectFilesResponse.data};
		// console.log('sRow', sRow)
		callBack({...sRow});
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
				bodyStyle: {height: 750},
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
							setModalData({
								...value.value,
							});
						}
						value && openModal();
					},
				},
			]}
			// dispatch:'defects.defectsTable.modalViewObject.event'
		>
			<FormBody noPadding={true}>
				<Tabs type={'card'} className={'ml-8 mr-8'}>
					<TabPane key={'infoTab'} tab={<InfoTab />}>
						<InfoTabFields />
					</TabPane>
					<TabPane key={'fileTab'} tab={<FilesTab />}>
						<FilesFields />
					</TabPane>
					<TabPane key={'equipmentTab'} tab={<EquipmentsTab />}>
						<EquipmentFields />
					</TabPane>
					{/*<TabPane*/}
					{/*    key={'scheduleTab'}*/}
					{/*    tab={<ScheduleTab/>}*/}
					{/*>*/}
					{/*</TabPane>*/}
					<TabPane key={'historyTab'} tab={<HistoryTab />}>
						<HistoryFields />
					</TabPane>
				</Tabs>
			</FormBody>
		</Modal>
	);
};
