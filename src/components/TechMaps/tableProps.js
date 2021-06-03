/**
 *
 * файл со всеми customFields, поля и валидация в объекты таблицы
 */
import React from 'react';
import {classic} from 'rt-design';
import {useHistory} from 'react-router';
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	DeleteOutlined,
	EditOutlined,
	FolderOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import {paths} from '../../constants/paths';
import {
	AddCustomGroupOnServer,
	EditCustomGroupOnServer,
} from '../Base/Modals/CustomGroupOnServer';
import {CustomObjectView} from '../Base/Modals/CustomObjectView';
import {CustomGroupView} from '../Base/Modals/CustomGroupView';
import {codeNormalizer} from '../Base/Functions/TextUtils';
import {code, duration, position} from '../Base/customColumnProps';
import {
	AddTechOperationButton,
	EditTechOperationButton,
} from './Form/Modals/EditModal';

const {Button, Row, Space, Checkbox} = classic;

/**
 *
 * @param mainWay name of server configuration
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
				disabled={true}
				subscribe={[
					{
						name: 'selected',
						path: 'rtd.techMaps.techMapsTable.table.selected',
						onChange: ({value, setSubscribeProps}) => {
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
					mainWay={mainWay}
					catalogName={catalogName}
					unique={unique}
				/>
				<EditObjectButton />
				<EditCustomGroupOnServer
					mainWay={mainWay}
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

export const TechOperTableHeader = () => {
	return (
		<Space className={'p-8'}>
			<AddTechOperationButton />
			<EditTechOperationButton />
			<Button
				itemProps={{name: 'btnDelete'}}
				icon={<DeleteOutlined />}
				type={'default'}
				disabled={true}
				dispatch={{
					path: 'techMaps.techOperations.btnDelete.events',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'onTechMapsTechOperationsSelect',
						path: 'rtd.techMaps.techOperations.table.selected',
						onChange: ({value, setSubscribeProps}) => {
							value
								? setSubscribeProps({
										disabled: false,
								  })
								: setSubscribeProps({
										disabled: true,
								  });
						},
					},
				]}
			/>
			<Button
				icon={<ArrowUpOutlined />}
				disabled={true}
				dispatch={{
					path: 'techMaps.techOperations.table.actions.onClickMoveUp',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'btnUp',
						path: 'rtd.techMaps.techOperations.table.selected',
						onChange: ({value, setSubscribeProps}) => {
							value &&
								setSubscribeProps &&
								setSubscribeProps({
									disabled: !value,
								});
						},
					},
				]}
			/>
			<Button
				icon={<ArrowDownOutlined />}
				disabled={true}
				dispatch={{
					path:
						'techMaps.techOperations.table.actions.onClickMoveDown',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'btnUp',
						path: 'rtd.techMaps.techOperations.table.selected',
						onChange: ({value, setSubscribeProps}) => {
							value &&
								setSubscribeProps &&
								setSubscribeProps({
									disabled: !value,
								});
						},
					},
				]}
			/>
		</Space>
	);
};
export const mainCustomColumnProps = [
	{
		name: 'code',
		cellRenderer: ({rowData}) => {
			return rowData.isGroup ? (
				<span>
					<FolderOutlined className={'mr-8'} />
					{codeNormalizer(rowData.code)}
				</span>
			) : (
				<span>{codeNormalizer(rowData.code)}</span>
			);
		},
	},
	{
		name: 'techMapsStatusName',
		cellRenderer: ({cellData}) => <div>{cellData ? cellData : ' '}</div>,
	},
];

export const formCustomColumnProps = [
	{...code},
	{...position, width: '50px', align: 'center'},
	{...duration},
	{
		name: 'needInputData',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
	{
		name: 'equipmentStop',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
	{
		name: 'increasedDanger',
		cellRenderer: ({cellData}) => <Checkbox checked={cellData} disabled />,
	},
];
