import React from 'react';
import BasePage from '../App/BasePage';
import {Form} from 'rt-design';

const Debug = () => {
	const formConfig = {
		noPadding: true,
		body: []
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
};

Debug.propTypes = {};

export default Debug;
