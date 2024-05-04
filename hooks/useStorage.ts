import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
        
    const storeData = (key: string, data: any) => {
        const jsonData = JSON.stringify(data);
        // console.log('jsonData', data.length);
        return AsyncStorage.setItem(key, jsonData);
    };

    const loadData = (key: string) => {
        return AsyncStorage.getItem(key);
    }
    
    return {storeData, loadData};
}

export { useStorage };