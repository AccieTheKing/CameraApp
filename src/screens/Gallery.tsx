import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import GalleryImage from './components/GalleryImage';
import { initCurrentUser } from '../appLib/systemStorage/virgil';
import { getPhotosAPI } from '../appLib/endPoints/images/index';

const Gallery = ({ route }) => {
  const [images, setImages] = useState([]); // will hold the fetched images
  const { signedInUser, receiver } = route.params; // user currently signed in and the user that is chatting with

  useEffect(() => {
    initImages(setImages, signedInUser, receiver); // decrypt images and store them in state

    return () => {
      setImages([]);
    };
  }, []);

  // Show some loading text while images are being decrypted
  if (!images) {
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
        renderItem={({ item }) => <GalleryImage src={item.data} id={item.id} />}
        numColumns={3}
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
const initImages = async (setImages, signedInUser, receiver) => {
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
  } catch (err) {
    console.log('Something went wrong ' + err.message);
  }
};

const styles = StyleSheet.create({
  galleryPage: {
    flex: 1,
  },
  imageRow: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Gallery;
