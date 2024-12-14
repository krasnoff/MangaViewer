import { LOGIN_LOADED, RESET_LOGIN } from "../action-type";

export const resetLoginThunk = () => async (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
        // Dispatch an action to indicate a request is starting
        dispatch({ type: RESET_LOGIN });

        // Simulate an asynchronous operation
        const result = {
            error: null,
            result: []
        }

        // Dispatch an action to update the state
        dispatch({ type: LOGIN_LOADED, payload: result });

        // Resolve the promise when the state is successfully updated
        resolve(result);
        
    });
};