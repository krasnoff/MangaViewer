import { ActionTypes } from "../enums/action-types";
import { Daum } from "./search-results";

export interface DispatchFromPropsItem {
    params: Daum;
    actionType: ActionTypes;
}