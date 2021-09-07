import React from 'react';
import {
	Form,
	FormBody,
	Layout,
	Space,
	Button,
	Title,
	FormItems,
	FormFooter,
} from 'rt-design';

import {TemplatesForm} from './Tables/TemplatesForm';
import {TemplatesTableHeader} from '../tableProps';
import {TemplatesTable} from './Tables/TemplatesTable';

export const ConfigSide = ({analyticId}: {analyticId: string}) => {
	const loadData = (callBack: (params: any) => void) => {
		return callBack(analyticId ? {filterConfig: analyticId} : null);
	};

	const content = analyticId ? (
		<TemplatesForm analyticId={analyticId} />
	) : (
		<>
			<Title level={4} style={{padding: '24px 24px 10px 24px'}}>
				Отчет
			</Title>
			<Layout>
				<TemplatesTableHeader />
				<TemplatesTable />
			</Layout>
		</>
	);

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
				{content}
			</FormBody>
			<FormFooter>{footer}</FormFooter>
		</Form>
	);
};
