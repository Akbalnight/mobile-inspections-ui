import React, {useEffect, useState} from 'react';
import withAuth from "./withAuth";
import {parseQueryParams} from "../../../utils/baseUtils";
import {accessTokenRequest} from "../../../apis/auth.api";
import {paths} from "../../../constants/paths";
import {setCookie} from "../Cookie/cookie";

const AuthorizationCode = props => {
    const [loading, setLoading] = useState(false);

    const { location, history} = props;

    let queryParams = parseQueryParams(location.search);
    // console.log("location search", location, queryParams);
    // console.log("AuthorizationCode props", props);

    useEffect(() => {
        if(queryParams?.code && !loading) {
            setLoading(true);
            accessTokenRequest(queryParams.code)
                .then((response) => {
                    if(response.status === 200) {
                        console.log("Token response then", response);

                        // Save to redux-store and localStorage
                        props.setUser(response.data);

                        // Save to cookies
                        setCookie('code_challenge', response.data.code_challenge, { path: '/' });

                        // Finish loading token
                        setLoading(false);

                        // Redirect to main page
                        history.push(paths.HOME.path)
                    } else {
                        console.log("Token response error", response.status);
                    }
                })
                .catch((error) => {
                    console.log("Token error", error);
                })
        }
    }, []);
    return null;
};

AuthorizationCode.propTypes = {

};

export default withAuth(AuthorizationCode);
