import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'antd';

const GroupViewModal = props => {

	const {
		title,
		visible,
		setVisible,
		rowData,
	} = props;

	return (
		<Modal
			title={title}
			centered
			visible={visible}
			okText='Ок'
			onCancel={() => setVisible(false)}
			onOk={() => setVisible(false)}
			// width={'1000px'}
			className={'TechMap-InfoModal'}
			footer={[
				<Button key={'ok'} type="primary" onClick={() => setVisible(false)}>
					Oк
				</Button>,
			]}
		>
			<div>
				<div className={'InfoItem'}>
					<div>Код</div>
					<div>{rowData.code}</div>
				</div>
				<div className={'InfoItem'}>
					<div>Наименование</div>
					<div>{rowData.name}</div>
				</div>
				<div className={'InfoItem'}>
					<div>Группа</div>
					<div>{ rowData.parentName ? rowData.parentName : '---' }</div>
				</div>
			</div>
		</Modal>
	);
};

GroupViewModal.propTypes = {
	title: PropTypes.string,
	visible: PropTypes.bool,
	setVisible: PropTypes.func,
	rowData: PropTypes.object,
};

export default GroupViewModal;
