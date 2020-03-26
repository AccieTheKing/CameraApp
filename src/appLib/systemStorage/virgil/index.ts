import { EThree } from '@virgilsecurity/e3kit-native';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchFromGlobalStore } from '../global/index';
import { ipAddress } from '../../endPoints/index';

/**
 * This function returns a token that will be used to authenticate requests
 * to the backend. This is a simplified solution without any real protection, so here you need use your
 * application authentication mechanism.
 * 
 * @param identity - email address
 */
export const getJWTtoken = async (identity) => {
    const response = await fetch(`http://${ipAddress}:3000/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identity: identity
        })
    });
    if (!response.ok) {
        throw new Error(`Error code: ${response.status} \nMessage: ${response.statusText}`);
    }

    return response.json().then(data => data.authToken);
}

/**
 * Retrieve stored JWT and use it to initialize user
 */
export const initCurrentUser = async () => {
    try {
        const token = await fetchFromGlobalStore('cameraAppJWT');
        return initializeE3kit(token);
    } catch (err) {
        console.log('something went wrong with initializing user ' + err);
    }
};

/**
 * This method will return the an initialised EThree instance and sets the
 * getTokenFactoryto equal to the getToken variable, a method which expects a paramerter as indentity
 * 
 * @param authToken - JWT from backend
 */
const initializeE3kit = (authToken) => {
    const token = getVirgilToken(authToken); // function that returns the virgil token
    return EThree.initialize(token, { AsyncStorage });
};

/**
 * This function makes authenticated request to GET /virgil-jwt endpoint with the
 * JWT to make use the user is granded this access
 * The token it returns serves to make authenticated requests to Virgil Cloud
 */
const getVirgilToken = (authToken) => {
    return () => fetch(`http://${ipAddress}:3000/virgil-jwt`, {
        headers: {
            // We use bearer authorization, this endpoint should be protected.
            Authorization: `Bearer ${authToken}`,
        }
    }).then(res => res.json())
        .then(data => data.virgilToken);
}
