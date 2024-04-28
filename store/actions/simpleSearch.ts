import { GET_SIMPLE_SEARCH, PARSE_SIMPLE_SEARCH } from "../action-type";

interface Params {
    "includes[]": string[];
    "contentRating[]": string[];
    title?: string | undefined
}

export function getSimpleSearch(searchWord?: string) {
    let params: Params = {
        "includes[]": ['author', 'artist', 'cover_art', 'description'],
        "contentRating[]": ['safe']
    };

    if (searchWord) {
        params = {...params, title: searchWord}
    }
    
    return { type: GET_SIMPLE_SEARCH, url: '/manga', target: PARSE_SIMPLE_SEARCH, params: params };
}