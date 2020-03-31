import React, { useState } from 'react';
import { deletePhotoAPI } from '../../appLib/endPoints/images';
import { StyleSheet, View, Image, Dimensions, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * This method will represents an Image component for displaying
 * images by giving a source as prop
 *
 */
const GalleryImage = ({ id, data, removePhotoMethod }) => {
  const [showEdit, setShowEdit] = useState(false);
  const parsedData = JSON.parse(data);

  // show menu of image
  const showEditMenu = (setShowEdit) => {
    setShowEdit((showEdit) => (showEdit ? 'false' : 'true'));
  };

  /**
   * This function will make use of the deletePicture method.
   * It will remove a picture that has been stored in the backend.
   *
   * @param id
   */
  const deletePicture = (id) => {
    Alert.alert('Are you sure?', 'Do you want to delete this Image?', [
      {
        text: 'OK',
        onPress: () => {
          deletePhotoAPI(id)
            .then((res) => {
              removePhotoMethod(id);
              console.log(`successful deleted image`);
            })
            .catch((err) => {
              console.log(`Something went wrong in the Gallery image: ${err.message}`);
            });
          setShowEdit(false);
        },
      },
      { text: 'Cancel', onPress: () => setShowEdit(false), style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.imageContainer}>
      <Text>{photoDateTimeTransform(parsedData.dateTime)}</Text>
      {showEdit && (
        <TouchableOpacity style={styles.deletingBtn} onPress={() => deletePicture(id)}>
          <Text style={styles.deletingBtnText}>X</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onLongPress={() => showEditMenu(setShowEdit)}>
        <Image style={styles.imageStyle} source={{ uri: `data:image/png;base64,${parsedData.src}` }} />
      </TouchableOpacity>
    </View>
  );
};

/**
 * This method will transform and format the dateTimeStringUTC to
 * a wanted string
 *
 * @param dateTime
 */
const photoDateTimeTransform = (dateTime) => {
  const photoDate = new Date(dateTime);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = photoDate.getUTCDate();
  const day = days[photoDate.getDay()];
  let min = photoDate.getMinutes();

  const getTime = () => {
    if (min < 10) {
      min = '0' + min;
    }
    return `${photoDate.getHours()}:${min}`;
  };

  return `${day} - ${date} - ${getTime()}`;
};

const styles = StyleSheet.create({
  imageContainer: {
    flexBasis: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 2,
  },
  imageStyle: {
    flex: 1,
    minHeight: 200,
    resizeMode: 'cover',
  },
  deletingBtn: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: 'red',
    width: 25,
    height: 25,
  },
  deletingBtnText: {
    color: '#FFF',
    textAlign: 'center',
  },
});

export default GalleryImage;
