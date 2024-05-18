import { ActionTypes } from "../enums/action-types";
import { Daum } from "./search-results";

export interface DispatchFromPropsItem {
    type: string;
    params: Daum;
    actionType: ActionTypes;
}