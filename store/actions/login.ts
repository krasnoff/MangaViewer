import { LoginFormData } from "../../types/login-form-data";
import { LOGIN_LOADED, POST_LOGIN } from "../action-type";


export function getLogin(loginFormData: LoginFormData) {
    const params = {};

    const data = {
        grant_type: 'password',
        username: loginFormData.email,
        password: loginFormData.password,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_SECRET
    }

    console.log('login data', data, process.env.REACT_APP_AUTH_URL)
    
    return { type: POST_LOGIN, url: process.env.REACT_APP_AUTH_URL, target: LOGIN_LOADED, params: params, data: data };
}