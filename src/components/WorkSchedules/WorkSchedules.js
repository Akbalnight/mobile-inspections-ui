import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {components} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../apis/catalog.api';
import {ReactComponent as WorkSchedulesPane} from '../../imgs/tabPane/workSchedules/workSchedules.svg';
import {ReactComponent as WorkShiftPane} from '../../imgs/tabPane/workSchedules/workShift.svg';
import {ReactComponent as WorkTemplatesPane} from '../../imgs/tabPane/workSchedules/workSchedulesTemplates.svg';
import {useHistory} from 'react-router';
import {addTemplateModal, editTemplateModal} from './Modals/modalTemplatesTab';
import {workSchedulesFields} from './Tabs/workSchedules';
import {workShiftsFields} from './Tabs/workShifts';

const {Form} = components;
export default function WorkSchedules() {
	const history = useHistory();

	const workSchedulesTemplatesFields = [
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					child: {
						componentType: 'ServerTable',
						dispatchPath: 'workSchedules.workShiftTable.table',
						// selectable: true,
						history,
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								edit: {actionType: ['modal', 'modal']},
								delete: {},
							},
						},
						requestLoadRows: apiGetFlatDataByConfigName(
							'defects' //'workSchedules'
						),
						requestLoadConfig: apiGetConfigByName(
							'defects' //'workSchedules'
						),
						modals: [addTemplateModal(), editTemplateModal()],
					},
				},
			],
		},
	];
	const mainPageConfig = [
		{
			componentType: 'Tabs',
			type: 'card',
			size: 'medium',
			className: 'mt-8 ml-4',
			children: [
				{
					componentType: 'TabPane',
					tab: <WorkSchedulesPane />,
					key: 'workSchedules',
					className: 'workSchedules',
					children: [...workSchedulesFields],
				},
				{
					componentType: 'TabPane',
					tab: <WorkShiftPane />,
					key: 'workShifts',
					className: 'workShifts',
					children: [...workShiftsFields()],
				},
				{
					componentType: 'TabPane',
					tab: <WorkTemplatesPane />,
					key: 'workSchedulesTemplates',
					className: 'workSchedulesTemplates',
					children: [...workSchedulesTemplatesFields],
				},
			],
		},
	];

	const formConfig = {
		noPadding: true,
		name: 'workSchedulesMain',
		body: [...mainPageConfig],
	};
	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
