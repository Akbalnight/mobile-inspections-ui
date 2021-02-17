import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {components} from 'rt-design';
import {ReactComponent as WorkSchedulesPane} from '../../imgs/tabPane/workSchedules/workSchedules.svg';
import {ReactComponent as WorkShiftPane} from '../../imgs/tabPane/workSchedules/workShift.svg';
import {ReactComponent as WorkTemplatesPane} from '../../imgs/tabPane/workSchedules/workSchedulesTemplates.svg';
import {workSchedulesFields} from './Tabs/workSchedules';
import {workShiftsFields} from './Tabs/workShifts';
import {workTemplatesFields} from './Tabs/workTemplates';

const {Form} = components;
export default function WorkSchedules() {
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
					children: [...workSchedulesFields()],
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
					children: [...workTemplatesFields()],
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
