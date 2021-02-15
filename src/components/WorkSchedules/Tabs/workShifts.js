import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
// import { addShiftModal, editShiftModal } from "../Modals/modalShiftTab";

export const workShiftsFields = [
	{
		componentType: 'Layout',
		children: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Table',
					dispatch: {path: 'workSchedules.workShiftTab.table'},
					requestLoadRows: apiGetFlatDataByConfigName(
						'routes' //'workSchedules'
					),
					requestLoadConfig: apiGetConfigByName(
						'routes' //'workSchedules'
					),
					subscribe: {},
				},
			},
		],
	},
];
