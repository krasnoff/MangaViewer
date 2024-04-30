import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "react-native-storage";


export function useStorage() {
    const storage = new Storage({
        // maximum capacity, default 1000 key-ids
        size: 1000,
      
        // Use AsyncStorage for RN apps, or window.localStorage for web apps.
        // If storageBackend is not set, data will be lost after reload.
        storageBackend: AsyncStorage, // for web: window.localStorage
      
        // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
        // can be null, which means never expire.
        defaultExpires: null,
      
        // cache data in the memory. default is true.
        enableCache: true,
      
        // if data was not found in storage or expired data was found,
        // the corresponding sync method will be invoked returning
        // the latest data.
        sync: {
          // we'll talk about the details later.
        }
    });
    
    const storeData = (key: string, data: any) => {
        // Save something with key only. (using only a keyname but no id)
        // This key should be unique. This is for data frequently used.
        // The key and value pair is permanently stored unless you remove it yourself.
        return storage.save({
            key: key, // Note: Do not use underscore("_") in key!
            data: data
        });
    };

    const loadData = (key: string) => {
        return storage.load({
            key: key
        })
    }
    
    return {storeData, loadData};
}