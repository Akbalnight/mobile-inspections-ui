import React from 'react';
import {ReactComponent as SendToSap} from '../../../../imgs/defects/send-to-sap-btn.svg';
import {
	apiSaveByConfigName,
	apiGetConfigByName,
} from '../../../../apis/application.api';
import {FormBody, Layout, Text, Table, Modal} from 'rt-design';
import {customColumnProps} from '../../tableProps';

export const ButtonSendToSap = () => {
	const processBeforeSaveForm = (rawValues) => {
		const defectsToSapQueueArray =
			rawValues &&
			rawValues.defectsToSapQueueArray.map((row) => {
				return {
					...row,
					sendedToSap: true,
					viewOnPanel: true,
					statusProcessId: '1864073a-bf8d-4df2-b02d-8e5afa63c4d0',
				};
			});
		return {defectsToSapQueueArray};
	};
	return (
		<>
			<Modal
				toolTipProps={{
					title: 'Передать в SAP',
				}}
				buttonProps={{
					type: 'default',
					icon: <SendToSap />,
					disabled: true,
				}}
				modalConfig={{
					type: 'save',
					title: `Передать в SAP`,
					width: 650,
					bodyStyle: {height: 450},
					okText: 'Передать',
					methodSaveForm: 'POST',
					requestSaveForm: apiSaveByConfigName(`sapViewOnPanelSave`),
					form: {
						name: 'defectsToSapQueueModal',
						noPadding: false,
						labelCol: {span: 12},
						wrapperCol: {span: 6},
						loadInitData: (callBack, row) => {
							callBack(row);
						},
						processBeforeSaveForm: processBeforeSaveForm,
					},
				}}
				dispatch={{
					path: 'defects.table.events.onSendToSap',
					// диспатчим туда же, где фильтр таблицы, т.к. перезагрузка таблицы одинаковая
					// path: 'rtd.defects.defectTable.events.onApplyFilter',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'sendToSap',
						path: 'rtd.defects.table.selected',
						onChange: ({value, setModalData, setButtonProps}) => {
							value &&
								setModalData &&
								setModalData({
									defectsToSapQueueArray: value,
									length: value.length,
								});
							value &&
								setButtonProps &&
								setButtonProps({disabled: !(value.length > 0)});
						},
					},
				]}
			>
				<FormBody>
					<Text
						itemProps={{
							name: 'length',
							label: 'Выбрано дефектов',
							className: 'mb-0',
						}}
					/>
					<Layout>
						<Table
							itemProps={{
								name: 'defectsToSapQueueArray',
							}}
							customColumnProps={customColumnProps}
							fixWidthColumn={true}
							requestLoadConfig={apiGetConfigByName('defects')}
						/>
					</Layout>
				</FormBody>
			</Modal>
		</>
	);
};
