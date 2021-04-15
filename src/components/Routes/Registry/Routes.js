import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {customColumnProps} from '../tableProps';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import React from 'react';
import {RouteViewModal} from './Modals/ViewModal';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {paths} from '../../../constants/paths';
import {useHistory} from 'react-router';

const {Form, FormBody, Table, Button, Space} = classic;
export const Routes = () => {
	let sValueId = null;
	const history = useHistory();
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true} scrollable={true}>
					<Space
						className={'p-8'}
						style={{justifyContent: 'space-between'}}
					>
						<Space>
							<Button
								icon={<PlusOutlined />}
								onClick={() => {
									history.push(
										paths
											.DETOURS_CONFIGURATOR_ROUTES_DATA_NEW
											.path
									);
								}}
							/>
							<Button
								icon={<EditOutlined />}
								disabled={true}
								subscribe={[
									{
										name: 'editRouteForm',
										path:
											'rtd.routes.mainForm.table.selected',
										onChange: ({
											value,
											setSubscribeProps,
										}) => {
											if (value) {
												sValueId = value.id;
												setSubscribeProps({
													disabled: !value,
												});
											} else {
												sValueId = null;
											}
										},
									},
								]}
								onClick={() =>
									history.push(
										paths.DETOURS_CONFIGURATOR_ROUTES.path +
											'/' +
											sValueId
									)
								}
							/>
							<RouteViewModal />
						</Space>
						<Space>
							<Button>1</Button>
						</Space>
					</Space>
					<Table
						infinityMode={true}
						customColumnProps={customColumnProps}
						requestLoadRows={apiGetFlatDataByConfigName('routes')}
						requestLoadConfig={apiGetConfigByName('routes')}
						dispatchPath={'routes.mainForm.table'}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};
