import { call, put, takeEvery } from "redux-saga/effects";
import { API_ERRORED, GET_CHAPTERS, GET_FEED, GET_SIMPLE_SEARCH, GET_TAGS_LIST } from "../action-type";
import axios from "axios";
import { APIParams } from "../../types/api-params";

export default function* watcherSaga() {
    yield takeEvery(GET_SIMPLE_SEARCH, workerSaga);
    yield takeEvery(GET_FEED, workerSaga);
    yield takeEvery(GET_CHAPTERS, workerSaga);
    yield takeEvery(GET_TAGS_LIST, workerSaga);
}

/**
 * See {@link MyClass} and [MyClass's foo property]{@link MyClass#foo}.
 * Also, check out {@link http://www.google.com|Google} and
 * {@link https://github.com GitHub}.
 * @param {*} args 
 */
function* workerSaga(args: any): any {
    try {
        const payload = yield call(getDataSaga, args);
        yield put({ type: args.target, payload });
    } catch (e) {
        yield put({ type: API_ERRORED, payload: e });
    }
}

function getDataSaga(args: any): Promise<any> {
    let url = args.url;
    
    const apiParams: APIParams = {
        method: args.method || 'GET',
        url: url.startsWith('https://') ? url : `${process.env.REACT_APP_BASE_URL}${url}`
    }

    if (args.method !== 'POST' && args.params) {
        apiParams['params'] = args.params;
    }

    if (args.method === 'POST' && args.data) {
        apiParams['data'] = args.data;
    }

    return axios(apiParams);
}