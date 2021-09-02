import React from 'react';
import {Form, FormBody, Layout, Table, Title, List} from 'rt-design';
import {Link, useLocation} from 'react-router-dom';
import {paths} from '../../../constants/paths';
import {analyticConfigs} from '../Registry/analyticConfigs';
import {TemplatesForm} from './Tables/TemplatesForm';

export const ConfigSide = ({analyticId}: {analyticId: string}) => {
	let {pathname} = useLocation();

	const loadData = (callBack: (params: any) => void) => {
		return callBack(analyticId ? {NEW_NAME: analyticId} : null);
	};

	const content = analyticId ? (
		<TemplatesForm analyticId={analyticId} />
	) : (
		<>
			<Title level={5} style={{padding: '24px 24px 10px 24px'}}>
				Выберите шаблон отчета
			</Title>
			<Layout>
				<List
					dataSource={analyticConfigs(paths)}
					itemLayout={'vertical'}
					renderItem={(item) => (
						<li
							className={
								pathname === item.path ? 'activeItem' : ''
							}
						>
							<Link to={item.path} className={'analyticLink'}>
								{item.title}
							</Link>
						</li>
					)}
				/>
			</Layout>
		</>
	);

	return (
		<Form name={'configForm'} loadInitData={loadData}>
			<FormBody
				scrollable={false}
				noPadding={true}
				// style={{padding: '0 24px 24px 24px'}}
			>
				{content}
			</FormBody>
		</Form>
	);
};
