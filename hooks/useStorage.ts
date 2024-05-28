import AsyncStorage from "@react-native-async-storage/async-storage";
import { Daum } from "../types/search-results";
import { ActionTypes } from "../enums/action-types";

const useStorage = () => {
        
    const storeData = (key: string, data: any) => {
        const jsonData = JSON.stringify(data);
        return AsyncStorage.setItem(key, jsonData);
    };

    const loadData = (key: string) => {
        return AsyncStorage.getItem(key);
    }

    /**
     * here we save to presistant / local when user adds or removes an item from the favorite list
     */
    const dispatchFromPropsFunc = (item: Daum, actionType: ActionTypes, favorateMangaDataIDs: string[]) => {
        const favorateMangaDataIDsNew = JSON.parse(JSON.stringify(favorateMangaDataIDs)) as string[];
        const isLargeNumber = (element: any) => element === item.id;
        const selectedIndex = favorateMangaDataIDsNew.findIndex(isLargeNumber);
        if (actionType === ActionTypes.ADD) {
          if (selectedIndex === -1) {
            favorateMangaDataIDsNew.push(item.id)
          }
        } else if (actionType === ActionTypes.REMOVE) {
          if (selectedIndex > -1) {
            favorateMangaDataIDsNew.splice(selectedIndex, 1);
          }
        }
  
        return favorateMangaDataIDsNew;
    }
    
    return {storeData, loadData, dispatchFromPropsFunc};
}

export { useStorage };