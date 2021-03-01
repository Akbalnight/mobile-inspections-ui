import {ReactComponent as InfoTab} from '../../../imgs/tabPane/defectCardInfo/infoTab.svg';
import {ReactComponent as FilesTab} from '../../../imgs/tabPane/defectCardInfo/filesTab.svg';
import {ReactComponent as EquipmentsTab} from '../../../imgs/tabPane/defectCardInfo/equipmentsTab.svg';
import {ReactComponent as ScheduleTab} from '../../../imgs/tabPane/defectCardInfo/scheduleTab.svg';
import {infoTabFields} from '../Tabs/infoFields';
import {fileManagerFields} from '../Tabs/fileManagerFields';
import {equipmentFields} from '../Tabs/equipmentFields';
import {scheduleFields} from '../Tabs/scheduleFields';

/**
 *
 * Карточка информации дефекта
 */
export const defectCardInfoModal = () => {
	const loadData = (callBack, row) => {
		callBack(row);
	};

	const tabsField = [
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
					children: [fileManagerFields()],
				},
				{
					componentType: 'TabPane',
					tab: <EquipmentsTab />,
					key: 'equipmentTab',
					children: [equipmentFields()],
				},
				{
					componentType: 'TabPane',
					tab: <ScheduleTab />,
					key: 'scheduleTab',
					children: [scheduleFields()],
				},
			],
		},
	];

	return {
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
					body: [...tabsField],
				},
			},
			subscribe: [
				{
					name: 'infoForm',
					path:
						'rtd.defects.defectTable.table.events.onRowDoubleClick',
					onChange: ({value, setModalData, openModal}) => {
						value &&
							setModalData &&
							setModalData({
								...value.value,
							});
						openModal();
					},
				},
			],
		},
	};
};
