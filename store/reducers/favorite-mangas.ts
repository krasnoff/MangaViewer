import { ActionTypes } from "../../enums/action-types";
import { Daum } from "../../types/search-results";
import { ADD_MANGA_TO_FAVORITES } from "../action-type";
import initialState from "../state";

const mangaToFavoritesReducer = (state = initialState, action: any) => {
    if (action.type == ADD_MANGA_TO_FAVORITES) {
        if (action.actionType === ActionTypes.ADD) {
            return Object.assign({}, state, {
                favoriteMangas: [...state.favoriteMangas, action.params]
            });
        } else if (action.actionType === ActionTypes.REMOVE) {
            return Object.assign({}, state, {
                favoriteMangas: [...state.favoriteMangas.filter(el => (el as Daum).id !== (action.params as Daum).id)]
            });
        }
    }

    return state;
}

export default mangaToFavoritesReducer;