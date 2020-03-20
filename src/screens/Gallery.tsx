import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import GalleryImage from './components/GalleryImage';
import { initializeUser } from '../appLib/systemStorage/virgil';
import { fetchFromGlobalStore } from '../appLib/systemStorage/global';
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
        renderItem={({ item }) => <GalleryImage src={item.data} />}
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
 * @param receiver - user that receives the taken p
 */
const initImages = async (setImages, signedInUser, receiver) => {
  try {
    const retrievedImages = await getPhotosAPI(signedInUser); // get images that are for the signed in user
    await initCurrentUser() // create Virgil instance of the signed in user
      .then(async (user) => {
        const receiverCard = await user.findUsers(receiver); // get the card of user that sent the message
        if (receiverCard) {
          retrievedImages.map(async (image) => {
            // loop through all images and decrypt them with users' card
            const decryptedImage = await user.decrypt(image.data, receiverCard);
            // add decrypted image to array in state
            setImages((prevImages) => prevImages.concat({ id: image.id, data: decryptedImage }));
          });
        }
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log('Something went wrong ' + err.message);
  }
};

/**
 * Retrieve stored JWT and use it to initialize user
 */
const initCurrentUser = async () => {
  try {
    const token = await fetchFromGlobalStore('cameraAppJWT');
    return initializeUser(token);
  } catch (err) {
    console.log('something went wrong with initializing user ' + err);
  }
};

const styles = StyleSheet.create({
  galleryPage: {
    flex: 1,
  },
  header: {
    backgroundColor: 'red',
    padding: 15,
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  imageRow: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Gallery;
