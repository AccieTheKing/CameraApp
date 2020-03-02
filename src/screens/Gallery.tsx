import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, Image } from 'react-native';

const Gallery = () => {
  const [cachedImages, setCachedImages] = useState([]);
  initImages(setCachedImages);

  return (
    <View style={styles.galleryPage}>
      <List storedImages={cachedImages} />
    </View>
  );
};

/**
 * Method for storing images in state
 *
 * @param setCachedImages - the state store for images
 */
const initImages = (setCachedImages) => {
  fetch('http://192.168.1.67:3000/photos')
    .then((res) => res.json())
    .then((data) => {
      setCachedImages(data);
    })
    .catch((err) => console.log('err in the fetchPicturesData', err));
};

/**
 * This component returns a list of images
 *
 * @param storedImages -  images stored after being fethched
 */
const List = ({ storedImages }) => {
  return (
    <View style={styles.imageRow}>
      <FlatList
        data={storedImages}
        renderItem={({ item }) => (
          <Image style={styles.testImage} source={{ uri: `data:image/png;base64,${item.name}` }} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  galleryPage: {
    flex: 1,
  },
  imageRow: {
    flexDirection: 'row',
  },
  testImage: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'cover',
    minHeight: 200,
  },
});

export default Gallery;
