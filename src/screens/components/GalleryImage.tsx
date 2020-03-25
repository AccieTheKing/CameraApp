import React, { useState } from 'react';
import { deletePhotoAPI } from '../../appLib/endPoints/images';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * This method will represents an Image component for displaying
 * images by giving a source as prop
 *
 */
const GalleryImage = ({ id, src }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <View style={styles.imageContainer}>
      {showEdit && (
        <TouchableOpacity style={styles.deletingBtn} onPress={() => deletePicture(id)}>
          <Text>X</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onLongPress={() => showEditMenu(setShowEdit)}>
        <Image style={styles.imageStyle} source={{ uri: `data:image/png;base64,${src}` }} />
      </TouchableOpacity>
    </View>
  );
};

// show menu of image
const showEditMenu = (setShowEdit) => {
  setShowEdit((showEdit) => (showEdit ? 'false' : 'true'));
};

/**
 * This function will make use of the deletePicture method.
 * It will remove a picture that has been stored in the backend.
 *
 * @param id - the indentifier
 */
const deletePicture = (id) => {
  deletePhotoAPI(id)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(`Something went wrong in the Gallery image: ${err.message}`);
    });
};

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('window').width / 2,
  },
  imageStyle: {
    flex: 1,
    minHeight: 200,
    resizeMode: 'cover',
  },
  deletingBtn: {
    borderRadius: 100,
    width: 25,
    height: 25,
  },
});

export default GalleryImage;
