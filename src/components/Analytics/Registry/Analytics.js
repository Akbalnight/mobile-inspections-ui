import {Button, Form, FormBody, Space, Table} from 'rt-design';
import {
	apiGetConfigByName,
	apiGetHierarchicalDataByConfigName,
} from '../../../apis/catalog.api';
import React, {useState} from 'react';
import {Drawer} from 'antd';

export const Analytics = (props) => {
	const {mainWay, catalogName} = props;
	const [visible, setVisible] = useState(false);
	console.log(mainWay, catalogName);
	return (
		<Form>
			<FormBody noPadding={true} name={'analyticRegistrySide'}>
				<Space>
					{' '}
					<Button onClick={() => setVisible((state) => !state)}>
						911
					</Button>
				</Space>
				<Table
					requestLoadRows={apiGetHierarchicalDataByConfigName(
						'techMaps'
					)}
					requestLoadConfig={apiGetConfigByName('techMaps')}
				/>
				<Drawer visible={visible}>
					<Button>911</Button>
				</Drawer>
			</FormBody>
		</Form>
	);
};
