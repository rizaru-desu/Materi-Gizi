//React
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  LogBox,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaskedView from "@react-native-community/masked-view";
import Svg, { Path } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import * as Application from "expo-application";

//Scale Touchable
import TouchableScale from "react-native-touchable-scale";

//LOADING
import AnimatedLoader from "react-native-animated-loader";

//Responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//Carousel
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

//Element
import { Avatar } from "react-native-elements";

//Firebase
import * as firebase from "firebase";

//React Navigation
import { StackActions } from "@react-navigation/native";

//Import JS
import AlertCustom from "../src/alertCustom";
import axios from "axios";
import { AdMobInterstitial, AdMobBanner } from "expo-ads-admob";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: null,
      displayCampus: null,
      displayUID: null,
      displayPhone: null,
      displayProfile: null,
      displayPrevillage: true,
      displayEmail: null,

      //Message
      showAlert: false,
      onMessage: null,

      //get API Menu
      ENTRIES1: [],

      //Loading
      _loader: false,
    };

    this.interstitialAdId =
      Platform.OS === "ios" ? null : "ca-app-pub-9341343436751788/3426178265";
    this.bannerAdId =
      Platform.OS === "ios" ? null : "ca-app-pub-9341343436751788/1557728679";
    LogBox.ignoreAllLogs(true);
  }

  async componentDidMount() {
    try {
      this.setState({ _loader: true });
      this.interval = setTimeout(() => {
        this._getMenu();
        let user = firebase.auth().currentUser;
        if (user != null) {
          this.setState({
            displayName: user.displayName,
            displayUID: user.uid,
            displayPhone: user.phoneNumber,
            displayProfile: user.photoURL,
            displayEmail: user.email,
          });
          if (user.emailVerified) {
            this.setState({ _loader: false });
            firebase
              .database()
              .ref("/" + user.uid)
              .on("value", (snapshot) => {
                this.setState({
                  displayCampus: snapshot.val().displayCampus,
                });
                if (Platform.OS === "ios") {
                  Application.getIosIdForVendorAsync().then((v) => {
                    if (v != snapshot.val().serialKey) {
                      this.setState({
                        onMessage: "Serial Key:" + `\n` + v,
                      });
                      this.showAlert();
                      console.log(v);
                    }
                  });
                } else {
                  if (Application.androidId != snapshot.val().serialKey) {
                    this.setState({
                      onMessage:
                        "Serial Key:" +
                        `\n` +
                        Application.androidId +
                        `\n` +
                        "Contact CS/Techincal Support",
                    });
                    this.showAlert();
                  }
                }
              });
          } else {
            this.setState({ _loader: false });
            Alert.alert(
              "First Verified You Email",
              "Send Email Verified to " + user.email + "?",
              [
                {
                  text: "Log Out",
                  onPress: () =>
                    firebase
                      .auth()
                      .signOut()
                      .then(function () {
                        this.props.navigation.dispatch(
                          StackActions.replace("Panel")
                        );
                      })
                      .catch(function (error) {
                        console.log(error);
                      }),
                  style: "cancel",
                },
                { text: "Send", onPress: () => this._senVerified() },
              ],
              { cancelable: false }
            );
          }
        }
      }, 5000);

      //ADMOB
      AdMobInterstitial.setAdUnitID(this.interstitialAdId);
      await AdMobInterstitial.requestAdAsync({
        servePersonalizedAds: false,
      });
      await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.log(error);
    }
  }

  async componentWillUnmount() {
    clearTimeout(this.interval);
  }

  _logOut = () => {
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

  _senVerified = () => {
    console.log(this.state.displayEmail);
    axios
      .post(`https://gizi-apps.herokuapp.com/verified`, {
        usergetEmail: this.state.displayEmail,
      })
      .then((res) => {
        Alert.alert(
          null,
          `Check your Email: ${res.data.data}`,
          [{ text: "OK", onPress: () => this._logOut() }],
          { cancelable: false }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _getMenu = () => {
    axios
      .post(`https://gizi-apps.herokuapp.com/API-MKEP`, {
        nameJSON: "menu.json",
      })
      .then((res) => {
        this.setState({ ENTRIES1: res.data });
      });
  };

  _getProfile = () => {
    this.props.navigation.dispatch(
      StackActions.replace("ProfileUser", {
        dName: this.state.displayName,
        dCampus: this.state.displayCampus,
        dUID: this.state.displayUID,
        dPhone: this.state.displayPhone,
        dProfile: this.state.displayProfile,
      })
    );
  };

  //Message Alert
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
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

  render() {
    const renderItem = ({ item }, parallaxProps) => {
      return (
        <TouchableWithoutFeedback
          style={styles.item}
          onPress={() =>
            this.props.navigation.navigate(item.page, {
              page: item.title,
              idcampus: this.state.displayCampus,
            })
          }
        >
          <View style={styles.titleContainerCarousel}>
            <Text style={styles.titleCarousel} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
          <ParallaxImage
            source={{ uri: item.illustration }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.03}
            {...parallaxProps}
          />
          <Text style={styles.subtitleCarousel} numberOfLines={2}>
            {item.subtitle}
          </Text>
        </TouchableWithoutFeedback>
      );
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

        {/* HEADER ACCOUNT */}
        <View style={styles.bgHeader}>
          <View style={styles.bgContainer}>
            <TouchableScale onPress={() => this._getProfile()}>
              <MaskedView
                style={styles.maskProfile}
                maskElement={
                  <MaterialCommunityIcons
                    style={{ alignSelf: "center", justifyContent: "center" }}
                    name="hexagon"
                    size={hp("15%")}
                    color="black"
                  />
                }
              >
                <Avatar
                  containerStyle={{
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                  size={hp("15%")}
                  rounded
                  source={{
                    uri:
                      this.state.displayProfile === null
                        ? "https://firebasestorage.googleapis.com/v0/b/materi-gizi.appspot.com/o/data%2Fpyramid.png?alt=media&token=18bd715c-3690-45de-bc7f-cba88d1f3c5e"
                        : this.state.displayProfile,
                  }}
                />
              </MaskedView>
            </TouchableScale>
          </View>
          <View style={styles.accContainer}>
            <Text style={styles.accName}>
              {this.state.displayName == null
                ? "Account Name"
                : this.state.displayName}
            </Text>
            <Text style={styles.accCampus}>
              {this.state.displayCampus == null
                ? "Campus"
                : this.state.displayCampus}
            </Text>
          </View>
        </View>
        <View style={styles.subHeader}>
          <View style={styles.subHeaderContainer}>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 171.38 54">
              <Path
                d="M171.38 0c-9.67 0-18.41 5.61-22.6 14.32C137.48 37.8 113.48 54 85.69 54S33.9 37.8 22.6 14.32C18.41 5.61 9.67 0 0 0h171.38z"
                fill="#0DB14B"
              />
            </Svg>
          </View>
          <View style={styles.subpartHeaderContainer}></View>
        </View>
        {/* END */}
        <View style={styles.homeContainer}>
          <Image
            style={styles.logoAlter}
            resizeMode="contain"
            source={require("../icon/alter.png")}
          />
          <Carousel
            sliderWidth={wp("100%")}
            sliderHeight={wp("100%")}
            itemWidth={wp("70%")}
            data={this.state.ENTRIES1}
            renderItem={renderItem}
            hasParallaxImages={true}
          />
        </View>

        <AlertCustom
          showAwesome={this.state.showAlert}
          messageAlert={this.state.onMessage}
          onConPressed={() => {
            this.hideAlert();
          }}
        />

        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={this.bannerAdId} // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //===========CONTAINER===========
  stretcher: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  //===========END===========

  //===========HEADER ACCOUNT===========
  bgHeader: {
    backgroundColor: "#0DB14B",
    height: 100,
    flexDirection: "row",
  },
  bgContainer: {
    flex: 1,
    justifyContent: "center",
  },
  maskProfile: {
    backgroundColor: "white",
    height: hp("15%"),
    position: "relative",
    top: hp("5%"),
  },

  accContainer: {
    flex: 1,
    marginTop: hp("4%"),
  },
  accName: {
    fontSize: hp("1.8%"),
    textAlign: "right",
    marginEnd: 10,
    color: "white",
    fontFamily: "Montserrat-Bold",
  },
  accCampus: {
    fontSize: hp("1.5%"),
    textAlign: "right",
    marginEnd: 10,
    color: "white",
    fontFamily: "Montserrat-Regular",
  },
  //===========END===========

  //===========SUB HEADER ACCOUNT===========
  subHeader: { height: 50, flexDirection: "row", zIndex: -1 },
  subHeaderContainer: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
  },
  subpartHeaderContainer: { flex: 1, backgroundColor: "#EEEEEE" },
  //===========END===========

  //===========MENU===========
  homeContainer: { backgroundColor: "#EEEEEE", flex: 1, zIndex: -2 },
  logoAlter: { height: 140, width: "50%", alignSelf: "center" },
  //===========END===========

  //===========CAROUSEL===========
  item: {
    width: wp("70%"),
    height: hp("55%"),
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "stretch",
  },
  titleContainerCarousel: {
    marginBottom: 20,
    alignSelf: "center",
    width: wp("60%"),
    padding: 10,
    borderRadius: hp("50%"),
    backgroundColor: "#00854A",
  },
  subtitleCarousel: {
    textAlign: "center",
    marginTop: 10,
    fontSize: hp("1.5%"),
    marginHorizontal: 20,
    fontFamily: "Montserrat-Regular",
  },
  titleCarousel: {
    textAlign: "center",
    color: "white",
    fontSize: hp("2%"),
    fontFamily: "Montserrat-Bold",
  },
  //===========END===========
});
