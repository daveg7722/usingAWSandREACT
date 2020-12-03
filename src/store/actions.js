// const INCREMENT = 'INCREMENT';

// const incrementAge_sync = (payload) => {
//      return {
//          type: INCREMENT,
//          payload
//      }
// };

// export const incrementAge_async = (payload) => {    
//     return dispatch => {
//         setTimeout(() => {
//             console.log("in settimeout");
//             dispatch(incrementAge_sync(payload))
//         }, 2000);        
//     };
// };

import {SUBMIT_QUERY, SUBMIT_SORTBY, SUBMIT_FILTER, SUBMIT_SEARCH} from './actionTypes'

export const submitSearch = payload => {
    return {
        type: SUBMIT_SEARCH,
        payload
    }
}

export const submitFilter = payload => {
    return {
        type: SUBMIT_FILTER,
        payload
    }
}

export const submitQuery = payload => {
    return {
        type: SUBMIT_QUERY,
        payload
    }
};

export const submitSortBy = payload => {
    return {
        type: SUBMIT_SORTBY,
        payload
    }
}


// export const submitQuery_async = payload => {
//     return dispatch => {
//         dispatch(submitQuery_sync(payload));
//     }
// };
