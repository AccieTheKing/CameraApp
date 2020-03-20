import { ipAddress } from '../index';
// this file will consist of global functions for images/pictures


/**
 * This function fetches all the photos from the backend
 */
export const getPhotosAPI = async (username?) => {
    if (username) {
        return await fetch(`http://${ipAddress}:3000/api/photos?filter[where][receiver]=${username}`).then((res) => res.json());
    }
    return await fetch(`http://${ipAddress}:3000/api/photos`).then((res) => res.json());
};

/**
 * This function will post what is provided in the body
 * 
 * @param body - image
 */
export const postPhotoAPI = async (body) => {
    return await fetch(`http://${ipAddress}:3000/api/photos`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body,
    });
};