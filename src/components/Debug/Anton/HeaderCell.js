import React from 'react';
import ColumnResizer from 'react-base-table/lib/ColumnResizer';

import PropTypes from 'prop-types';

const HeaderCell = (_handleColumnResize, width) => (props) => {
	console.log('header props', props);

	return (
		<th {...props} className={`${props.className}`}>
			<div>
				{props.children}
				{/*<ColumnResizer*/}
				{/*    className={'BaseTable__column-resizer'}*/}
				{/*    column={{width: width, maxWidth: 1000, minWidth: 100}}*/}
				{/*    // onResizeStart={_handleColumnResizeStart}*/}
				{/*    // onResizeStop={_handleColumnResizeStop}*/}
				{/*    onResize={_handleColumnResize}*/}
				{/*/>*/}
			</div>
		</th>
	);
};

HeaderCell.propTypes = {};

export default HeaderCell;
