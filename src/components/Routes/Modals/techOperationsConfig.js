import {customColumnProps} from '../../TechMapsForm/TechMapColumnProps';
import {apiGetConfigByName} from '../../../apis/catalog.api';

export const techOperations = (loadControlPointsTechOperations) => [
	{
		componentType: 'Item',
		child: {
			componentType: 'Title',
			label: 'Технологические операции',
			level: 5,
		},
	},
	{
		componentType: 'Layout',
		children: [
			{
				componentType: 'Item',
				name: 'techOperations',
				child: {
					componentType: 'ServerTable',
					customColumnProps: customColumnProps,
					// defaultFilter: (type === 'add' ? {techMapId: null} : { techMapId: Row.techMapId } ),
					dispatchPath: 'routes.controlPointModal.techOperations',
					subscribe: {
						name: 'controlPointTechMap',
						path: 'rtd.routes.controlPointModal.techMap.selected',
						onChange: ({value, setReloadTable}) =>
							value &&
							setReloadTable &&
							setReloadTable({
								filter: {techMapId: value.id},
							}),
					},
					footerProps: {
						rightCustomSideElement: [
							{
								componentType: 'Item',
								name: 'duration',
								child: {
									componentType: 'Text',
									// label: 'Summary',
									subscribe: {
										name:
											'controlPointTechMapTechOperation',
										path:
											'rtd.routes.controlPointModal.techOperations.rows',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
											const totalDuration = value.reduce(
												(total, item) =>
													total + item.duration,
												0
											);
											setSubscribeProps({
												label: `Продолжительность всех операций: ${totalDuration}`,
												value: totalDuration,
											});
										},
									},
								},
							},
						],
					},
					requestLoadRows: loadControlPointsTechOperations, //apiGetFlatDataByConfigName('techOperationsSmall'),
					requestLoadConfig: apiGetConfigByName(
						'techOperationsSmall'
					),
					onChange: (value) => {
						console.log(value);
					},
				},
			},
		],
	},
];
