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

const {Row, Checkbox, DateText} = classic;
/**
 * @desc Object with Item props in this section
 * @type {{measuringPoints: {name: string, className: string, label: string}, constructionType: {name: string, className: string, label: string}, dateWarrantyFinish: {name: string, className: string, label: string}, typeEquipment: {name: string, className: string, label: string}, code: {name: string, className: string, label: string}, departmentId: {name: string, className: string, label: string}, dateFinish: {name: string, className: string, label: string}, dateWarrantyStart: {name: string, className: string, label: string}, dateFinishSchedule: {name: string, className: string, label: string}, manufacturer: {name: string, className: string, label: string}, vacation: {name: string, className: string, label: string}, sapId: {name: string, className: string, label: string}, direction: {name: string, className: string, label: string}, techPlace: {name: string, className: string, label: string}, isGroupTypical: {name: string, className: string, label: string}, techPlacePath: {name: string, className: string, label: string}, weight: {name: string, className: string, label: string}, priority: {name: string, className: string, label: string}, userId: {name: string, className: string, label: string}, parentId: {name: string, className: string, label: string}, dateStartSchedule: {name: string, className: string, label: string}, sickLeaves: {name: string, className: string, label: string}, parentName: {name: string, className: string, label: string}, deleted: {name: string, className: string, label: string}, material: {name: string, className: string, label: string}, size: {name: string, className: string, label: string}, positionId: {name: string, className: string, label: string}, name: {name: string, className: string, label: string}, workSchedules: {name: string, className: string, label: string}}}
 */
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
	userId: {
		name: 'userId',
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
	username: {
		name: 'username',
		label: 'Имя сотрудника',
		className: 'mb-8',
	},
	positionName: {
		name: 'positionName',
		label: 'Должность',
		className: 'mb-8',
	},
	departmentName: {
		name: 'departmentName',
		label: 'Департамент',
		className: 'mb-8',
	},
};

/**
 *
 * @param catalogName name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.object}
 * @desc Function choice table header buttons(action modals) and view modals
 */
export const CatalogTableHeader = ({catalogName, unique}) => {
	const configCatalogName = (catalogName) => {
		// console.log('catalogName',catalogName)
		switch (catalogName) {
			case 'equipments':
			case 'defectTypical':
				return (
					<>
						<AddCustomObjectButton
							catalogName={catalogName}
							unique={unique}
						/>
						<AddGroupButton
							catalogName={catalogName}
							unique={unique}
						/>
						<EditCustomObjectButton
							catalogName={catalogName}
							unique={unique}
						/>
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

/**
 * @desc Array of table column configuration
 * @type {({cellRenderer: (function({cellData: *}): *), name: string}|{cellRenderer: (function({cellData: *}): *), name: string}|{cellRenderer: (function({rowData: *, cellData: *}): *), name: string}|{cellRenderer: function({cellData?: *}): *, name: *})[]}
 */
export const customColumnPropsEquipments = [
	{
		name: 'deleted',
		cellRenderer: ({cellData}) => {
			return <Checkbox checked={cellData} disabled />;
		},
	},
	{
		name: 'isGroup',
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
	{
		name: 'workSchedules',
		cellRenderer: ({cellData}) => (
			<span style={{display: 'flex', flexDirection: 'column'}}>
				{cellData &&
					cellData.map((cell, index) => (
						<span
							key={index}
							style={{display: 'flex', flexDirection: 'row'}}
						>
							<DateText
								value={cell[`${index}-StartWorkSchedules`]}
								format={'DD.MM.YYYY HH:mm'}
							/>
							{'  '}
							-&gt;{'  '}
							<DateText
								value={cell[`${index}-FinishWorkSchedules`]}
								format={'DD.MM.YYYY HH:mm'}
							/>
						</span>
					))}
			</span>
		),
	},
	{
		name: 'sickLeaves',
		cellRenderer: ({cellData}) => (
			<span style={{display: 'flex', flexDirection: 'column'}}>
				{cellData &&
					cellData.map((cell, index) => (
						<span
							key={index}
							style={{display: 'flex', flexDirection: 'row'}}
						>
							<DateText
								value={cell[`${index}-StartSickLeaves`]}
								format={'DD.MM.YYYY'}
							/>{' '}
							-{' '}
							<DateText
								value={cell[`${index}-FinishSickLeaves`]}
								format={'DD.MM.YYYY'}
							/>
						</span>
					))}
			</span>
		),
	},
	{
		name: 'vacation',
		cellRenderer: ({cellData}) => (
			<span style={{display: 'flex', flexDirection: 'column'}}>
				{cellData &&
					cellData.map((cell, index) => (
						<span
							key={index}
							style={{display: 'flex', flexDirection: 'row'}}
						>
							<DateText
								value={cell[`${index}-StartVacation`]}
								format={'DD.MM.YYYY'}
							/>{' '}
							-{' '}
							<DateText
								value={cell[`${index}-FinishVacation`]}
								format={'DD.MM.YYYY'}
							/>
						</span>
					))}
			</span>
		),
	},
	{
		name: 'code', //'codeHierarchical'
		cellRenderer: ({rowData, cellData}) => {
			return (
				<span>
					{rowData.isGroup ? <FolderOutlined /> : null} {cellData}
				</span>
			);
		},
	},
];
