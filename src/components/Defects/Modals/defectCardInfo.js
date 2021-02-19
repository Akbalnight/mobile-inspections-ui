import {ReactComponent as InfoTab} from '../../../imgs/tabPane/defectCardInfo/infoTab.svg';
import {ReactComponent as FilesTab} from '../../../imgs/tabPane/defectCardInfo/filesTab.svg';
import {ReactComponent as EquipmentsTab} from '../../../imgs/tabPane/defectCardInfo/equipmentsTab.svg';
import {ReactComponent as ScheduleTab} from '../../../imgs/tabPane/defectCardInfo/scheduleTab.svg';
import {infoTabFields} from '../Tabs/infoTab';
import {fileManagerFields} from '../Tabs/fileManagerTab';

/**
 *
 * Карточка информации дефекта
 */
export const defectCardInfoModal = () => {
	console.log(1);
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
					children: [...infoTabFields],
				},
				{
					componentType: 'TabPane',
					tab: <FilesTab />,
					key: 'filesTab',
					children: [...fileManagerFields],
				},
				{
					componentType: 'TabPane',
					tab: <EquipmentsTab />,
					key: 'equipmentsTab',
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Оборудование',
							},
						},
					],
				},
				{
					componentType: 'TabPane',
					tab: <ScheduleTab />,
					key: 'scheduleTab',
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Обход',
							},
						},
					],
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
		},
	};
};
