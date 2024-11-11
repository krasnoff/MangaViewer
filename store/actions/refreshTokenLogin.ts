import { Method } from "../../enums/method";
import { RefreshTokenData } from "../../types/login-form-data";
import { LOGIN_LOADED, POST_LOGIN } from "../action-type";


export function getRefreshToken(refreshTokenData: RefreshTokenData) {
    const params = {};

    const data = {
        grant_type: 'refresh_token',
        refresh_token: refreshTokenData.refreshToken,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_SECRET2
    }
    
    return { type: POST_LOGIN, url: process.env.REACT_APP_AUTH_URL, target: LOGIN_LOADED, params: params, data: data, method: Method.POST };
}