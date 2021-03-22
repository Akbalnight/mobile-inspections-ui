import {classic} from 'rt-design';
import {DeleteButton} from './Modals/btnDecDelete';
import {AddGroupButton, EditGroupButton} from './Modals/btnCustomGroup';
import {ModalObjectView} from './Modals/modalObjectView';
import {ModalGroupView} from './Modals/modalGroupView';
import React from 'react';
import {AddDefaultButton, EditDefaultButton} from './Modals/btnDefaultObject';
import {ModalDefaultObjectView} from './Modals/modalDefaultObjectView';
import {FolderOutlined, ToolOutlined} from '@ant-design/icons';
import {
	AddCustomObjectButton,
	EditCustomObjectButton,
} from './Modals/btnCustomObject';
import {dateTime} from '../Base/customColumnProps';

const {Row, Checkbox} = classic;
export const itemsInfo = {
	/*
	 * btnDecCustomObject.js
	 * */
	typeEquipment: {
		name: 'typeEquipment',
		label: 'Тип единицы оборудования',
		className: 'mb-8',
	},
	sapId: {
		name: 'sapId',
		label: 'SAP_ID',
		className: 'mb-8',
	},
	name: {
		name: 'name',
		label: 'Наименование',
		className: 'mb-8',
	},
	techPlacePath: {
		name: 'techPlacePath',
		label: 'Код технического места',
		className: 'mb-8',
	},
	parentId: {
		name: 'parentId',
		label: 'Техническое место',
		className: 'mb-8',
	},
	constructionType: {
		name: 'constructionType',
		label: 'Тип конструкции',
		className: 'mb-8',
	},
	material: {
		name: 'material',
		label: 'Материал',
		className: 'mb-8',
	},
	size: {
		name: 'size',
		label: 'Величина/размер',
		className: 'mb-8',
	},
	weight: {
		name: 'weight',
		label: 'Вес',
		className: 'mb-8',
	},
	manufacturer: {
		name: 'manufacturer',
		label: 'Изготовитель',
		className: 'mb-8',
	},
	deleted: {
		name: 'deleted',
		label: 'Метка удаления',
		className: 'mb-8',
	},
	dateFinish: {
		name: 'dateFinish',
		label: 'Действителен до',
		className: 'mb-8',
	},
	measuringPoints: {
		name: 'measuringPoints',
		label: 'Точки измерений',
		className: 'mb-8',
	},

	dateWarrantyStart: {
		name: 'dateWarrantyStart',
		label: 'Начало гарантии',
		className: 'mb-8',
	},

	dateWarrantyFinish: {
		name: 'dateWarrantyFinish',
		label: 'Окончание гарантии',
		className: 'mb-8',
	},
	parentName: {
		name: 'parentName',
		label: 'Техническое место',
		className: 'mb-8',
	},

	/**
	 * btnCustomGroup.js
	 */
	techPlace: {
		name: 'techPlace',
		label: 'Техническое место',
		className: 'mb-8',
	},
	/**
	 * modalDefaultObjectView.js
	 */
	code: {
		name: 'code',
		label: 'Код',
		className: 'mb-8',
	},
	direction: {
		name: 'direction',
		label: 'Направление',
		className: 'mb-8',
	},
	priority: {
		name: 'priority',
		label: 'Приоритет',
		className: 'mb-8',
	},
	dateStartSchedule: {
		name: 'dateStart',
		label: 'Начало работы',
		className: 'mb-8',
	},
	dateFinishSchedule: {
		name: 'dateFinish',
		label: 'Окончание работы',
		className: 'mb-8',
	},
	isGroupTypical: {
		name: 'isGroup',
		label: 'Группа',
		className: 'mb-8',
	},
	positionId: {
		name: 'positionId',
		label: 'Должность',
		className: 'mb-8',
	},
	departmentId: {
		name: 'departmentId',
		label: 'Департамент',
		className: 'mb-8',
	},
	userName: {
		name: 'username',
		label: 'Имя пользователя',
		className: 'mb-8',
	},
	workSchedules: {
		name: 'workSchedules',
		label: 'Рабочие графики',
		className: 'mb-8',
	},
	sickLeaves: {
		name: 'sickLeaves',
		label: 'Больничные',
		className: 'mb-8',
	},
	vacation: {
		name: 'vacation',
		label: 'Отпуска',
		className: 'mb-8',
	},
};

export const CatalogTableHeader = ({catalogName, unique}) => {
	return (
		<Row className={'p-8'}>
			{catalogName !== 'equipments' ? (
				<>
					<AddDefaultButton
						catalogName={catalogName}
						unique={unique}
					/>
					<EditDefaultButton
						catalogName={catalogName}
						unique={unique}
					/>
					<DeleteButton catalogName={catalogName} unique={unique} />
					<ModalDefaultObjectView catalogName={catalogName} />
				</>
			) : (
				<>
					<AddCustomObjectButton
						catalogName={catalogName}
						unique={unique}
					/>
					<AddGroupButton catalogName={catalogName} unique={unique} />
					<EditCustomObjectButton
						catalogName={catalogName}
						unique={unique}
					/>
					<EditGroupButton
						catalogName={catalogName}
						unique={unique}
					/>
					<DeleteButton catalogName={catalogName} unique={unique} />
					<ModalObjectView catalogName={catalogName} />
					<ModalGroupView catalogName={catalogName} />
				</>
			)}
		</Row>
	);
};

export const customColumnPropsEquipments = [
	{
		name: 'deleted',
		cellRenderer: ({cellData}) => {
			return <Checkbox checked={cellData} disabled />;
		},
	},
	{
		name: 'techPlacePath',
		cellRenderer: ({rowData, cellData}) => {
			return (
				<span>
					{rowData.isGroup ? <FolderOutlined /> : <ToolOutlined />}{' '}
					{cellData}
				</span>
			);
		},
	},
	{...dateTime('dateStart')},
	{...dateTime('dateFinish')},
];
