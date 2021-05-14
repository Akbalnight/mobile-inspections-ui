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

const {Button, Row, Space} = classic;

/**
 *
 * @param catalogName name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.object}
 * @desc Function choice table header buttons(action modals) and view modals
 */
export const TechMapsTableHeader = ({mainWay, catalogName, unique}) => {
	let history = useHistory();

	const AddObjectButton = () => {
		return (
			<Button
				className={['ant-btn-icon-only', 'mr-8']}
				onClick={() => {
					history.push(
						paths
							.DETOURS_CONFIGURATOR_TECH_MAPS_FORM_NEW_VERSION_NEW
							.path
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
					path: 'techMaps.mainForm.events.onClickEdit',
				}}
				subscribe={[
					{
						name: 'selected',
						path: 'rtd.techMaps.techMapsTable.table.selected',
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
						paths.DETOURS_CONFIGURATOR_TECH_MAPS_FORM_NEW_VERSION
							.path +
							'/' +
							sValueId
					);
				}}
			>
				<EditOutlined />
			</Button>
		);
	};

	return (
		<Space style={{justifyContent: 'space-between'}} className={'p-8'}>
			<Row>
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
				<CustomObjectView
					catalogName={catalogName}
					unique={unique}
					mainWay={mainWay}
				/>
				<CustomGroupView catalogName={catalogName} mainWay={mainWay} />
			</Row>
		</Space>
	);
};
