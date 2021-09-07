import React from 'react';
import {reloadFilterFields} from '../../../Base/Functions/ReloadField';
import {
	disabledEndDate,
	disabledStartDate,
} from '../../../Base/Functions/DateLimits';
import {
	apiGetFlatDataByConfigName,
	apiGetHierarchicalDataByConfigName,
} from '../../../../apis/catalog.api';
import {StatusIcon} from '../../../Defects/tableProps';
import {FolderOutlined, ToolOutlined} from '@ant-design/icons';

const chooseSubscribe = (object: any) => {
	let subArr: any[] = [];

	Object.keys(object).map((el: any) => {
		if (el === 'reload') {
			subArr.push(reloadFilterFields('analytics.form.events.onReload'));
		} else if (el === 'dateStart') {
			subArr.push({
				name: 'finishDate',
				path: `rtd.analytics.filter.data.startDate`,
				onChange: ({
					value,
					setSubscribeProps,
				}: {
					value: any;
					setSubscribeProps: any;
				}) => {
					console.log(value);
					setSubscribeProps({
						disabledDate: (endValue: any) =>
							disabledEndDate(value, endValue),
					});
				},
			});
		} else if (el === 'dateFinish') {
			subArr.push({
				name: 'startDate',
				path: `rtd.analytics.filter.data.finishDate`,
				onChange: ({
					value,
					setSubscribeProps,
				}: {
					value: any;
					setSubscribeProps: any;
				}) => {
					setSubscribeProps({
						disabledDate: (startValue: any) =>
							disabledStartDate(startValue, value),
					});
				},
			});
		}
	});
	return subArr;
};

const chooseRequest = (configName: string) => {
	switch (configName) {
		case 'equipments':
			return ({data, params}: {data: any; params: any}) =>
				apiGetHierarchicalDataByConfigName(configName)({
					data: {...data, isGroup: true},
					params,
				});
		case 'defectTypical':
			return ({data, params}: {data: any; params: any}) =>
				apiGetFlatDataByConfigName(configName)({
					data: {...data, isGroup: false},
					params,
				});
		default:
			return apiGetFlatDataByConfigName(configName);
	}
};

const chooseOptionConverter = (configName: any) => {
	switch (configName) {
		case 'staff':
			return (option: any) => ({
				value: option.id,
				label: option.username,
			});
		case 'defectStatusesProcess':
			return (option: any) => ({
				label: (
					<>
						<StatusIcon
							statusId={option.id}
							keyToFind={'statusProcessId'}
						/>{' '}
						<span className={'ml-8'}>{option.name}</span>
					</>
				),
				value: option.id,
			});
		case 'equipments':
			return (option: any) => ({
				value: option.id, //change
				label: (
					<span>
						{option.isGroup ? <FolderOutlined /> : <ToolOutlined />}{' '}
						{option.techPlacePath}
					</span>
				),
				children: option.children,
			});
		default:
			return (option: any) => ({
				value: option.id,
				label: option.name,
			});
	}
};

export const parseById = (items: any) =>
	items.map((item: any) => {
		if (item.loadRows) {
			item.requestLoadRows = chooseRequest(item.loadRows);
			item.optionConverter = chooseOptionConverter(item.loadRows);
		}
		if (item.subscribe) {
			item.subscribe = chooseSubscribe(item.subscribe);
		}
		if (item.children) {
			parseById(item.children);
		}
		return item;
	});
