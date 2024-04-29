import { ActionTypes } from "../../enums/action-types";
import { Daum } from "../../types/search-results";
import { ADD_MANGA_TO_FAVORITES } from "../action-type";

export function mangaToFavorites(item: Daum, actionType: ActionTypes) {
    return { type: ADD_MANGA_TO_FAVORITES, params: item, actionType: actionType };
}