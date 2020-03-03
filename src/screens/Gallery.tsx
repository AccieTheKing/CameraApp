import React, { useState } from 'react';
import GalleryImage from './components/GalleryImage';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { getPhotosAPI } from '../imagesEndPoints/index';

const Gallery = () => {
  const [cachedImages, setCachedImages] = useState();
  initImages(setCachedImages);

  return (
    <View style={styles.galleryPage}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gallery</Text>
      </View>
      <FlatList
        data={cachedImages}
        renderItem={({ item }) => <GalleryImage src={item.name} />}
        numColumns={3}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

/**
 * Method for storing images in state when loading component
 *
 * @param setCachedImages - the state store for images
 */
const initImages = (setCachedImages) => {
  getPhotosAPI()
    .then((data) => {
      setCachedImages(data);
    })
    .catch((err) => console.log('err in the fetchPicturesData', err));
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
