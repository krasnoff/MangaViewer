import { GET_SIMPLE_SEARCH, GET_SIMPLE_SEARCH_LOADED } from "../action-type";

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
    
    return { type: GET_SIMPLE_SEARCH, url: '/manga', target: GET_SIMPLE_SEARCH_LOADED, params: params };
}