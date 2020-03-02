/**
 * This function fetches all the photos from the backend
 */
export const getPhotos = async () => {
  return await fetch('http://192.168.1.67:3000/photos').then((res) => res.json());
};
