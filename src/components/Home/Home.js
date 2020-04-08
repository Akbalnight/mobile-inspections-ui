import React from 'react';
import {Result} from 'antd';
import BasePage from "../App/BasePage";

const Home = () => {
	return (
		<BasePage>
			<Result
				style={{flex: '1 1 auto'}}
				status='404'
				title='Делаем'
				subTitle='Мы очень стараемся, но пока не получается'
				extra={
					<a
						style={{
							padding: '10px',
							background: '#1890ff',
							color: 'white'
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
