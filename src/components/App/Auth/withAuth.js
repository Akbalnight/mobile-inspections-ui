import React from 'react'
import {connect} from "react-redux";
import {setUser} from "../../../actions/auth";
import {withRouter} from "react-router";

const withAuth = (Component) => {
    return withRouter(connect(mapStateToProps, {setUser})(
        props => {
            return <Component {...props} />
        }
    ))
};

const mapStateToProps = (store) => {
    return {
        auth: store.auth
    };
};

export default withAuth;
