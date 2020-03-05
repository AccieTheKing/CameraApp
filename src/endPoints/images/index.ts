import { ipAddress } from '../index';


/**
 * This function fetches all the photos from the backend
 */
export const getPhotosAPI = async () => {
    return await fetch(`http://${ipAddress}:3000/photos`).then((res) => res.json());
};

/**
 *
 * @param body
 */
export const postPhotoAPI = async (body) => {
    return await fetch(`http://${ipAddress}:3000/photos`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body,
    });
};