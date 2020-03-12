import AsyncStorage from '@react-native-community/async-storage';

/**
* This method will store the username into the system storage
* and can be accessed for later use
*
* @param username -  the username of a user
*/
export const storeUsername = async (username: string) => {
    try {
        await AsyncStorage.setItem('cameraAppUsername', username);
    } catch (err) {
        console.log('The following went wrong in the SignIn component: ', err);
    }
};


/**
 * This method will try to retrieve the username stored in the application
 */
export const getStoredUsername = async () => {
    let username;
    try {
        username = await AsyncStorage.getItem('cameraAppUsername');
    } catch (err) {
        console.log('The following went wrong with retrieving the username:', err);
    }
    return username;
};

/**
 * This method will remove the username from system storage
 */
export const clearUserFromStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (err) {
        console.log('The following went wrong with clearing the username', err);
    }
    console.log('Succesful cleared username from storage');
};