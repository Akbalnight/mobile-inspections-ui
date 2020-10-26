import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';

const Debug = () => {
	const formConfig = {
		noPadding: true,
		body: [],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
};

Debug.propTypes = {};

export default Debug;
