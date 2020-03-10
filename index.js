import { AppRegistry } from 'react-native';
import App from './App';
// import firebase from 'firebase';
import { name as appName } from './app.json';

// firebase.initializeApp({
//   databaseURL: 'https://cameraapp-62dfd.firebaseio.com',
//   projectId: 'cameraapp-62dfd',
// });

AppRegistry.registerComponent(appName, () => App);
