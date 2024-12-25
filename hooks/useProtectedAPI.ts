import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";
import { Daum } from "../types/search-results";
import { DirectionType } from "../enums/direction-type";
import { getRefreshToken } from "../store/actions/refreshTokenLogin";

type ItemScreenNavigationProp = StackNavigationProp<any, 'Item'>;

let globalAction: UnknownAction;
let globalItem: Daum | null;
let globalDirection: DirectionType;
let globalUrlAddr: string;

const useProtectedAPI = () => {
    const loginResponseData = useSelector(state => (state as unknown as any).LoginResponse);
    const dispatch = useDispatch();
    const errorData = useSelector(state => (state as unknown as any).ErrorResponse);
    const navigation = useNavigation<ItemScreenNavigationProp>();
    const route = useRoute();

    /**
     * checks if have token - if not then goto login screen
     * @param action - redux action to be dispatch
     * @param item - parameters for the disaptch action
     * @param direction - defines where will you go after successful login: backword of forward
     * @param urlAddr - URL API to be send after successful request
     */
    const dispatchAction = async (action: UnknownAction, item: Daum | null, direction: DirectionType, urlAddr: string) => {
        globalAction = action;
        globalItem = item;
        globalDirection = direction;
        globalUrlAddr = urlAddr;

        if (loginResponseData.loginResponse?.data?.access_token && 
            loginResponseData.loginResponse?.data?.refresh_token && 
            loginResponseData.loginResponse?.data?.token_type) {
            action.authorization = loginResponseData.loginResponse?.data?.token_type + ' ' + loginResponseData.loginResponse?.data?.access_token;
            if (item) {
                urlAddr = urlAddr.replace('<id>', item?.id);
            }
            
            action.url = `${process.env.REACT_APP_BASE_URL}${urlAddr}`;
            dispatch(action);
        } else {
            // navigation.navigate('Login', {item: item, sourcePage: route.name, direction: direction, action: action, urlAddr: urlAddr});
            // TODO - here open modal window
        }
    };

    // gets answer from login screen
    useEffect(() => {
        if (route.params) {
          if ((route.params as any).response && (route.params as any).item && (route.params as any).action) {
            const response = (route.params as any).response;
            const action = (route.params as any).action;
            const urlAddr = (route.params as any).urlAddr;

            action.authorization = response.token_type + ' ' + response.access_token;
            action.url = `${process.env.REACT_APP_BASE_URL}${urlAddr}`;
            dispatch(action);
          }
        }
    }, [route.params]);

    /**
     * error handling in send request
     */
    useEffect(() => {
        const errorMsg = errorData.error;
        if (errorMsg instanceof Error) {
            const error: Error = errorMsg;
            if (error.name === 'AxiosError' && error.message === 'Request failed with status code 401') {
                if (loginResponseData.loginResponse?.data?.refresh_token) {
                    const action = {
                        refreshToken: loginResponseData.loginResponse?.data?.refresh_token
                    }
                    // console.log('call refresh...', action);
                    dispatch(getRefreshToken(action));
                }
            } else if (error.name === 'AxiosError' && error.message === 'Request failed with status code 400') {
                navigation.navigate('Login', {item: globalItem, sourcePage: route.name, direction: globalDirection, action: globalAction, urlAddr: globalUrlAddr});
            } else {
                // console.log('other error:', error.name, error.message);
            }
        } else {
            if (errorMsg?.error) {
                console.error('Invalid error object:', errorMsg?.error);
            }
            
        }
    }, [errorData.error]);

    /**
     * success refresh login call 
     */
    useEffect(() => {
        
        if (loginResponseData.loginResponse.config?.data.toString().indexOf('refresh_token') > 0) {
            console.log('success refresh login call', loginResponseData.loginResponse);
            // TODO - now redispatch the API defined

        }
    }, [loginResponseData.loginResponse]);

    return { dispatchAction };
}

export { useProtectedAPI };

