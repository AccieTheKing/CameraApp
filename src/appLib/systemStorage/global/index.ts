import AsyncStorage from '@react-native-community/async-storage';

/**
 * This method should be used as global functionality to store something into Async storage
 * 
 * @param key - the key that value is maped to
 * @param value - the value that is been referenced to with at key
 */
export const storeInGlobalStore = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('Something went wrong in the global store', error);
        throw error;
    }
}

export const fetchFromGlobalStore = async (key: string) => {
    let data;
    try {
        data = await AsyncStorage.getItem(key);
    } catch (err) {
        console.log(`The following went wrong with retrieving the ${key}:`, err.message);
    }
    return data;
}

export const deleteFromGlobalStore = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (err) {
        console.log(`The following went wrong with clearing the ${key}`, err);
        throw err;
    }
    console.log(`Succesful cleared ${key} from storage`);
}