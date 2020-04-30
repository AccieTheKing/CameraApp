import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
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

  return <ScrollView style={styles.galleryPage}>{ListView(images, removeImageFromList)}</ScrollView>;
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

/**
 * This method will return a list view per month of the images
 *
 * @param images - image data from database
 * @param removeImageFromList - function to delete image
 */
const ListView = (images, removeImageFromList) => {
  const years = {};
  const dates = {
    Jan: [],
    Feb: [],
    Mar: [],
    Apr: [],
    May: [],
    Jun: [],
    Jul: [],
    Aug: [],
    Sep: [],
    Okt: [],
    Nov: [],
    Dec: [],
  }; // will hold the images based on the month they were taken

  images.map((image) => {
    const data = JSON.parse(image.data); // parse object to get json data
    const dateTime = new Date(data.dateTime); // wrap dateTime into Date object to make use of Date methods
    // get month when image has been taken
    Object.keys(dates).map((value, index) => {
      if (dateTime.getMonth() === index) {
        dates[value].push({ id: image.id, data: image.data }); // push the image into the correct month
      }
    });

    if (years[dateTime.getFullYear()] == null) {
      years[dateTime.getFullYear()] = [];
    }
  });

  // Add the images per year
  Object.keys(years).map((e) => {
    years[e].push(dates);
  });

  return Object.keys(years).map((year, i) => {
    return (
      <View key={i}>
        <Text style={styles.yearTitle}>{year}</Text>
        {Object.keys(dates).map((month, i) => {
          // Per month loop through images per
          return (
            <View key={i}>
              <Text style={styles.monthTitle}>{month}</Text>
              <View style={styles.imagesRow}>
                {dates[month].map((item, key) => (
                  <GalleryImage key={key} id={item.id} data={item.data} removePhotoMethod={removeImageFromList} />
                ))}
              </View>
            </View>
          );
        })}
      </View>
    );
  });
};

const styles = StyleSheet.create({
  galleryPage: {
    flex: 1,
  },
  yearTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
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
