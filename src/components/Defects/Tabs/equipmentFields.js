// import {
//     apiGetConfigByName,
//     apiGetFlatDataByConfigName,
// } from '../../../apis/catalog.api';
import {itemsInfo} from '../../../constants/dictionary';
import {classic} from 'rt-design';
import React from 'react';

const {
	Layout,
	// Form,
	// Space,
	// FormHeader,
	// FormBody,
	// FormFooter,
	// Divider,
	// Table,
	// Button,
	// Title,
	// Search,
	// Modal,
	// Tabs,
	Text,
	// Checkbox
} = classic;

export const EquipmentTabFields = () => {
	return (
		<Layout className={'p-8'}>
			<Text
				itemProps={{
					label: 'Техническое место',
					name: ['equipment', 'techPlacePath'],
					className: 'mb-0',
				}}
			/>
			{/*<Text>{equipment.techPlacePath}</Text>*/}
			<Text
				itemProps={{
					label: 'Наименование',
					name: ['equipment', 'name'],
					className: 'mb-0',
				}}
			/>
			<Text
				itemProps={{
					label: 'Тип конструкции',
					name: ['equipment', 'constructionType'],
					className: 'mb-0',
				}}
			/>
			<Text
				itemProps={{
					label: 'SAP ID',
					name: ['equipment', 'sapId'],
					className: 'mb-0',
				}}
			/>
			<Text
				itemProps={{
					label: 'Дата начала гарантии',
					name: ['equipment', 'dateWarrantyStart'],
					className: 'mb-0',
				}}
			/>
			<Text
				itemProps={{
					label: 'Дата окончания гарантии',
					name: ['equipment', 'dateWarrantyFinish'],
					className: 'mb-0',
				}}
			/>
			<Text
				itemProps={{
					label: 'Производитель',
					name: ['equipment', 'manufacturer'],
					className: 'mb-0',
				}}
			/>
			<Text
				itemProps={{
					label: 'Материал',
					name: ['equipment', 'material'],
					className: 'mb-0',
				}}
			/>
			<Text
				itemProps={{
					label: 'Тип оборудования',
					name: ['equipment', 'typeEquipment'],
					className: 'mb-0',
				}}
			/>
			<Text
				itemProps={{
					label: 'Вес',
					name: ['equipment', 'weight'],
					className: 'mb-0',
				}}
			/>
			<Text
				itemProps={{
					label: 'Точки измерения',
					name: ['equipment', 'measuringPoints'],
					className: 'mb-0',
				}}
			/>
			<Text
				itemProps={{
					label: 'Действителен до',
					name: ['equipment', 'dateFinish'],
					className: 'mb-0',
				}}
			/>
		</Layout>
	);
};

export const equipmentFields = () => {
	return {
		componentType: 'Layout',
		name: 'equipment',
		className: 'p-8',
		children: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					className: 'ml-8',
					label: 'Оборудование',
					level: 4,
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.typeEquipment,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.sapId,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				name: ['equipment', 'name'],
				label: itemsInfo.name.label,
				className: 'mb-8',
				rules: [],
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				name: ['equipment', 'techPlacePath'],
				label: itemsInfo.techPlacePath.label,
				className: 'mb-8',
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.parentName,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.constructionType,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.material,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.size,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.weight,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.manufacturer,
				child: {
					componentType: 'Text',
				},
			},
			{
				componentType: 'Item',
				...itemsInfo.dateFinish,
				format: 'DD.MM.YYYY',
				child: {
					componentType: 'Text',
				},
			},
			// {
			// 	componentType: 'Item',
			// 	name:'equipment',
			// 	child: {
			// 		componentType: 'Table',
			// 		// dispatchPath:
			// 		// 	'defects.defectTable.modal.infoEquipment.table',
			// 		// requestLoadRows: apiGetFlatDataByConfigName('equipments'),
			// 		requestLoadConfig: apiGetConfigByName('defectEquipmentsColumns'),
			// 	},
			// },
		],
	};
};
