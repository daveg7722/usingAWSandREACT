import React from 'react'

const direction = {
    left: -1,
    none: 0,
    right: 1
}

let Direction = new Proxy(direction, {
    get(target, prop) {
        if(prop in target){
            return target[prop];
        } else {
            return 0;
        }
    },
    set(target, prop, val) { // to intercept property writing
        return false;
    }
});
const DIRECTION = React.createContext(Direction);

export default DIRECTION;