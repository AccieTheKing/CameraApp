import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

/**
 * This method will represents an Image component for displaying
 * images by giving a source as prop
 *
 */
const GalleryImage = ({ src }) => {
  return (
    <View>
      <Image source={src} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default GalleryImage;
