import { Method } from "../../enums/method";
import { GET_READ_LIST, GET_READ_LIST_LOADED } from "../action-type";

export function getReadList(status: 'reading' | 'on_hold' | 'dropped' | 'plan_to_read' | 'completed' | 're_reading', authorization: string, url: string) {
    const params = {
        status: status
    }

    return { type: GET_READ_LIST, url: url, target: GET_READ_LIST_LOADED, params: params, method: Method.POST, authorization: authorization };
}
