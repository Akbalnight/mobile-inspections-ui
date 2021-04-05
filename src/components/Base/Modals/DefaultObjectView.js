import {classic} from 'rt-design';
import {itemsInfo} from '../../../constants/dictionary';
import React from 'react';
import {
	CalendarOutlined,
	CompassOutlined,
	ContactsOutlined,
	MedicineBoxOutlined,
} from '@ant-design/icons';

const {
	Modal,
	FormBody,
	Text,
	Tabs,
	TabPane,
	List,
	Layout,
	DateText,
	Row,
} = classic;

/**
 *
 * @param catalogName name of server configuration<string>
 * @param unique phrase on Russian<string>
 * @returns {JSX.object}
 * @desc Modal view table info about row(onRowDoubleClick) , only object
 */
export const DefaultObjectView = ({catalogName, unique}) => {
	/**
	 *
	 * @param callBack function change state (row)
	 * @param row info object from table
	 */
	const loadData = (callBack, row) => {
		callBack({
			...row,
			workSchedules: row.workSchedules ? row.workSchedules : [],
			sickLeaves: row.sickLeaves ? row.sickLeaves : [],
			vacation: row.vacation ? row.vacation : [],
		});
	};
	/**
	 *
	 * @param catalogName name of server configuration<string>
	 * @returns {number}
	 * @desc Func choice height number by catalogName
	 */
	const modalHeight = (catalogName) => {
		switch (catalogName) {
			case 'staff':
				return 350;
			case 'departments':
				return 230;
			case 'panelProblemsPriorities':
				return 280;
			default:
				return 190;
		}
	};

	/**
	 *
	 * @param catalogName name of server configuration<string>
	 * @returns {null|JSX.object}
	 */
	const catalogOption = (catalogName) => {
		switch (catalogName) {
			case 'departments':
				return (
					<Text
						itemProps={{...itemsInfo.parentId, label: 'Родитель'}}
					/>
				);
			case 'panelProblemsPriorities':
				return (
					<>
						<Text itemProps={{...itemsInfo.direction}} />
						<Text itemProps={{...itemsInfo.priority}} />
					</>
				);
			case 'staff':
				return (
					<>
						<Tabs type={'card'} size={'medium'}>
							<TabPane
								key={'infoTab'}
								tab={
									<span>
										<ContactsOutlined />
										Общие сведения
									</span>
								}
								scrollable={true}
							>
								<Layout>
									<Text itemProps={{...itemsInfo.code}} />
									<Text itemProps={{...itemsInfo.username}} />
									<Text
										itemProps={{...itemsInfo.positionName}}
									/>
									<Text
										itemProps={{
											...itemsInfo.departmentName,
										}}
									/>
								</Layout>
							</TabPane>
							<TabPane
								key={'schedulesTab'}
								tab={
									<span>
										<CalendarOutlined />
										Рабочие графики
									</span>
								}
								scrollable={true}
							>
								<Layout>
									<List
										itemProps={{
											valuePropName: 'dataSource',
											name: 'workSchedules',
										}}
										renderItem={(item, index) => (
											<Row
												style={{
													justifyContent: 'center',
												}}
											>
												<DateText
													value={
														item[
															`${index}-StartWorkSchedules`
														]
													}
													itemProps={{
														label: 'с',
														labelCol: {span: 5},
														wrapperCol: {span: 19},
														className: 'mb-8 mr-8',
														style: {width: '150px'},
													}}
													format={'DD.MM.YYYY HH:mm'}
												/>
												<DateText
													value={
														item[
															`${index}-FinishWorkSchedules`
														]
													}
													itemProps={{
														label: 'по',
														labelCol: {span: 6},
														wrapperCol: {span: 18},
														className: 'mb-8 ',
														style: {width: '150px'},
													}}
													format={'DD.MM.YYYY HH:mm'}
												/>
											</Row>
										)}
										itemLayout={'vertical'}
										className={'mt-16'}
										style={{}}
									/>
								</Layout>
							</TabPane>
							<TabPane
								key={'sickLeavesTab'}
								tab={
									<span>
										<MedicineBoxOutlined />
										Больничные
									</span>
								}
								scrollable={true}
							>
								<Layout>
									<List
										itemProps={{
											valuePropName: 'dataSource',
											name: 'sickLeaves',
										}}
										renderItem={(item, index) => (
											<Row
												style={{
													justifyContent: 'center',
												}}
											>
												<DateText
													value={
														item[
															`${index}-StartSickLeaves`
														]
													}
													itemProps={{
														label: 'с',
														labelCol: {span: 5},
														wrapperCol: {span: 19},
														className: 'mb-8 mr-8',
														style: {width: '150px'},
													}}
													format={'DD.MM.YYYY'}
												/>
												<DateText
													value={
														item[
															`${index}-FinishSickLeaves`
														]
													}
													itemProps={{
														label: 'по',
														labelCol: {span: 6},
														wrapperCol: {span: 18},
														className: 'mb-8 ',
														style: {width: '150px'},
													}}
													format={'DD.MM.YYYY'}
												/>
											</Row>
										)}
										itemLayout={'vertical'}
										className={'mt-16'}
										style={{}}
									/>
								</Layout>
							</TabPane>
							<TabPane
								key={'vacationTab'}
								tab={
									<span>
										<CompassOutlined />
										Отпуска
									</span>
								}
								scrollable={true}
							>
								<Layout>
									<List
										itemProps={{
											valuePropName: 'dataSource',
											name: 'vacation',
										}}
										renderItem={(item, index) => (
											<Row
												style={{
													justifyContent: 'center',
												}}
											>
												<DateText
													value={
														item[
															`${index}-StartVacation`
														]
													}
													itemProps={{
														label: 'с',
														labelCol: {span: 5},
														wrapperCol: {span: 19},
														className: 'mb-8 mr-8',
														style: {width: '150px'},
													}}
													format={'DD.MM.YYYY'}
												/>
												<DateText
													value={
														item[
															`${index}-FinishVacation`
														]
													}
													itemProps={{
														label: 'по',
														labelCol: {span: 6},
														wrapperCol: {span: 18},
														className: 'mb-8 ',
														style: {width: '150px'},
													}}
													format={'DD.MM.YYYY'}
												/>
											</Row>
										)}
										itemLayout={'vertical'}
										className={'mt-16'}
										style={{}}
									/>
								</Layout>
							</TabPane>
						</Tabs>
					</>
				);
			default:
				return null;
		}
	};
	return (
		<Modal
			modalConfig={{
				type: 'viewObject',
				title:
					catalogName !== 'staff'
						? `Карточка ${unique}`
						: `Карточка сотрудника`,
				width: catalogName === 'staff' ? 600 : 400,
				bodyStyle: {
					height: modalHeight(catalogName),
				},
				form: {
					name: `${catalogName}ModalInfoForm`,
					loadInitData: loadData,
					labelCol: {span: 12},
					wrapperCol: {span: 12},
				},
			}}
			subscribe={[
				{
					name: `${catalogName}ModalInfo`,
					path: `rtd.catalog.${catalogName}Table.table.events.onRowDoubleClick`,
					onChange: ({value, setModalData, openModal}) => {
						value &&
							setModalData &&
							setModalData({
								...value.value,
							});
						openModal();
					},
				},
			]}
		>
			<FormBody>
				{catalogName !== 'staff' ? (
					<>
						<Text itemProps={{...itemsInfo.code}} />
						<Text itemProps={{...itemsInfo.name}} />
					</>
				) : null}
				{catalogOption(catalogName)}
			</FormBody>
		</Modal>
	);
};
