import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {Form} from 'rt-design';
import {ReactComponent as WorkSchedulesPane} from '../../imgs/tabPane/workSchedules/workSchedules.svg';
import {ReactComponent as WorkShiftPane} from '../../imgs/tabPane/workSchedules/workShift.svg';
import {ReactComponent as WorkTemplatesPane} from '../../imgs/tabPane/workSchedules/workSchedulesTemplates.svg';

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
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Title',
								level: 5,
							},
						},
					],
				},
				{
					componentType: 'TabPane',
					tab: <WorkShiftPane />,
					key: 'workShifts',
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Title',
								level: 5,
							},
						},
					],
				},
				{
					componentType: 'TabPane',
					tab: <WorkTemplatesPane />,
					key: 'workSchedulesTemplates',
					children: [
						{
							componentType: 'Item',
							child: {
								componentType: 'Title',
								label: 'Title',
								level: 5,
							},
						},
					],
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
