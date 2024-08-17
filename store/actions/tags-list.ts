import { GET_TAGS_LIST, TAGS_LIST_LOADED } from "../action-type";


export function getTagsList() {
    return { type: GET_TAGS_LIST, url: `/manga/tag`, target: TAGS_LIST_LOADED };
}