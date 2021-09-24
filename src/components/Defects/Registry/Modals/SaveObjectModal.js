import {EditOutlined} from '@ant-design/icons';
import {
	apiGetFlatDataByConfigName,
	apiSaveByConfigName,
} from '../../../../apis/application.api';
import {DefectDetection} from '../../../Base/Block/DefectDetection';
import {
	Text,
	DatePicker,
	Select,
	Input,
	Title,
	Modal,
	TextArea,
	FormBody,
} from 'rt-design';
import {Access} from 'mobile-inspections-base-ui';
import React from 'react';
import {GetCurrentMode, StatusIcon} from '../../tableProps';

/**
 *
 * Форма изменение дефекта, все поля и правила по макетам
 */
export const EditDefectCard = ({catalogName}) =>
	OperationOnServer(catalogName, 'edit', {});

const OperationOnServer = (catalogName, type) => {
	const currentMode = GetCurrentMode();
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
					format={'DD.MM.YYYY HH:mm'}
				/>
				<DatePicker
					itemProps={{
						label: 'Дата окончания устранения',
						name: 'dateEliminationFact',
						className: 'mb-8',
					}}
					showTime={true}
					format={'DD.MM.YYYY HH:mm'}
				/>
			</>
		);
	};
	/** только дефекты 2 план устранения */
	const CorrectionPlanFields = () => {
		return (
			<>
				<Title level={5}>План устранения</Title>
				<DatePicker
					itemProps={{
						label: 'Плановый срок устранения до',
						name: 'dateEliminationPlan',
						className: 'mb-8',
					}}
					showTime={true}
					format={'DD.MM.YYYY HH:mm'}
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
					format={'DD.MM.YYYY HH:mm'}
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
			toolTipProps={{
				title: 'Изменение',
			}}
			buttonProps={{
				type: 'default',
				icon: <EditOutlined />,
				disabled: true,
			}}
			modalConfig={{
				type: `save`,
				title: 'Редактирование дефекта',
				width: catalogName === 'defects' ? 600 : 500,
				bodyStyle: {height: catalogName === 'defects' ? 760 : 640},
				methodSaveForm: 'PUT',
				requestSaveForm: apiSaveByConfigName(
					catalogName === 'defects'
						? 'saveEditModalDefect'
						: 'saveEditModalPanelProblem'
				),
				form: {
					name: `${type}ModalForm`,
					loadInitData: loadData,
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
					path: `rtd.${currentMode}.table.selected`,
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
