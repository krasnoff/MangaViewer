import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";
import { Daum } from "../types/search-results";
import { DirectionType } from "../enums/direction-type";

type ItemScreenNavigationProp = StackNavigationProp<any, 'Item'>;

const useProtectedAPI = () => {
    const loginResponseData = useSelector(state => (state as unknown as any).LoginResponse);
    const dispatch = useDispatch();
    const errorData = useSelector(state => (state as unknown as any).ErrorResponse);
    const navigation = useNavigation<ItemScreenNavigationProp>();
    const route = useRoute();

    // checks if have token - if not then goto login screen
    const dispatchAction = (action: UnknownAction, item: Daum, direction: DirectionType) => {
        if (loginResponseData.loginResponse?.data?.access_token && 
            loginResponseData.loginResponse?.data?.refresh_token && 
            loginResponseData.loginResponse?.data?.token_type) {
            action.authorization = loginResponseData.loginResponse?.data?.token_type + ' ' + loginResponseData.loginResponse?.data?.access_token;
            action.url = `${process.env.REACT_APP_BASE_URL}/manga/${item?.id}/status`;
            dispatch(action);
        } else {
            navigation.navigate('Login', {item: item, sourcePage: route.name, direction: direction, action: action});
        }
    };

    // gets answer from login screen
    useEffect(() => {
        if (route.params) {
          if ((route.params as any).response && (route.params as any).item && (route.params as any).action) {
            const response = (route.params as any).response;
            const item = (route.params as any).item;
            const action = (route.params as any).action;

            action.authorization = response.token_type + ' ' + response.access_token;
            action.url = `${process.env.REACT_APP_BASE_URL}/manga/${item?.id}/status`;
            dispatch(action);
          }
        }
    }, [route.params]);

    /**
     * error handling in send request
     */
    useEffect(() => {
        console.log('errorData from hook', errorData.error)
    }, [errorData]);

    return { dispatchAction };
}

export { useProtectedAPI };

