import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { postPhotoAPI } from '../appLib/endPoints/images/index';
import { initCurrentUser } from '../appLib/systemStorage/virgil';

/**
 * This is the view is shown after a picture is taken
 *
 * @param src - base64 string of image
 * @param goToHome - change boolean in parent view to show camera
 */
const ImagePreview = ({ src, sendBy, sendTo, goToHome }) => {
  const [sender, setSender] = useState(sendBy); // user that's signed in
  const [receiver, setReceiver] = useState(sendTo); // user that needs to get the image

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: src }} style={styles.previewImage} />
      <View style={styles.actionBtnRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => savePicture(sender, receiver, src, goToHome)}>
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
 * @param currentUser - email of user that is signed in
 * @param receiver - email of user that receives the photo
 * @param src - the temporary location of stored picture
 * @param goToHome - go back to the camera screen
 */
const savePicture = async (sender, receiver, src, goToHome) => {
  try {
    const base64 = await RNFetchBlob.fs.readFile(src, 'base64'); // read temp location of stored picture
    const initUser = await initCurrentUser(); // initialize current user with stored JWT
    const receiverCard = await initUser.findUsers(receiver); // search for receivant card
    const encryptedData = await initUser.encrypt(base64, receiverCard); // current user encrypts data for receiver

    const body = JSON.stringify({
      sender,
      receiver: receiver,
      data: encryptedData,
    });

    postPhotoAPI(body) // store encrypted data into the database
      .then((res) => {
        console.log('successfuly sent image');
        goToHome(false);
      })
      .catch((err) => console.log('An error has been found  ', err));
  } catch (err) {
    console.log('Something went wrong: ' + err.message);
  }
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionBtn: {
    backgroundColor: '#aad3ea',
    borderRadius: 100,
    padding: 15,
    margin: 20,
  },
  actionBtnText: {
    color: '#FFF',
  },
});

export default ImagePreview;
