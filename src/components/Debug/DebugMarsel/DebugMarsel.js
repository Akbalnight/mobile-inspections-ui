// /*eslint no-use-before-define: "off"*/
import {BasePage} from 'mobile-inspections-base-ui';
import React from 'react';
import {Form} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import {techMapsSelectModal} from './modalAddTechMaps';

export default function DebugMarsel() {
	const techMaps = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Технологические карты',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'techMaps',
					child: {
						componentType: 'LocalTable',
						commandPanelProps: {
							systemBtnProps: {
								add: {actionType: 'modal'},
								delete: {actionType: 'modal'},
							},
						},
						modals: [techMapsSelectModal()],
						requestLoadRows: apiGetHierarchicalDataByConfigName(
							'techMaps'
						),
						requestLoadConfig: apiGetConfigByName('techMaps'),
					},
				},
			],
		},
	];

	const formConfig = {
		noPadding: false,
		name: 'exampleWithModalForm',
		body: [...techMaps],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
}
