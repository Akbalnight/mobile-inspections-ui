import React from 'react';
import {Layout, Space, Title, Button} from 'rt-design';
import {paths} from '../../../../constants/paths';
import {LeftOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router';
import {TemplatesTable} from './TemplatesTable';
import {TemplatesTableHeader} from '../../tableProps';
import {ConstructorFields} from './ConstructorFields';

export const TemplatesForm = ({analyticId}: {analyticId: string}) => {
	const history = useHistory();

	const onBackPage = () => history.push(`${paths.ANALYTICS_MAIN.path}`);
	return (
		<Layout>
			<div style={{display: 'flex', margin: '12px 0'}}>
				<Space
					style={{position: 'absolute', cursor: 'pointer'}}
					className={'ant-typography ant-typography-secondary ml-16'}
					onClick={onBackPage}
				>
					<LeftOutlined style={{fontSize: '16px'}} />
					<Title
						level={5}
						type='secondary'
						style={{marginBottom: '2px'}}
					>
						Назад
					</Title>
				</Space>
			</div>
			<Title level={5} className={'pt-16'}>
				Шаблоны отчетов
			</Title>
			<Layout style={{border: '1px solid #DFDFDF'}}>
				<TemplatesTableHeader />
				<TemplatesTable />
			</Layout>
			<Title level={5} className={'pt-16'}>
				Дополнительные параметры
			</Title>
			<Layout>
				<ConstructorFields />
			</Layout>
		</Layout>
	);
};
