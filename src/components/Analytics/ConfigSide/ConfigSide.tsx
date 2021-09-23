import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {
	Button,
	Form,
	FormBody,
	FormFooter,
	Layout,
	notificationError,
	setDataStore,
	Space,
	SubscribeOnChangeOptions,
	Title,
} from 'rt-design';
import {apiGetFlatDataByConfigName} from '../../../apis/application.api';
import {genericRequest} from '../../../apis/network';
import {TemplatesTableHeader} from '../tableProps';
import {TemplatesForm} from './Tables/TemplatesForm';
import {TemplatesTable} from './Tables/TemplatesTable';

interface SVarObject {
	typeExecutor: string;
	body?: {
		base?: {
			fileName?: string;
			reportId?: string;
			headerStyle?: {
				border?: {
					top: boolean;
					bottom: boolean;
					right: boolean;
					left: boolean;
				};
				font?: {
					size: number;
					bold: boolean;
				};
			};
			cellStyle?: {
				border: {right: boolean; bottom: boolean; left: boolean};
			};
		};
		filter?: any;
	};
	output?: string;
}

export const ConfigSide = ({analyticId}: {analyticId: string}) => {

const dispatch =useDispatch()

	const loadData = (callBack: (params: any) => void) => {
		return callBack(analyticId ? {id: analyticId} : null); //??
	};

	const pushOnButton = ({value, extraData}: SubscribeOnChangeOptions) => {
		const {templates, name} = extraData;

		let tmpObj: any = {
			typeExecutor: 'saveVar',
			body: {
				base: {
					fileName: `${name} JS{new Date().toLocaleString()}JS.xlsx`,
					reportId: analyticId,
					headerStyle: {
						border: {
							top: true,
							right: true,
							bottom: true,
							left: true,
						},
						font: {size: 12, bold: true},
					},
					cellStyle: {
						border: {right: true, bottom: true, left: true},
					},
				},
				filter: {},
			},
			output: 'configData',
		};

		for (let key in value.extraData) {
			if (typeof value.extraData[key] === 'object') {
				tmpObj.body.filter[key] = value.extraData[key].format();
			} else {
				tmpObj.body.filter[key] = value.extraData[key];
			}
		}

		genericRequest({
			url: `/api/dynamicdq/task/sync`,
			method: 'POST',
			data: [tmpObj, ...templates],
		})
			.then((r) => {
				console.log('onClickButton', r);
        setTimeout(() => {
          dispatch(setDataStore('analytics.form.events.onReload',{}))
        }, 1000);
			})
			.catch((error) =>
				notificationError(error, 'Ошибка при выполнении')
			);
	};

	const footer = analyticId ? (
		<Space
			style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}
		>
			<Button
				dispatch={{
					path: 'analytics.form.events.onReload',
				}}
			>
				Сбросить
			</Button>
			<Button
				type={'primary'}
				htmlType={'submit'}
				dispatch={{
					path: 'analytics.form.events.onSubmit',
					extraData: 'rtd.analytics.filter.data',
					type: 'event',
				}}
				subscribe={[
					{
						name: 'itselfSubscribe',
						path: 'rtd.analytics.form.events.onSubmit',
						extraData: 'rtd.analytics.form.templates',
						onChange: pushOnButton,
					},
				]}
			>
				Сформировать
			</Button>
		</Space>
	) : null;

	return (
		<Form name={'configForm'} loadInitData={loadData}>
			<FormBody
				scrollable={false}
				noPadding={true}
				style={{padding: '0 24px 24px 24px'}}
			>
				{analyticId ? (
					<TemplatesForm analyticId={analyticId} />
				) : (
					<>
						<Title
							level={4}
							style={{padding: '24px 24px 10px 24px'}}
						>
							Отчет
						</Title>
						<Layout>
							<TemplatesTableHeader />
							<TemplatesTable />
						</Layout>
					</>
				)}
			</FormBody>
			<FormFooter>{footer}</FormFooter>
		</Form>
	);
};
