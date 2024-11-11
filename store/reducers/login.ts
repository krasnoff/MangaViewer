import { LOGIN_LOADED } from "../action-type";
import initialState from "../state";

const LoginReducer = (state = initialState, action: any) => {
    if (action.type == LOGIN_LOADED) {
        return Object.assign({}, state, {
            loginResponse: state.loginResponse = action.payload
        });
    }

    return state;
}

export default LoginReducer;