import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {ReactComponent as InfoTab} from '../../../imgs/tabPane/defectCardInfo/infoTab.svg';
import {ReactComponent as FilesTab} from '../../../imgs/tabPane/defectCardInfo/filesTab.svg';
import {ReactComponent as EquipmentsTab} from '../../../imgs/tabPane/defectCardInfo/equipmentsTab.svg';
import {ReactComponent as ScheduleTab} from '../../../imgs/tabPane/defectCardInfo/scheduleTab.svg';

export const defectCardInfoModal = (history) => {
	// let Row;
	const loadData = (callBack, row) => {
		// Row = row;
		callBack(row);
	};

	const infoTabFields = [
		{
			componentType: 'Layout',
			style: {padding: '24px'},
			children: [
				//стандартный вариант
				{
					componentType: 'Col',
					children: [
						{
							componentType: 'Item',
							label: '№ в Журнале Дефектов',
							name: 'code',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Статус',
							name: 'statusProcessName',
							className: 'mb-0',
							child: {
								componentType: 'Text',
							},
						},
					],
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'Выявление дефекта',
						level: 5,
					},
				},

				{
					componentType: 'Col',
					children: [
						{
							componentType: 'Item',
							label: 'Дата обнаружения',
							name: 'dateDetectDefect',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Оборудование',
							name: 'equipmentName',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Описание',
							name: 'description',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Обнаружил',
							name: 'staffDetectName',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'Title',
						label: 'План устранения',
						level: 5,
					},
				},
				{
					componentType: 'Col',
					children: [
						{
							componentType: 'Item',
							label: 'Плановый срок устранения',
							name: 'dateEliminationPlan',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Диспетчер',
							name: 'staffEliminationId', // с наймингов нужно определиться
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'Отклонение от КПЭ',
							name: 'kpi',
							className: 'mb-0',
							valuePropName: 'checked',
							rules: [
								{
									type: 'boolean',
								},
							],
							child: {
								componentType: 'Checkbox',
								disabled: true,
							},
						},

						{
							componentType: 'Item',
							label: 'Причина возникновения',
							name: 'descriptionCauses',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
						{
							componentType: 'Item',
							label: 'План действий',
							name: 'actionPlan',
							className: 'mb-0',
							child: {componentType: 'Text'},
						},
					],
				},
			],
		},
	];

	const fileManagerFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'note',
					child: {
						componentType: 'Title',
						level: 5,
					},
				},
				{
					componentType: 'Item',
					child: {
						componentType: 'FileManager',
						rowKey: 'id',
						isGroupKey: 'isGroup',
						expandParentKey: 'parentId',
						requestLoadRows: apiGetFlatDataByConfigName('defects'),
						requestLoadConfig: apiGetConfigByName('defects'),
					},
				},
			],
		},
	];

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
	};
};
