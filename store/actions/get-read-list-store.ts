import { Method } from "../../enums/method";
import { GET_READ_LIST_STORED, READ_LIST_STORED_LOADED } from "../action-type";

export function getReadListStore(authorization: string) {
    const params = {};

    return { type: GET_READ_LIST_STORED, url: `/manga/status`, target: READ_LIST_STORED_LOADED, params: params, method: Method.GET, authorization: authorization };
}
