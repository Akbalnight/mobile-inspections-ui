import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

/**
 * нужно будет переделать и получать данные по определенному дефекту
 * связть public.files и  public.defects
 */
export const fileManagerFields = () => {
	return {
		componentType: 'Layout',
		className: 'ml-16',
		children: [
			{
				componentType: 'Item',
				name: 'name',
				child: {
					componentType: 'Title',
					level: 5,
				},
			},
			{
				componentType: 'Item',
				className: 'p-8',
				child: {
					componentType: 'FileManager',
					requestLoadConfig: apiGetConfigByName(
						'routeControlPoints' // для макета, нужно поменять
					),
					requestLoadRows: apiGetFlatDataByConfigName(
						'routeControlPoints' // для макета, нужно поменять
					),
				},
			},
		],
	};
};
