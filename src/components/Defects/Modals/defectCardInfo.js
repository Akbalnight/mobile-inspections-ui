import React from 'react';

import {ReactComponent as InfoTab} from '../../../imgs/tabPane/defectCardInfo/infoTab.svg';
import {ReactComponent as FilesTab} from '../../../imgs/tabPane/defectCardInfo/filesTab.svg';
import {ReactComponent as EquipmentsTab} from '../../../imgs/tabPane/defectCardInfo/equipmentsTab.svg';
import {HistoryOutlined} from '@ant-design/icons';
import './defectCardInfo.less';

import {InfoTabFields} from '../Tabs/infoFields';
import {FilesTabFields} from '../Tabs/fileManagerFields';
import {EquipmentTabFields} from '../Tabs/equipmentFields';
import {HistoryTabFields} from '../Tabs/historyFields';
import {classic} from 'rt-design';
import {selectRowsById} from '../../Base/Functions/TableSelectById';
import {codeNormalizer, emptyToNd} from '../../Base/Functions/TextUtils';

const HistoryTab = () => {
	return (
		<span role='img' aria-label='project' className='anticon pane'>
			<HistoryOutlined />
			<p>История изменений</p>
		</span>
	);
};
const {FormBody, Tabs, TabPane, Modal} = classic;

/**
 * Карточка информации дефекта
 */

export const DefectCardInfoModal = () => {
	let sRow;

	const loadData = async (callBack, row) => {
		sRow = row;
		const defectHistoryResponse = await selectRowsById(
			'defectHistory',
			'id',
			row.id
		)({});

		if (defectHistoryResponse.status === 200)
			sRow = {...sRow, defectHistory: defectHistoryResponse.data};

		/** код получения файлов дефекта переехал в FilesTabFields и работает с подпиской */
		// const defectFilesResponse = await selectRowsById(
		//     'defectFiles',
		//     'defectId',
		//     row.id
		// )({});
		// if (defectFilesResponse.status === 200)
		//     sRow = {...sRow, defectFiles: defectFilesResponse.data};

		sRow = {
			...emptyToNd(sRow),
			equipment: emptyToNd(row.equipment),
			code: codeNormalizer(row.code),
			defectUploadFilesHolder: {
				// попросить объяснения, зечем такая вложенность?
				defectUploadFiles: {
					defectId: row.id,
				},
			},
		};

		callBack({...sRow});
	};

	// пришлось пробрасывать sRow
	const FilesTabFieldsRow = () => <FilesTabFields sRow={sRow} />;

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
		>
			<FormBody noPadding={true}>
				<Tabs type={'card'} className={'p-8'}>
					<TabPane key={'infoTab'} tab={<InfoTab />}>
						<InfoTabFields />
					</TabPane>
					<TabPane key={'fileTab'} tab={<FilesTab />}>
						<FilesTabFieldsRow />
					</TabPane>
					<TabPane key={'equipmentTab'} tab={<EquipmentsTab />}>
						<EquipmentTabFields />
					</TabPane>
					{/*<TabPane*/}
					{/*    key={'scheduleTab'}*/}
					{/*    tab={<ScheduleTab/>}*/}
					{/*>*/}
					{/*</TabPane>*/}
					<TabPane key={'historyTab'} tab={<HistoryTab />}>
						<HistoryTabFields />
					</TabPane>
				</Tabs>
			</FormBody>
		</Modal>
	);
};
