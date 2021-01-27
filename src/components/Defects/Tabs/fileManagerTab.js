import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';

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
