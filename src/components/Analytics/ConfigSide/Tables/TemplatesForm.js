import React from 'react';
import {Layout, Space, Title, FormItems} from 'rt-design';
import {paths} from '../../../../constants/paths';
import {LeftOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router';
import {parseById} from './parseFunc';


export const TemplatesForm = ({analyticId, fields}) => {

	const history = useHistory();

	const onBackPage = () => history.push(`${paths.ANALYTICS_MAIN.path}`);

	

	return (
		<Layout>
			<div style={{display: 'flex', margin: '12px 0'}}>
				<Space
					style={{position: 'absolute', cursor: 'pointer'}}
					className={'ant-typography ant-typography-secondary'}
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
			{fields && (
				<FormItems
					className={'mt-0'}
					items={parseById(fields)}
          dispatch={{
            path:'1'
          }}
				/>
			)}
		</Layout>
	);
};
