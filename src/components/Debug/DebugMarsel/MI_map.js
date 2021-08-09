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
			name: 'Событие по обному клику',
			address: 'rtd.controlPoints.table.events.onRowClick',
		},
		onRowDoubleClick: {
			name: 'Событие по обному клику',
			address: 'rtd.controlPoints.table.events.onRowDoubleClick',
		},
		addOnModal: {
			name: 'Событие по обному клику',
			address: 'rtd.controlPoints.table.events.addOnModal',
		},
		editOnModal: {
			name: 'Событие по обному клику',
			address: 'rtd.controlPoints.table.events.editOnModal',
		},
		addOnGroupModal: {
			name: 'Событие по обному клику',
			address: 'rtd.controlPoints.table.events.addOnGroupModal',
		},
		editOnGroupModal: {
			name: 'Событие по обному клику',
			address: 'rtd.controlPoints.table.events.editOnGroupModal',
		},
		deleteOnModal: {
			name: 'Событие по обному клику',
			address: 'rtd.controlPoints.table.events.deleteOnModal',
		},
		onSearch: {
			name: 'Событие по обному клику',
			address: 'rtd.controlPoints.table.events.onSearch',
		},
		onReload: {
			name: 'Событие по обному клику',
			address: 'rtd.controlPoints.table.events.onReload',
		},
		controlPointsForm: {
			name: 'Контрольные точки, форма создания/редактирования',
			address: 'rtd.controlPoints.form',
		},
	};

	const nodeByTree = (title, size = 5) => (
		<Popover
			trigger='hover'
			placement='topLeft'
			content={
				<>
					<div style={{width: '200px', whiteSpace: 'pre-line'}}>
						{descInfo[title]?.name}
					</div>
					<div style={{width: '200px', wordBreak: 'break-all'}}>
						{descInfo[title]?.address}
					</div>
				</>
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
									],
								},
							],
						},
						{
							title: nodeByTree('controlPointsForm'),
							key: 'rtd.controlPoints.form',
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
