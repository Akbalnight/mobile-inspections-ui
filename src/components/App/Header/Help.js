import React from 'react';
import {version} from '../../../../package.json';

const Help = () => {
    return (
        <div>
            <div>Версия: {version}</div>
        </div>
    );
};

Help.propTypes = {};

export default Help;
