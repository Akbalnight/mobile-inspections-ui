import React from 'react';
import PropTypes from 'prop-types';

import {version} from '../../../../package.json';

const Help = () => {
    return (
        <div>
            <div>Версия: {version}</div>
        </div>
    );
};

Help.propTypes = {

};

export default Help;
