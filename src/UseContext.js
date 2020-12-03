import React, {useContext} from 'react';
import Context from './Context'

const UseContext = () => {
    const DIRECTION = useContext(Context);
    return (
        <div>
            <button onClick={() => console.log(DIRECTION)}>log context</button>
            <button onClick={() => {DIRECTION.left = 200}}> change direction</button>
        </div>
    );
}

export default UseContext;