import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { postPhotoAPI } from '../endPoints/images/index';
import RNFetchBlob from 'rn-fetch-blob';

/**
 * This is the view is shown after a picture is taken
 */
const ImagePreview = ({ src, goToHome }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: src }} style={styles.previewImage} />
      <View style={styles.actionBtnRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => savePicture(src)}>
          <Text style={styles.actionBtnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => goToHome(false)}>
          <Text style={styles.actionBtnText}>Retake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * This method saves taken picture into the database
 *
 * @param src - the image datasource
 */
const savePicture = async (src) => {
  const base64 = await RNFetchBlob.fs.readFile(src, 'base64'); // read file from cache location as base64
  const body = JSON.stringify({
    name: base64,
  });
  postPhotoAPI(body)
    .then((res) => {
      console.log('successfuly sent image');
    })
    .catch((err) => console.log('An error has been found  ', err));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  actionBtnRow: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionBtn: {
    backgroundColor: '#FFF',
    padding: 15,
  },
});

export default ImagePreview;