import React, { useEffect, useState } from 'react';
import DiagramTree from './DiagramTree';
import './Container.scss';

import firstData from './Data/firstData.json';
import secondData from './Data/secondData.json';
import thirdData from './Data/thirdData.json';

const Container = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(firstData)
    }, []);

    return (
        <div className="main-container">
            <div className="diagram-container">
                {data ?
                    (<DiagramTree data={data} />)
                : null}
            </div>
            <div className="button-container">
                <button className="btn-first" onClick={() => setData(firstData)}>Set First Stage</button>
                <button className="btn-second" onClick={() => setData(secondData)}>Set Second Stage</button>
                <button className="btn-third" onClick={() => setData(thirdData)}>Set Third Stage</button>
            </div>
        </div>
    )

}

export default Container;