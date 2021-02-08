import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

/**
 * нужно будет переделать и получать данные по определенному дефекту
 * связть public.files и  public.defects
 */
export const fileManagerFields = [
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
