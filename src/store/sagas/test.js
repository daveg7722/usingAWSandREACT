import {put} from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'


export function* submitQuery(action) {
    yield console.log(action.payload);
    put ({
        type: actionTypes.SUBMIT_QUERY
    });
}

