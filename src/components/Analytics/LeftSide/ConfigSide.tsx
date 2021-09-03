import React from 'react';
import {
	Form,
	FormBody,
	Layout,
	Space,
	Button,
	Title,
	List,
	FormFooter,
} from 'rt-design';
import {Link, useLocation} from 'react-router-dom';
import {paths} from '../../../constants/paths';
import {analyticConfigs} from '../Registry/analyticConfigs';
import {TemplatesForm} from './Tables/TemplatesForm';
import {TemplatesTableHeader} from '../tableProps';
import {TemplatesTable} from './Tables/TemplatesTable';

export const ConfigSide = ({analyticId}: {analyticId: string}) => {
	let {pathname} = useLocation();

	const loadData = (callBack: (params: any) => void) => {
		return callBack(analyticId ? {NEW_NAME: analyticId} : null);
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
			// className={'p-8'}
			style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}
		>
			<Button>Сбросить</Button>
			<Button type={'primary'} htmlType={'submit'}>
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
