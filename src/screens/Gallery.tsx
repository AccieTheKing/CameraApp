import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import GalleryImage from './components/GalleryImage';
import { getPhotosAPI } from '../endPoints/images/index';

const Gallery = () => {
  const [cachedImages, setCachedImages] = useState();

  useState(() => {
    initImages(setCachedImages); // component will update/mount
    // component will unmount
    return () => {
      setCachedImages(null);
    };
  });

  return (
    <View style={styles.galleryPage}>
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
