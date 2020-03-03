import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

/**
 * This method will represents an Image component for displaying
 * images by giving a source as prop
 *
 */
const GalleryImage = ({ src }) => {
  return <Image style={styles.imageStyle} source={{ uri: `data:image/png;base64,${src}` }} />;
};

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'cover',
    minHeight: 200,
  },
});

export default GalleryImage;
