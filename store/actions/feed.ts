import { FEED_PARSE, GET_FEED } from "../action-type";

export function getFeed(id: string) {
    const params = {
        "includeEmptyPages": 0
    };
    
    return { type: GET_FEED, url: `/manga/${id}/feed`, target: FEED_PARSE, params: params };
}