import { EThree } from '@virgilsecurity/e3kit-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ipAddress } from '../../endPoints/index';

/**
 * This method will return the an initialised EThree instance and sets the
 * getTokenFactoryto equal to the getToken variable, a method which expects a paramerter as indentity
 *
 */
export const initializeUser = async (identity: string) => {
    const getToken = await getTokenFactory(identity);
    return EThree.initialize(getToken, { AsyncStorage });
};

/**
 * Method to get a JSON WEB TOKEN from the backend, the idententy is being encoded so that
 * it can be used to send to the backend as a get request
 *
 * @param identity - email address
 */
const getTokenFactory = (identity: string) => {
    return () =>
        fetch(`http://${ipAddress}:3000/virgil-jwt?identity=${encodeURIComponent(identity)}`)
            .then((res) => res.json())
            .then((data) => data.virgil_jwt);
};
