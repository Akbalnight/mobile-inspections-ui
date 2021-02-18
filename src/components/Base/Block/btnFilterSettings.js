import {FilterOutlined, SettingOutlined} from '@ant-design/icons';

export const btnFilterSettings = [
	{
		componentType: 'Item',
		child: {
			componentType: 'Button',
			icon: <FilterOutlined />,
			type: 'text',
			disabled: true,
		},
	},
	{
		componentType: 'Item',
		child: {
			componentType: 'Button',
			icon: <SettingOutlined />,
			type: 'text',
			disabled: true,
		},
	},
];
