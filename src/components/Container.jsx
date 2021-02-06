import React, { useEffect, useState } from 'react';
import DiagramTree from './DiagramTree';

const Container = () => {
    // const [data, setData] = useState();

    // useEffect(() => {

    // }, []);

    return (
        <div className="diagram-container">
            <DiagramTree />
        </div>
    )

}

export default Container;