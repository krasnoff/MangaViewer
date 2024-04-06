import { CHAPTERS_LOADED, GET_CHAPTERS } from "../action-type";

export function getChapters(chapterId: string) {
    const params = {};
    
    return { type: GET_CHAPTERS, url: `/at-home/server/${chapterId}`, target: CHAPTERS_LOADED, params: params };
}