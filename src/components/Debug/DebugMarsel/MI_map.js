import React from 'react';
import {Tree, Typography, Popover, Space} from 'antd';
import {BasePage} from 'mobile-inspections-base-ui';
import './MI_map.less';

const {Title} = Typography;

export const BigMobInsMap = () => {
	const descInfo = {
		rtd: {name: 'Корневой адрес', address: 'rtd'},
		controlPoints: {
			name: 'Контрольные точки',
			address: 'rtd.controlPoints',
		},
		controlPointsTable: {
			name: 'Контрольные точки, основной реестр',
			address: 'rtd.controlPoints.table',
		},
		controlPointsTableRows: {
			name: 'Контрольные точки, основной реестр всв строки',
			address: 'rtd.controlPoints.table.rows',
		},
		controlPointsTableSelected: {
			name: 'Контрольные точки, основной реестр выделенные строки',
			address: 'rtd.controlPoints.table.selected',
		},
		controlPointsTableEvents: {
			name: 'Контрольные точки, основной реестр все события',
			address: 'rtd.controlPoints.table.events',
		},
		onRowClick: {
			name: 'Событие по одинарному клику',
			address: 'rtd.controlPoints.table.events.onRowClick',
		},
		onRowDoubleClick: {
			name: 'Событие по двойному клику',
			address: 'rtd.controlPoints.table.events.onRowDoubleClick',
		},
		addOnModal: {
			name: 'Событие добавления объекта',
			address: 'rtd.controlPoints.table.events.addOnModal',
		},
		editOnModal: {
			name: 'Событие изменение объекта',
			address: 'rtd.controlPoints.table.events.editOnModal',
		},
		addOnGroupModal: {
			name: 'Событие добавления группы объектов',
			address: 'rtd.controlPoints.table.events.addOnGroupModal',
		},
		editOnGroupModal: {
			name: 'Событие изменение группы объектов',
			address: 'rtd.controlPoints.table.events.editOnGroupModal',
		},
		deleteOnModal: {
			name: 'Событие пометки на удаление',
			address: 'rtd.controlPoints.table.events.deleteOnModal',
		},
		onSearch: {
			name: 'Событие поиска',
			address: 'rtd.controlPoints.table.events.onSearch',
		},
		onReload: {
			name: 'Событие перезагрузки',
			address: 'rtd.controlPoints.table.events.onReload',
		},
		controlPointsForm: {
			name: 'Контрольные точки, форма создания/редактирования',
			address: 'rtd.controlPoints.form',
		},
		equipmentsTableOnDelete: {
			name: 'Событие удаления локально',
			address: 'rtd.controlPoints.form.equipmentsTable.onDelete',
		},
		techMapsTableOnDelete: {
			name: 'Событие удаления локально',
			address: 'rtd.controlPoints.form.techMapsTable.onDelete',
		},
		equipmentsTable: {
			name: 'Реестр оборудования',
			address: 'rtd.controlPoints.form.equipmentsTable',
		},
		equipmentsTableModal: {
			name: 'Реестр выбора оборудования',
			address: 'rtd.controlPoints.form.equipmentsTable.select',
		},
		equipmentsSelectOnSave: {
			name: 'Сохранение при выборе',
			address: 'rtd.controlPoints.form.equipmentsTable.select.onSave',
		},
		equipmentsSelectOnSearch: {
			name: 'Поиск при выборе',
			address: 'rtd.controlPoints.form.equipmentsTable.select.onSearch',
		},
		equipmentsSelectTable: {
			name: 'Реестр при выборе',
			address: 'rtd.controlPoints.form.equipmentsTable.select.table',
		},
		techMapsTable: {
			name: 'Реестр технологических карт',
			address: 'rtd.controlPoints.form.techMapsTable',
		},
		techMapsTableModal: {
			name: 'Реестр выбора оборудования',
			address: 'rtd.controlPoints.form.techMapsTable.select',
		},
		techMapsSelectOnSave: {
			name: 'Сохранение при выборе',
			address: 'rtd.controlPoints.form.techMapsTable.select.onSave',
		},
		techMapsSelectOnSearch: {
			name: 'Поиск при выборе',
			address: 'rtd.controlPoints.form.techMapsTable.select.onSearch',
		},
		techMapsSelectTable: {
			name: 'Реестр при выборе',
			address: 'rtd.controlPoints.form.techMapsTable.select.table',
		},
	};

	const nodeByTree = (title, size = 5) => (
		<Popover
			trigger='hover'
			placement='topLeft'
			content={
				<div className={'popContainer'}>
					<div>{descInfo[title]?.name}</div>
					<div className={'popAddressLine'}>
						{descInfo[title]?.address}
					</div>
				</div>
			}
			overlayClassName={`mi-map-popover-hover`}
		>
			<Title level={size}>
				{descInfo[title]?.address.split('.').pop()}
			</Title>
		</Popover>
	);

	const mapData = [
		{
			title: nodeByTree('rtd', 3),
			key: 'rtd',
			children: [
				{
					title: nodeByTree('controlPoints', 4),
					key: 'rtd.controlPoints',
					children: [
						{
							title: nodeByTree('controlPointsTable'),
							key: 'rtd.controlPoints.table',
							children: [
								{
									title: nodeByTree('controlPointsTableRows'),
									key: 'rtd.controlPoints.table.rows',
								},
								{
									title: nodeByTree(
										'controlPointsTableSelected'
									),
									key: 'rtd.controlPoints.table.selected',
								},
								{
									title: nodeByTree(
										'controlPointsTableEvents'
									),
									key: 'rtd.controlPoints.table.events',
									children: [
										{
											title: nodeByTree('onRowClick'),
											key: 'rtd.controlPoints.table.events.onRowClick',
										},
										{
											title: nodeByTree(
												'onRowDoubleClick'
											),
											key: 'rtd.controlPoints.table.events.onRowDoubleClick',
										},
										{
											title: nodeByTree('addOnModal'),
											key: 'rtd.controlPoints.table.events.addOnModal',
										},
										{
											title: nodeByTree('editOnModal'),
											key: 'rtd.controlPoints.table.events.editOnModal',
										},
										{
											title: nodeByTree(
												'addOnGroupModal'
											),
											key: 'rtd.controlPoints.table.events.addOnGroupModal',
										},
										{
											title: nodeByTree(
												'editOnGroupModal'
											),
											key: 'rtd.controlPoints.table.events.editOnGroupModal',
										},
										{
											title: nodeByTree('deleteOnModal'),
											key: 'rtd.controlPoints.table.events.deleteOnModal',
										},
										{
											title: nodeByTree('onSearch'),
											key: 'rtd.controlPoints.table.events.onSearch',
										},
										{
											title: nodeByTree('onReload'),
											key: 'rtd.controlPoints.table.events.onReload',
										},
									],
								},
							],
						},
						{
							title: nodeByTree('controlPointsForm'),
							key: 'rtd.controlPoints.form',
							children: [
								{
									title: nodeByTree('equipmentsTable'),
									key: 'rtd.controlPoints.form.equipmentsTable',
									children: [
										{
											title: nodeByTree(
												'equipmentsTableOnDelete'
											),
											key: 'rtd.controlPoints.form.equipmentsTable.onDelete',
										},
										{
											title: nodeByTree(
												'equipmentsTableModal'
											),
											key: 'rtd.controlPoints.form.equipmentsTable.select',
											children: [
												{
													title: nodeByTree(
														'equipmentsSelectOnSave'
													),
													key: 'rtd.controlPoints.form.equipmentsTable.select.onSave',
												},
												{
													title: nodeByTree(
														'equipmentsSelectOnSearch'
													),
													key: 'rtd.controlPoints.form.equipmentsTable.select.onSearch',
												},
												{
													title: nodeByTree(
														'equipmentsSelectTable'
													),
													key: 'rtd.controlPoints.form.equipmentsTable.select.table',
												},
											],
										},
									],
								},
								{
									title: nodeByTree('techMapsTable'),
									key: 'rtd.controlPoints.form.techMapsTable',
									children: [
										{
											title: nodeByTree(
												'techMapsTableOnDelete'
											),
											key: 'rtd.controlPoints.form.techMapsTable.onDelete',
										},
										{
											title: nodeByTree(
												'techMapsTableModal'
											),
											key: 'rtd.controlPoints.form.techMapsTable.select',
											children: [
												{
													title: nodeByTree(
														'techMapsSelectOnSave'
													),
													key: 'rtd.controlPoints.form.techMapsTable.select.onSave',
												},
												{
													title: nodeByTree(
														'techMapsSelectOnSearch'
													),
													key: 'rtd.controlPoints.form.techMapsTable.select.onSearch',
												},
												{
													title: nodeByTree(
														'techMapsSelectTable'
													),
													key: 'rtd.controlPoints.form.techMapsTable.select.table',
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
	];
	return (
		<BasePage style={{alignItems: 'start'}}>
			<Title level={3} className={'ml-16'}>
				Дерево STORE проекта MI
			</Title>
			<Space>
				<Tree treeData={mapData} />
			</Space>
		</BasePage>
	);
};
