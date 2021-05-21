import React from 'react';
import {classic} from 'rt-design';
import {itemsInfo} from '../../../../constants/dictionary';

const {
	Modal,
	FormBody,
	Text,
	Title,
	Checkbox,
	Layout,
	Col,
	Space,
	DateText,
} = classic;
export const DetourSchedulesView = () => {
	const loadInit = (callBack, row) => {
		console.log({...row, ...row.data});
		callBack({...row, ...row.data});
	};
	const formTextStyle = {
		labelCol: {span: 12},
		wrapperCol: {span: 12},
	};
	const formCheckboxStyle = {
		labelCol: {span: 21},
		wrapperCol: {span: 3},
	};
	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title: `Информация об обходе`,
				width: 850,
				bodyStyle: {height: 650},
				form: {
					name: 'detourSchedulesViewModal',
					loadInitData: loadInit,
				},
			}}
			subscribe={[
				{
					name: `detoursSchedulesModalInfo`,
					path: `rtd.detours.schedulesTable.table.events.onRowDoubleClick`,
					onChange: ({value, setModalData, openModal}) => {
						value &&
							setModalData &&
							setModalData({
								...value.value,
							});
						value && openModal();
					},
				},
			]}
		>
			<FormBody>
				<Layout>
					<Space style={{justifyContent: 'space-evenly'}}>
						<Col>
							<Title label={'Описание'} level={5} />
							<Text
								itemProps={{
									...itemsInfo.name,
									rules: [],
									...formTextStyle,
								}}
							/>
							<DateText
								itemProps={{
									name: 'detourBeginTime',
									label: 'Дата начала',
									className: 'mb-8',
									...formTextStyle,
								}}
								format={'HH:mm DD.MM.YY'}
							/>
							<DateText
								itemProps={{
									name: 'detourEndTime',
									label: 'Дата окончания',
									className: 'mb-8',
									...formTextStyle,
								}}
								format={'HH:mm DD.MM.YY'}
							/>
							<Text
								itemProps={{
									name: 'routeName',
									className: 'mb-8',
									label: 'Маршрут',
									...formTextStyle,
								}}
							/>
							<Text
								itemProps={{
									name: 'staffName',
									className: 'mb-8',
									label: 'Исполнитель',
									...formTextStyle,
								}}
							/>
							<Title label={'Допуски'} level={5} />
							<Checkbox
								itemProps={{
									...itemsInfo.saveOrderControlPoints,
									...formCheckboxStyle,
								}}
								disabled={true}
							/>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountDateStart,
									...formCheckboxStyle,
								}}
								disabled={true}
							/>
							<Text
								itemProps={{
									...itemsInfo.possibleDeviationDateStart,
									...formCheckboxStyle,
								}}
							/>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountDateFinish,
									...formCheckboxStyle,
								}}
								disabled={true}
							/>
							<Text
								itemProps={{
									...itemsInfo.possibleDeviationDateFinish,
									...formCheckboxStyle,
								}}
							/>
							<Checkbox
								itemProps={{
									...itemsInfo.takeIntoAccountTimeLocation,
									...formCheckboxStyle,
								}}
								disabled={true}
							/>
							<Text
								itemProps={{
									...itemsInfo.possibleDeviationLocationTime,
									label: 'ДО на точке, мин.',
									...formCheckboxStyle,
								}}
							/>
						</Col>
						<Col>
							<Title label={'Параметры повторения'} level={5} />
							<Text
								itemProps={{
									name: 'periodName',
									className: 'mb-8',
									label: 'Повторение',
									...formTextStyle,
								}}
							/>
							<Text
								itemProps={{
									name: 'interval',
									className: 'mb-8',
									label: 'Интервал',
									...formTextStyle,
								}}
							/>
							<DateText
								itemProps={{
									name: 'dateStart',
									label: 'Начать с',
									className: 'mb-8',
									...formTextStyle,
								}}
								format={'HH:mm DD.MM.YY'}
							/>
							<DateText
								itemProps={{
									name: 'nextExecution',
									label: 'Повторить',
									className: 'mb-8',
									...formTextStyle,
								}}
								format={'HH:mm DD.MM.YY'}
							/>
							<DateText
								itemProps={{
									name: 'dateFinish',
									label: 'Завершить',
									className: 'mb-8',
									...formTextStyle,
								}}
								format={'HH:mm DD.MM.YY'}
							/>
						</Col>
					</Space>
				</Layout>
			</FormBody>
		</Modal>
	);
};
