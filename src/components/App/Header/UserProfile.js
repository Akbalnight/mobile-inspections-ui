import React from 'react';
import withAuth from '../Auth/withAuth';
import {logoutUrl} from '../../../constants/auth.constants';

const UserProfile = props => {
	return (
		<div>
			<div>{`Username: ${props.auth.username}`}</div>
			<div>
				<a
					href={logoutUrl}
					onClick={() => {
						props.setUser({});
						console.log('Clear store');
					}}
				>
					Выход
				</a>
			</div>
		</div>
	);
};

UserProfile.propTypes = {};

export default withAuth(UserProfile);
