import {EditOutlined} from '@ant-design/icons';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../apis/catalog.api';
import {
	// defectDetection,
	DefectDetection,
} from '../../Base/Block/DefectDetection';
import {classic} from 'rt-design';
import {Access} from 'mobile-inspections-base-ui';
import React from 'react';
import {StatusIcon} from '../tableProps';

const {
	Text,
	DatePicker,
	Select,
	Input,
	Title,
	Modal,
	TextArea,
	FormBody,
} = classic;

/**
 *
 * Форма изменение дефекта, все поля и правила по макетам
 */
export const EditDefectCard = ({catalogName}) =>
	OperationOnServer(catalogName, 'edit', {});

export const editDefectCard = (catalogName) =>
	OperationOnServer(catalogName, 'edit', {});

const OperationOnServer = (catalogName, type) => {
	// console.log('catalogName on server:', catalogName)
	const loadData = (callBack, row) => {
		callBack(row);
	};

	const processBeforeSaveForm = (rawValues) => {
		return {...rawValues};
	};

	/** только дефекты 0 уровень */
	const DefectDetectionFields = ({catalogName}) => {
		// console.log('catalogName in fields:', catalogName)
		return (
			<>
				{catalogName === 'defects' ? (
					<>
						<Access roles={['ROLE_ADMIN']}>
							<Select
								itemProps={{
									name: 'statusProcessId',
									label: 'Статус обработки',
								}}
								showSearch={true}
								optionConverter={(option) => ({
									label: (
										<>
											<StatusIcon
												keyToFind={'statusProcessId'}
												statusId={option.id}
											/>
											<span>{option.name}</span>
										</>
									),
									value: option.id,
									className: '',
									disabled: undefined,
								})}
								requestLoadRows={apiGetFlatDataByConfigName(
									'defectStatusesProcess'
								)}
							/>
						</Access>

						<Title level={5}>Выявление дефекта</Title>
					</>
				) : (
					<Text
						itemProps={{
							label: '№ в журнале дефектов',
							name: 'code',
							className: 'mb-8',
						}}
					/>
				)}
				<DefectDetection />
			</>
		);
	};
	/** толко проблемы 2 уровень */
	const DefectSapFields = () => {
		return (
			<>
				{/*<Text itemProps={{*/}
				{/*    label: '№ из SAP',*/}
				{/*    name: 'sapStatusCode',*/}
				{/*    className: 'mb-8',*/}
				{/*}}/>*/}
				<TextArea
					itemProps={{
						label: 'План действий',
						name: 'actionPlan',
						className: 'mb-8',
					}}
				/>
				<Input
					itemProps={{
						label: 'Что происходит',
						name: 'actionDescription',
						className: 'mb-8',
					}}
				/>
				<Select
					itemProps={{
						name: 'sapStatusesId',
						label: 'Статус из SAP',
					}}
					showSearch={true}
					allowClear={true}
					optionConverter={(option) => ({
						label: <span>{option.name}</span>,
						value: option.id,
						className: '',
						disabled: undefined,
					})}
					requestLoadRows={apiGetFlatDataByConfigName('sapStatuses')}
				/>
				<DatePicker
					itemProps={{
						label: 'Дата начала устранения',
						name: 'dateEliminationPlan',
						className: 'mb-8',
					}}
					showTime={true}
				/>
				<DatePicker
					itemProps={{
						label: 'Дата окончания устранения',
						name: 'dateEliminationFact',
						className: 'mb-8',
					}}
					showTime={true}
				/>
			</>
		);
	};
	/** только дефекты 2 план устранения */
	const CorrectionPlanFields = () => {
		return (
			<>
				<Title level={5}>План устранения</Title>

				{/*<Text itemProps={{*/}
				{/*    label: '№ из SAP',*/}
				{/*    name: 'sapMessageCode',*/}
				{/*    className: 'mb-8',*/}
				{/*}}/>*/}
				{/*<Text itemProps={{*/}
				{/*    label: 'Диспетчер',*/}
				{/*    name: 'staffEliminationName',*/}
				{/*    className: 'mb-8',*/}
				{/*}}/>*/}
				<DatePicker
					itemProps={{
						label: 'Плановый срок устранения до',
						name: 'dateEliminationPlan',
						className: 'mb-8',
					}}
					showTime={true}
				/>
			</>
		);
	};
	/** только дефекты 3 уровень
	 * */
	const DefectEliminationFields = () => {
		return (
			<>
				<Title level={5}>Устранение дефекта</Title>
				<DatePicker
					itemProps={{
						label: 'Дата фактического устранения',
						name: 'dateEliminationFact',
						className: 'mb-8',
					}}
					showTime={true}
				/>
				<Select
					itemProps={{
						name: 'staffEliminationId',
						label: 'Ответственный',
					}}
					showSearch={true}
					optionConverter={(option) => ({
						label: <span>{option.username}</span>,
						value: option.id,
						className: '',
						disabled: undefined,
					})}
					requestLoadRows={apiGetFlatDataByConfigName('staff')}
				/>
				<TextArea
					itemProps={{
						label: 'Мероприятия по устранению',
						name: 'note',
						className: 'mb-8',
					}}
				/>
			</>
		);
	};

	return (
		<Modal
			title={'Редактровать дефект'}
			buttonProps={{
				type: 'default',
				icon: <EditOutlined />,
				disabled: true,
			}}
			modalConfig={{
				type: `${type}OnServer`,
				title: 'Редактрование дефекта',
				width: catalogName === 'defects' ? 600 : 500,
				bodyStyle: {height: catalogName === 'defects' ? 760 : 640},
				requestSaveRow: apiSaveByConfigName(
					catalogName === 'defects'
						? 'saveEditModalDefect'
						: 'saveEditModalPanelProblem'
				),
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
					methodSaveForm: 'PUT',
					processBeforeSaveForm: processBeforeSaveForm,
					// onFinish: (values) => {
					//     console.log('edit defect values', values);
					// },
					labelCol: {span: 10},
					wrapperCol: {span: 12},
				},
			}}
			dispatch={{
				path: 'defects.defectTable.modal.events.onEditModal',
				type: 'event',
			}}
			subscribe={[
				{
					name: 'editForm',
					path: 'rtd.defects.defectTable.table.selected',
					extraData: 'auth.roles',
					onChange: ({
						value,
						extraData,
						setModalData,
						setButtonProps,
					}) => {
						// console.log('extraData defectModal', extraData);
						value &&
							setModalData &&
							setModalData({
								...value[value.length - 1],
								userRoles: extraData,
							});
						value &&
							setButtonProps &&
							setButtonProps({disabled: !(value.length === 1)});
					},
				},
			]}
		>
			<FormBody>
				<DefectDetectionFields catalogName={catalogName} />
				{catalogName === 'defects' ? (
					<CorrectionPlanFields />
				) : (
					<DefectSapFields />
				)}
				{catalogName === 'defects' ? <DefectEliminationFields /> : null}
			</FormBody>
		</Modal>
	);
};
