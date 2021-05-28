//React
import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import MaskedView from "@react-native-community/masked-view";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

//Element
import { Avatar, Button, ButtonGroup } from "react-native-elements";

//Responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//Firebase
import * as firebase from "firebase";

//TouchableScale
import TouchableScale from "react-native-touchable-scale";

import * as ImagePicker from "expo-image-picker";

//Import JS
import AlertCustom from "../src/alertCustom";

//Loading Animation
import AnimatedLoader from "react-native-animated-loader";

//React Navigation
import { StackActions } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayProfile:
        "https://firebasestorage.googleapis.com/v0/b/materi-gizi.appspot.com/o/data%2Fpyramid.png?alt=media&token=18bd715c-3690-45de-bc7f-cba88d1f3c5e",
      showAlert: false,
      onMessage: null,

      //Loading
      _loader: false,
    };
  }

  _logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        this.props.navigation.dispatch(StackActions.replace("Panel"));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  render() {
    // Access the postId and otherParam via Destructuring assignment
    const { dName, dCampus, dUID, dPhone, dProfile } = this.props.route.params;

    const _changeProfile = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
          this.setState({
            _loader: true,
          });
          uploadImage(result.uri, dUID).then(() => {
            let imageRef = firebase.storage().ref("/profile/" + dUID);
            imageRef.getDownloadURL().then((url) => {
              var user = firebase.auth().currentUser;
              user
                .updateProfile({ displayName: "Developer", photoURL: url })
                .then(function () {
                  //succec
                })
                .catch(function (error) {
                  // An error happened.
                });
              this.setState({
                _loader: false,
                onMessage:
                  "Upload Photo Profile Success, Restart Apps to Effect",
                showAlert: true,
              });
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const uploadImage = async (uri, imageName) => {
      const respone = await fetch(uri);
      const blob = await respone.blob();

      var ref = firebase
        .storage()
        .ref()
        .child("profile/" + imageName);

      return ref.put(blob);
    };

    return (
      <View style={styles.stretcher}>
        <StatusBar hidden />

        <AnimatedLoader
          visible={this.state._loader}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../loading.json")}
          animationStyle={{ height: 200, width: 200 }}
          speed={1}
        />

        <View style={styles.bgBack}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.dispatch(StackActions.replace("Home"))
            }
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={hp("5%")}
              color="#0DB14B"
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ backgroundColor: "white", height: hp("30%") }}>
          <TouchableScale onPress={_changeProfile}>
            <MaskedView
              style={styles.maskProfile}
              maskElement={
                <MaterialCommunityIcons
                  style={{ alignSelf: "center", justifyContent: "center" }}
                  name="hexagon"
                  size={hp("35%")}
                  color="#0DB14B"
                />
              }
            >
              <Avatar
                containerStyle={{
                  alignSelf: "center",
                  justifyContent: "center",
                }}
                size={hp("35%")}
                rounded
                source={{
                  uri: dProfile != null ? dProfile : this.state.displayProfile,
                }}
              />
            </MaskedView>
          </TouchableScale>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: hp("16%"),
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: hp("2%"),
                color: "white",
                fontFamily: "Montserrat-Bold",
              }}
            >
              {dName}
            </Text>
            <Text
              style={{
                fontSize: hp("2%"),
                color: "white",
                fontFamily: "Montserrat-Regular",
              }}
            >
              {dCampus}
            </Text>
            <Text
              style={{
                fontSize: hp("2%"),
                color: "white",
                fontFamily: "Montserrat-Regular",
              }}
            >
              {dPhone}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: hp("2%"),
                color: "white",
                fontFamily: "Montserrat-Regular",
              }}
            >
              {dUID}
            </Text>

            <Button
              title="Change Password"
              buttonStyle={{ backgroundColor: "white" }}
              titleStyle={{
                color: "#00854A",
                fontSize: hp("1.5%"),
                fontFamily: "Montserrat-Regular",
              }}
              onPress={() => this.props.navigation.navigate("ResetUser")}
              containerStyle={{
                borderRadius: hp("50%"),
                width: wp("40%"),
                margin: hp("1%"),
              }}
              onPress={() => {
                this.props.navigation.navigate("ResetUser");
              }}
            />

            <Button
              title="Log Out"
              icon={
                <MaterialCommunityIcons
                  name="logout"
                  size={hp("1.5%")}
                  color="#00854A"
                />
              }
              buttonStyle={{ backgroundColor: "white" }}
              titleStyle={{
                color: "#00854A",
                fontSize: hp("1.5%"),
                fontFamily: "Montserrat-Regular",
              }}
              containerStyle={{
                borderRadius: hp("50%"),
                width: wp("40%"),
                margin: hp("1%"),
              }}
              onPress={() => this._logout()}
            />

            <Image
              style={{ height: hp("7%") }}
              resizeMode="contain"
              source={require("../icon/alter.png")}
            />
          </View>
        </View>

        <AlertCustom
          showAwesome={this.state.showAlert}
          messageAlert={this.state.onMessage}
          onConPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //===========CONTAINER===========
  stretcher: {
    flex: 1,
    backgroundColor: "#0DB14B",
  },
  maskProfile: {
    backgroundColor: "white",
    height: hp("35%"),
    position: "relative",
    top: hp("13%"),
  },

  //===========BG BACK===========
  bgBack: {
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  //===========END===========
});
