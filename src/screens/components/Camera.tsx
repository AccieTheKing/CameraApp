'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
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
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image source={{ uri: this.state.data }} style={styles.previewImage} />
        </View>
      );
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options).catch((err) => {
        console.log('error taking picture ' + err);
      });
      this.setState({ data: data.uri, showPreview: true });
    } else {
      return false;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  preview: {
    flex: 1,
    // width: '100%',
    // height: '100%',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    // alignSelf: 'center',
    margin: 20,
  },
  previewImage: {
    flex: 1,
    height: '100%',
  },
  snapBtnSection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
