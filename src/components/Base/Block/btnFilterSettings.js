import {FilterOutlined, SettingOutlined} from '@ant-design/icons';
import {classic} from 'rt-design';

const {Button} = classic;

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
export const ButtonFilterSettings = () => (
	<>
		<Button icon={<FilterOutlined />} disabled={true} type={'text'} />
		<Button icon={<SettingOutlined />} disabled={true} type={'text'} />
	</>
);
