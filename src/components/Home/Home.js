import React from 'react';
import {Result} from 'antd';
import {BasePage} from 'mobile-inspections-base-ui';
import {paths} from '../../constants/paths';
import {useRouteMatch} from 'react-router';

const Home = () => {
	let match = useRouteMatch();

	const title = () => {
		for (const pathItem in paths) {
			if (paths[pathItem].path === match.path)
				return paths[pathItem].title;
		}
	};
	return (
		<BasePage>
			<Result
				style={{flex: '1 1 auto'}}
				status='404'
				title='Делаем'
				subTitle={`Страница [${title()}] находится в другом измерении, мы заняты ее материализацией`}
				extra={
					<a
						style={{
							padding: '10px',
							background: '#1890ff',
							color: 'white',
						}}
						href={'https://www.youtube.com/user/AcademeG/videos'}
					>
						Тут интереснее
					</a>
				}
			/>
		</BasePage>
	);
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
