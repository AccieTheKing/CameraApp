import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions } from 'react-native';
import GalleryImage from './components/GalleryImage';
import { initCurrentUser } from '../appLib/systemStorage/virgil';
import { getPhotosAPI } from '../appLib/endPoints/images/index';

const Gallery = ({ route }) => {
  const [refresh, setRefresh] = useState(true);
  const [images, setImages] = useState([]); // will hold the fetched images
  const { signedInUser, receiver } = route.params; // user currently signed in and the user that is chatting with

  useEffect(() => {
    initImages(setImages, setRefresh, signedInUser, receiver); // decrypt images and store them in state

    return () => {
      setImages([]);
    };
  }, []);

  const removeImageFromList = (id) => {
    const currentImagesArr = [...images]; // copy of array
    // find item to remove and return its index
    currentImagesArr.forEach((image, index) => {
      if (image.id === id) {
        currentImagesArr.splice(index, 1);
      }
    });
    setImages(currentImagesArr); // set the copy of the list as list in state
  };

  // Show some loading text while images are being decrypted
  if (refresh) {
    return (
      <View style={styles.galleryPage}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.galleryPage}>
      <FlatList
        data={images}
        style={styles.listStyle}
        renderItem={({ item }) => <GalleryImage src={item.data} id={item.id} removePhotoMethod={removeImageFromList} />}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

/**
 * Method for storing images in state when loading component
 *
 * @param setImages - store in the state
 * @param signedInUser - signedInUser/email address of user that is signed in
 * @param receiver - user that receives the taken
 */
const initImages = async (setImages, setRefresh, signedInUser, receiver) => {
  try {
    const retrievedImages = await getPhotosAPI(signedInUser); // get images that are for the signed in user
    const initUser = await initCurrentUser(); // create Virgil instance of the signed in user
    const receiverCard = await initUser.findUsers(receiver); // get the card of user that sent the message
    // loop through all images
    retrievedImages.map(async (image) => {
      const decryptedImage = await initUser.decrypt(image.data, receiverCard); // decrypt images
      // add decrypted images to array in state
      setImages((prevImages) => prevImages.concat({ id: image.id, data: decryptedImage }));
    });
    setRefresh(false);
  } catch (err) {
    console.log('Something went wrong ' + err.message);
  }
};

const styles = StyleSheet.create({
  galleryPage: {
    flex: 1,
  },
  listStyle: {
    maxWidth: Dimensions.get('window').width,
  },
});

export default Gallery;
