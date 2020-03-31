'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePreview from '../ImagePreview';

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
    const { receiver, signedInUser } = props.route.params; // destructure

    this.state = {
      data: [],
      showPreview: false,
      cameraAngle: 'back',
      receiver,
      signedInUser,
    };
  }

  render() {
    if (!this.state.showPreview) {
      return (
        <View style={styles.container}>
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type[this.state.cameraAngle]}
            flashMode={RNCamera.Constants.FlashMode.off}
            captureAudio={false}
          />
          <View style={styles.snapBtnSection}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14, color: 'white' }}> SNAP </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleCamera.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14, color: 'white' }}> TOGGLE </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <ImagePreview
          data={this.state.data}
          sendBy={this.state.signedInUser}
          sendTo={this.state.receiver}
          goToHome={this.showHome.bind(this)}
        />
      );
    }
  }

  /**
   * This function will take a picture when the snap button has been pressed,
   * we collect the meta data here and some other information about the picture that has
   * been taken
   */
  takePicture = async () => {
    try {
      const options = { quality: 0.5, fixOrientation: true };
      const data = await this.camera.takePictureAsync(options);

      this.setState({
        data: {
          src: data.uri,
          deviceOrientation: data.deviceOrientation,
          pictureOrientation: data.pictureOrientation,
          height: data.height,
          width: data.width,
          dateTime: new Date(),
        },
        showPreview: true,
      });
    } catch (err) {
      console.log(`Taking a picture went wrong: ${err.message}`);
    }
  };

  /**
   * This function will toggle the use of the front or the back camera
   */
  toggleCamera() {
    if (this.state.cameraAngle === 'back') {
      this.setState({ cameraAngle: 'front' });
    } else {
      this.setState({ cameraAngle: 'back' });
    }
  }

  /**
   * This function will let other components be able to change the state of the homepage
   *
   * @param go - boolean
   */
  showHome(go) {
    this.setState({ showPreview: go });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  preview: {
    flex: 1,
  },
  capture: {
    backgroundColor: '#71b4da',
    borderRadius: 100,
    padding: 15,
    margin: 20,
  },

  snapBtnSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
