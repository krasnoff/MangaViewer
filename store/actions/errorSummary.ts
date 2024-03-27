import { API_ERRORED } from "../action-type";

export function getErrorSummary(errorMessage: string) {
    return { type: API_ERRORED,  payload: {message: errorMessage}};
}