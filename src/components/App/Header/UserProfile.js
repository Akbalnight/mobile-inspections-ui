import React from 'react';
import withAuth from "../Auth/withAuth";
import {logoutUrl} from "../../../constants/auth.constants";

const UserProfile = props => {

    return (
        <span>
            <a
                href={logoutUrl}
                onClick={() => {
                    props.setUser({});
                    console.log("Clear store");
                }}
            >Выход</a>
        </span>
    );
};

UserProfile.propTypes = {

};

export default withAuth(UserProfile);
