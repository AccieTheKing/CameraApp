import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

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
  const response = await fetch('http://192.168.1.67:3000/photos', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: src,
    }),
  }).then((res) => res.json());
  console.log('heyyy', response);
};

/**
 * This method fetches the data from the database
 */
const fetchPicture = async () => {
  const response = await fetch('http://192.168.1.67:3000/photos', { method: 'GET' }).then((res) => res.json());
  console.log('heyyy', response);
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
