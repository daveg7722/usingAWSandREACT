import {takeEvery, takeLatest} from 'redux-saga/effects'
import {submitQuery} from './test'
import * as actionTypes from '../actionTypes'

export function* watchSearch() {
    yield takeEvery(actionTypes.SUBMIT_QUERY, submitQuery)
}