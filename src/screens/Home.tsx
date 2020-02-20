import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Camera from './components/Camera';
/**
 * This class represents the homepage, this is the page that will be show on startup
 * of the application
 */
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHome: true,
    };
  }

  render() {
    if (this.state.showHome) {
      return (
        <View style={styles.overallPage}>
          <Header />
          <Main>
            <Text style={styles.mainIntroText}>Welcome, here are some buttons that need some actions</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.bottonRow}>
                <Button title="Open Camera" onPress={() => this.setState({ showHome: false })} />
                <Button title="Go to another page" onPress={() => console.log('t')} />
                <Button title="Just a test" onPress={() => console.log('t')} />
              </View>
            </View>
          </Main>
          <Footer />
        </View>
      );
    } else {
      return (
        <View>
          <Camera />
          <Button title="Open Camera" onPress={() => this.setState({ showHome: true })} />
        </View>
      );
    }
  }
}

/**
 * The header of the Home screen
 *
 * @param props
 */
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Home</Text>
    </View>
  );
};

/**
 * The main of the home screen
 *
 * @param props
 */
const Main = (props) => {
  return <View style={styles.main}>{props.children}</View>;
};

/**
 * The footer of the home screen
 *
 * @param props
 */
const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Made with ❤ and some struggle</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overallPage: {
    flex: 1,
  },
  header: {
    backgroundColor: 'red',
    padding: 15,
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    padding: 15,
  },
  mainIntroText: {
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottonRow: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    maxHeight: 150,
  },
  footer: {
    backgroundColor: 'red',
    padding: 10,
  },
  footerText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
});
