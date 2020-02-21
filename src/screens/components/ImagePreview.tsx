import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

const ImagePreview = ({ src, goToHome }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: src }} style={styles.previewImage} />
      <View style={styles.actionBtnRow}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => goToHome(false)}>
          <Text style={styles.actionBtnText}>Retake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  previewImage: {
    flex: 1,
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
