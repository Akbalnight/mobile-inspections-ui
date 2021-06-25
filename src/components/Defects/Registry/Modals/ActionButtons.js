import React from 'react';
import {ReactComponent as SendToSap} from '../../../../imgs/defects/send-to-sap-btn.svg';
import {
	apiSaveByConfigName,
	apiGetConfigByName,
} from '../../../../apis/catalog.api';
import {FormBody, Layout, Text, Table, Modal} from 'rt-design';

export const ButtonSendToSap = () => {
	const processBeforeSaveForm = (rawValues) => {
		const defectsToSapQueueArray =
			rawValues &&
			rawValues.defectsToSapQueueArray.map((row) => {
				return {...row, sendedToSap: true, viewOnPanel: true};
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
					type: 'editOnServer',
					title: `Передать в SAP`,
					width: 650,
					bodyStyle: {height: 450},
					okText: 'Передать',
					requestSaveRow: apiSaveByConfigName(`sapViewOnPanelSave`),
					form: {
						name: 'defectsToSapQueueModal',
						noPadding: false,
						methodSaveForm: 'POST',
						labelCol: {span: 12},
						wrapperCol: {span: 6},
						loadInitData: (callBack, row) => {
							callBack(row);
						},
						processBeforeSaveForm: processBeforeSaveForm,
					},
				}}
				dispatch={{
					path: 'defects.defectTable.modal.events.onSendToSapModal',
					// диспатчим туда же, где фильтр таблицы, т.к. перезагрузка таблицы одинаковая
					// path: 'rtd.defects.defectTable.events.onApplyFilter',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'sendToSap',
						path: 'rtd.defects.defectTable.table.selected',
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
							fixWidthColumn={true}
							requestLoadConfig={apiGetConfigByName('defects')}
						/>
					</Layout>
				</FormBody>
			</Modal>
		</>
	);
};
