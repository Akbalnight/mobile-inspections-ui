import {Button, Space} from 'rt-design';
import {EditOutlined} from '@ant-design/icons';

export const TemplatesTableHeader = () => {
	return (
		<Space className={'p-8'}>
			<Button type={'primary'} icon={<EditOutlined />} />
		</Space>
	);
};
