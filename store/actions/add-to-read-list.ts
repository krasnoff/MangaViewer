import { Method } from "../../enums/method";
import { ADD_TO_READ_LIST_LOADED, POST_ADD_TO_READ_LIST } from "../action-type";

export function addToReadList(status: 'reading' | 'on_hold' | 'dropped' | 'plan_to_read' | 'completed' | 're_reading', authorization: string, url: string) {
    const params = {};

    const data = {
        status: status
    }

    return { type: POST_ADD_TO_READ_LIST, url: url, target: ADD_TO_READ_LIST_LOADED, params: params, data: data, method: Method.POST, authorization: authorization };
}