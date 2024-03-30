import { GET_SIMPLE_SEARCH, GET_SIMPLE_SEARCH_LOADED } from "../action-type";

export function getSimpleSearch() {
    const params = {
        "includes[]": ['author', 'artist', 'cover_art', 'description']
    };
    
    return { type: GET_SIMPLE_SEARCH, url: '/manga', target: GET_SIMPLE_SEARCH_LOADED, params: params };
}