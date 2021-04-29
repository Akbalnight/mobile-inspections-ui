import {classic} from 'rt-design';
import React from 'react';

const {Layout, Text} = classic;

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
