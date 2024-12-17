import { GET_READ_LIST_STORED, READ_LIST_STORED_LOADED } from "../action-type";

export function getReadListStore() {
    return { type: GET_READ_LIST_STORED, url: `/manga/list`, target: READ_LIST_STORED_LOADED };
}
