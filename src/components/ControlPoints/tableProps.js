/**
 *
 * файл со всеми customFields, поля и валидация в объекты таблицы
 */
import React from 'react';
import {classic} from 'rt-design';
// import {EditCustomObjectButton} from '../Catalog/Modals/btnCustomObject';

import {useHistory} from 'react-router';

// history.location.pathname === '/detours-configurator/control-points';

import {
	// DeleteOutlined,
	EditOutlined,
	// FolderOutlined,
	PlusOutlined,
	// ToolOutlined,
} from '@ant-design/icons';
import {paths} from '../../constants/paths';
import {
	AddCustomGroupOnServer,
	EditCustomGroupOnServer,
} from '../Base/Modals/CustomGroupOnServer';
// import {DeleteOnServer} from '../Base/Modals/DeleteOnServer';
import {CustomObjectView} from '../Base/Modals/CustomObjectView';
import {CustomGroupView} from '../Base/Modals/CustomGroupView';
import {
	AddDefaultObjectOnServer,
	EditDefaultObjectOnServer,
} from '../Base/Modals/DefaultObjectOnServer';
import {DefaultObjectView} from '../Base/Modals/DefaultObjectView';

const {Button, Row} = classic;

/**
 *
 * @param catalogName name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.object}
 * @desc Function choice table header buttons(action modals) and view modals
 */
export const CatalogTableHeader = ({catalogName, unique}) => {
	let history = useHistory();

	const AddObjectButton = () => {
		return (
			<Button
				className={['ant-btn-icon-only', 'mr-8']}
				onClick={() => {
					history.push(
						paths.DETOURS_CONFIGURATOR_CONTROL_POINTS_NEW.path
					);
				}}
			>
				<PlusOutlined />
			</Button>
		);
	};
	const EditObjectButton = () => {
		let sValueId = null;
		return (
			<Button
				className={['ant-btn-icon-only']}
				dispatch={{
					path: 'catalog.controlPointsTable.events.onClickEdit',
				}}
				subscribe={[
					{
						name: 'selected',
						path: 'rtd.catalog.controlPointsTable.table.selected',
						onChange: ({value, setSubscribeProps}) => {
							// console.log('v', value);
							if (value && !value.isGroup) {
								sValueId = value.id;
								setSubscribeProps({
									hidden: false,
									disabled: false,
								});
							} else {
								setSubscribeProps({hidden: true});
								sValueId = null;
							}
						},
					},
				]}
				onClick={() => {
					history.push(
						paths.DETOURS_CONFIGURATOR_CONTROL_POINTS.path +
							'/' +
							sValueId
					);
				}}
			>
				<EditOutlined />
			</Button>
		);
	};
	const configCatalogName = (catalogName) => {
		// console.log('catalogName',catalogName)
		switch (catalogName) {
			case 'controlPoints':
				return (
					<>
						<AddObjectButton />
						<AddCustomGroupOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						<EditObjectButton />

						<EditCustomGroupOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						{/* временно скроем удаление контрольных точек, стоит потом проверить работу  */}
						{/*<DeleteOnServer*/}
						{/*	catalogName={catalogName}*/}
						{/*	unique={unique}*/}
						{/*/>*/}
						<CustomObjectView
							catalogName={catalogName}
							unique={unique}
						/>
						<CustomGroupView catalogName={catalogName} />
					</>
				);
			default:
				return (
					<>
						<AddDefaultObjectOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						<EditDefaultObjectOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						{/*<DeleteButton catalogName={catalogName} unique={unique} />*/}
						<DefaultObjectView
							catalogName={catalogName}
							unique={unique}
						/>
					</>
				);
		}
	};
	return <Row className={'p-8'}>{configCatalogName(catalogName)}</Row>;
};

export const equipmentTableCustom = (controlPointId) => {
	return [
		{
			name: 'controlPointId',
			value: () => controlPointId,
		},
		{
			name: 'equipmentName',
			value: (row) => row.name,
		},
		{
			name: 'equipmentId',
			value: (row) => row.id,
			validate: (row, rows) => {
				// console.log("validate => ", rows.map(row => row.equipmentId));
				// console.log("validate => ", row.id);
				// console.log("validate => ", !rows.map(row => row.equipmentId).includes(row.id));
				return !rows.map((row) => row.equipmentId).includes(row.id);
			},
		},
	];
};
export const techMapsTableCustom = (controlPointId) => {
	return [
		{
			name: 'controlPointId',
			value: () => controlPointId,
		},
		{
			name: 'techMapId',
			value: (row) => row.id,
		},
		{
			name: 'isGroup',
			validate: (row, rows) => !row.isGroup,
		},
	];
};
