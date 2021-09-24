import {Modal, FormBody, Text} from 'rt-design';
import {itemsInfo} from '../../../constants/dictionary';
import React from 'react';
import {objectView} from '../Functions/DefaultObject';
import {changeStorePath} from '../Functions/ChangeStorePath';
import {catalogConfigs} from '../../Catalog/Registry/catalogConfigs';
import {paths} from '../../../constants/paths';

/**
 *
 * @param catalogName name of server configuration<string>
 * @param mainWay name of server configuration<string>
 * @param unique phrase on Russian<string>
 * @returns {JSX.Element}
 * @desc Modal view table info about row(onRowDoubleClick) , only object
 */
export const DefaultObjectView = ({mainWay, catalogName}) => {
	const objByCatalogName = catalogConfigs(paths).find(
		(el) => el.name === catalogName
	);
	const {unique} = objByCatalogName;
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

	return (
		<Modal
			modalConfig={{
				type: 'view',
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
					path: `rtd.${changeStorePath(
						mainWay,
						catalogName
					)}.events.onRowDoubleClick`,
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
						<Text itemProps={{...itemsInfo.name, rules: []}} />
					</>
				) : null}
				{objectView(catalogName)}
			</FormBody>
		</Modal>
	);
};
