import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions, ScrollView } from 'react-native';
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
      <View style={styles.loadingAnimationContainer}>
        <Text style={styles.loadingAnimationText}>Loading...</Text>
      </View>
    );
  }

  return <ScrollView style={styles.galleryPage}>{MontlyListView(images, removeImageFromList)}</ScrollView>;
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
    // await initUser.register(); // no need to use the EThree.register() method on the Sign In flow.
    // await initUser.restorePrivateKey(`${process.env.VIRGIL_PRIVATE_TOKEN_BACKUP_PHRASE}_${initUser.identity}`);
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

/**
 * This method will return a list view per month of the images
 * 
 * @param images - image data from database
 * @param removeImageFromList - function to delete image
 */
const MontlyListView = (images, removeImageFromList) => {
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const dates = {
    jan: [],
    feb: [],
    mar: [],
    apr: [],
    may: [],
    jun: [],
    jul: [],
    aug: [],
    sep: [],
    okt: [],
    nov: [],
    dec: [],
  }; // will hold the images based on the month they were taken

  images.map((image) => {
    const data = JSON.parse(image.data); // parse object to get json data
    const dateTime = new Date(data.dateTime); // wrap dateTime into Date object to make use of Date methods
    const imgMonth = months[dateTime.getMonth()]; // get month when image has been taken
    dates[imgMonth].push({ id: image.id, data: image.data }); // push the image into the correct month
  });

  // Loop through each month
  return months.map((month, index) => {
    if (dates[month]) {
      return (
        // Per month loop through images
        <View key={index}>
          <Text style={styles.monthTitle}>{month}</Text>
          <View style={styles.imagesRow}>
            {dates[month].map((item) => {
              return (
                <GalleryImage key={item.id} id={item.id} data={item.data} removePhotoMethod={removeImageFromList} />
              );
            })}
          </View>
        </View>
      );
    }
  });
};

const styles = StyleSheet.create({
  galleryPage: {
    flex: 1,
  },
  monthTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  imagesRow: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  loadingAnimationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingAnimationText: {
    fontSize: 28,
  },
});

export default Gallery;
