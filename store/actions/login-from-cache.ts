import { LOGIN_LOADED } from "../action-type";

export function getLoginFromCache(loginFormData: any) {
    return { type: LOGIN_LOADED, payload: loginFormData };
}