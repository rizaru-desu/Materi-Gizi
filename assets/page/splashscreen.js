import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { StackActions } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
//Firebase
import * as firebase from "firebase";

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      onMessage: null,
    };
  }
  componentDidMount() {
    this.animation.play();
    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.dispatch(StackActions.replace("Home"));
        } else {
          // User is signed out
          // ...
          this.props.navigation.dispatch(StackActions.replace("Panel"));
        }
      });
    }, 5000);
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        <Animatable.Text
          animation="bounce"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.titleWait}
        >
          Please Wait
        </Animatable.Text>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            height: hp("25%"),
            width: wp("25%"),
          }}
          source={require("../alter.json")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  titleWait: {
    fontFamily: "Montserrat-Bold",
    fontSize: hp("3%"),
    margin: hp("3%"),
    color: "#46A9BD",
  },
});
