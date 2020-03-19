import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { postPhotoAPI } from '../appLib/endPoints/images/index';
import { initializeUser } from '../appLib/systemStorage/virgil';
import { fetchFromGlobalStore } from '../appLib/systemStorage/global';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * This is the view is shown after a picture is taken
 *
 * @param src - base64 string of image
 * @param goToHome - change boolean in parent view to show camera
 */
const ImagePreview = ({ src, goToHome }) => {
  const [receivantUser, setReceivantUser] = useState('hello@gmail.com'); // test
  let currentUser;

  useEffect(() => {
    initCurrentUser()
      .then((user) => {
        // await user.register(); // no need to use the EThree.register() method on the Sign In flow.
        // await user.backupPrivateKey(`${process.env.VIRGIL_PRIVATE_TOKEN_BACKUP_PHRASE}_${user.identity}`);
        currentUser = user;
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: src }} style={styles.previewImage} />
      <View style={styles.actionBtnRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => savePicture(currentUser, receivantUser, src)}>
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
 * Retrieve stored JWT and use it to initialize user
 */
const initCurrentUser = async () => {
  try {
    const token = await fetchFromGlobalStore('cameraAppJWT');
    return initializeUser(token);
  } catch (err) {
    console.log('something went wrong with initializing user ' + err);
  }
};

/**
 * This method saves taken picture into the database
 *
 * @param currentUser - email of user that is signed in
 * @param receivantUser - email of user that receives the photo
 * @param src - the temporary location of stored picture
 */
const savePicture = async (currentUser, receivantUser, src) => {
  try {
    await RNFetchBlob.fs.readFile(src, 'base64').then(async (base64) => {
      const receivantCard = await currentUser.findUsers(receivantUser); // search for receivant card
      const encryptedData = await currentUser.encrypt(base64, receivantCard); // current user encrypts data for receiver

      if (encryptedData) {
        const body = JSON.stringify({
          sender: currentUser.identity,
          receiver: receivantUser,
          data: encryptedData,
        });
        postPhotoAPI(body)
          .then((res) => {
            console.log('successfuly sent image');
          })
          .catch((err) => console.log('An error has been found  ', err));
      }
    }); // read file from cache location as base64
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
