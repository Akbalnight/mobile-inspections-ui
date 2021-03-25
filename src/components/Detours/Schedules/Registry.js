import React from 'react';
import {
	apiGetConfigByName,
	apiGetFlatDataByConfigName,
} from '../../../apis/catalog.api';
import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import EditModal from './Modals/EditModal';
const {Form, Table, FormBody, Space} = classic;

const Registry = () => {
	return (
		<BasePage>
			<Form>
				<FormBody noPadding={true} scrollable={false}>
					<Space className={'m-8'}>
						<EditModal />
					</Space>
					<Table
						requestLoadRows={apiGetFlatDataByConfigName(
							'repeaters'
						)}
						requestLoadConfig={apiGetConfigByName('repeaters')}
						headerHeight={70}
						dispatchPath={'detours.schedules.registry'}
						subscribe={[
							{
								name: 'onEditModal',
								path:
									'rtd.detours.schedules.registry.events.onEditModal',
								onChange: ({reloadTable}) => reloadTable({}),
							},
						]}
					/>
				</FormBody>
			</Form>
		</BasePage>
	);
};

export default Registry;
