/**
 *
 * файл со всеми customFields, поля и валидация в объекты таблицы
 */
import React from 'react';
import {classic} from 'rt-design';
// import {EditCustomObjectButton} from '../Catalog/Modals/btnCustomObject';
import {
	AddGroupButton,
	EditGroupButton,
} from '../Catalog/Modals/btnCustomGroup';
import {DeleteButton} from '../Catalog/Modals/btnDecDelete';
import {ModalObjectView} from '../Catalog/Modals/modalObjectView';
import {ModalGroupView} from '../Catalog/Modals/modalGroupView';
import {
	AddDefaultButton,
	EditDefaultButton,
} from '../Catalog/Modals/btnDefaultObject';
import {ModalDefaultObjectView} from '../Catalog/Modals/modalDefaultObjectView';
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
						<AddGroupButton
							catalogName={catalogName}
							unique={unique}
						/>
						<EditObjectButton />
						{/*<EditCustomObjectButton*/}
						{/*    catalogName={catalogName}*/}
						{/*    unique={unique}*/}
						{/*/>*/}
						<EditGroupButton
							catalogName={catalogName}
							unique={unique}
						/>
						<DeleteButton
							catalogName={catalogName}
							unique={unique}
						/>
						<ModalObjectView
							catalogName={catalogName}
							unique={unique}
						/>
						<ModalGroupView catalogName={catalogName} />
					</>
				);
			default:
				return (
					<>
						<AddDefaultButton
							catalogName={catalogName}
							unique={unique}
						/>
						<EditDefaultButton
							catalogName={catalogName}
							unique={unique}
						/>
						{/*<DeleteButton catalogName={catalogName} unique={unique} />*/}
						<ModalDefaultObjectView
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
