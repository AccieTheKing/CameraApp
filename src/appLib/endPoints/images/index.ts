import { ipAddress } from '../index';
// this file will consist of global functions for images/pictures


/**
 * This function will fetch the images that the user has received,
 * or when no username has been given, it will return all the images
 * 
 * @param username - username of the receiving user that the photo is meant for to see 
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

/**
 * This function takes a id which deletes the 
 * 
 * @param id - the id of a picture
 */
export const deletePhotoAPI = async (id) => {
    return await fetch(`http://${ipAddress}:3000/api/photos/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
}