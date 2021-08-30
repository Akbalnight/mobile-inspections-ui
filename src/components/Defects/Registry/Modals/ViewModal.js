import React from 'react';

import {ReactComponent as InfoTab} from '../../../../imgs/tabPane/defectCardInfo/infoTab.svg';
import {ReactComponent as FilesTab} from '../../../../imgs/tabPane/defectCardInfo/filesTab.svg';
import {ReactComponent as EquipmentsTab} from '../../../../imgs/tabPane/defectCardInfo/equipmentsTab.svg';
import './defectCardInfo.less';

import {InfoTabFields} from './Tabs/infoFields';
import {FilesTabFields} from './Tabs/fileManagerFields';
import {EquipmentTabFields} from './Tabs/equipmentFields';
import {HistoryTab, HistoryTabFields} from './Tabs/historyFields';
import {FormBody, Tabs, TabPane, Modal} from 'rt-design';
import {selectRowsById} from '../../../Base/Functions/TableSelectById';
import {codeNormalizer, emptyToNd} from '../../../Base/Functions/TextUtils';
import {paths} from '../../../../constants/paths';
import {useHistory} from 'react-router';

/**
 * Карточка информации дефекта
 */

export const DefectCardInfoModal = () => {
	const history = useHistory();
	let sRow;
	let historyChange =
		history.location.pathname === paths.CONTROL_DEFECTS_DEFECTS.path;
	const currentMode = historyChange ? 'defects' : 'panelProblems';
	const loadData = async (callBack, row) => {
		sRow = row;
		const defectHistoryResponse = await selectRowsById(
			'defectHistory',
			'id',
			row.id
		)({});

		if (defectHistoryResponse.status === 200)
			sRow = {...sRow, defectHistory: defectHistoryResponse.data};

		sRow = {
			...emptyToNd(sRow),
			equipment: emptyToNd(row.equipment),
			code: codeNormalizer(row.code),
			defectUploadFilesHolder: {
				// попросить объяснения, зечем такая вложенность?
				dataObject: {
					defectUploadFiles: {
						defectId: row.id,
					},
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
				type: 'view',
				title: `Карточка дефекта`,
				width: 800,
				bodyStyle: {height: 750},
				form: {
					name: 'defectDataView',
					noPadding: true,
					labelCol: {span: 8},
					wrapperCol: {span: 16},
					loadInitData: loadData,
				},
			}}
			subscribe={[
				{
					name: 'infoForm',
					path: `rtd.${currentMode}.table.events.onRowDoubleClick`,
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
			dispatch={{
				/**НАЧАТЬ ТУТ*/
				path: `${currentMode}.table.events.viewObject`,
				type: 'event',
			}}
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
					<TabPane key={'historyTab'} tab={<HistoryTab />}>
						<HistoryTabFields />
					</TabPane>
				</Tabs>
			</FormBody>
		</Modal>
	);
};
