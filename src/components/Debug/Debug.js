import React from 'react';
import DebugChild from "./DebugChild";

const Debug = props => {
    // const [childRef, setChildRef] = useState({});

    // const _setTableRef = (ref) => setChildRef(ref);

    let childRef = React.createRef();

    return (
        <div>
            Debug parent
            <button
                onClick={() => {
                    console.log("childRef", childRef);
                    childRef.current.setChildText("Text from parent")
                }}
            >Click</button>
            <button
                onClick={() => {
                    console.log("childRef", childRef);
                    childRef.current.setDefText()
                }}
            >Click2</button>
            <DebugChild
                ref={childRef}
            />
        </div>
    );
};

Debug.propTypes = {

};

export default Debug;
