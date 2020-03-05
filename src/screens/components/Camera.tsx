'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePreview from './ImagePreview';

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data:
        'data:image/png;base64,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',
      showPreview: false,
      cameraAngle: 'back',
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
            {/* {/* <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={this.toggleCamera.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14, color: 'white' }}> TOGGLE </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <ImagePreview src={this.state.data} goToHome={this.showHome.bind(this)} />;
    }
  }

  /**
   * This function will take a picture when the snapp button has been pressed
   */
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, fixOrientation: true };
      const data = await this.camera.takePictureAsync(options).catch((err) => {
        console.log('error taking picture ' + err);
      });
      this.setState({ data: data.uri, showPreview: true });
    } else {
      return false;
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
