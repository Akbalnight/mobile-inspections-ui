import React, {forwardRef, useState} from 'react';
import PropTypes from 'prop-types';

const DebugChild = forwardRef((props, ref) => {

// const DebugChild = props => {

    const [text, setText] = useState('Debug child');

    const setDefText = () => {
        setText('Debug child')
    };

    const setChildText = (whatThis) => {
        setText(whatThis)
    };

    ref.current = { setChildText, setDefText };

    return (
        <div>
            {text}
        </div>
    );
});

DebugChild.propTypes = {

};

export default DebugChild;
