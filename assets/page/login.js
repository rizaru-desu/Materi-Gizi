//React Component
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Modal,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Application from "expo-application";
import { BlurView } from "expo-blur";

//React Navigation
import { StackActions } from "@react-navigation/native";

//Animation
import * as Animatable from "react-native-animatable";

//Loading Animation
import AnimatedLoader from "react-native-animated-loader";

//Responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//React Element
import { Button } from "react-native-elements";

//Import JS
import FormRegister from "../src/formRegister";
import LoginFeature from "../src/formLogin";
import AlertCustom from "../src/alertCustom";

//Firebase
import * as firebase from "firebase";

//Axios
import Axios from "axios";
import { Alert } from "react-native";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      fullname: "",
      campus: "",
      phone: "",
      email: "",
      password: "",
      licensekey: "",
      checked: false,
      isModalVisible: false,
      showAlert: false,
      onMessage: "",

      userEmail: "",
      userPassword: "",

      userEmailForgot: "",

      //Check Visible Password
      secureTextEntry: true,
      iconName: "eye",

      //Modal
      modalVisible: false,

      //Loading
      _loader: false,

      //Check
      _checkMail: "",
    };
  }

  async componentDidMount() {
    try {
      Platform.OS === "ios"
        ? await Application.getIosIdForVendorAsync().then((v) => {
            this.setState({
              licensekey: v,
            });
          })
        : this.setState({
            licensekey: Application.androidId,
          });
    } catch (error) {
      console.log(error);
    }
  }

  onShowPassword = () => {
    let iconName = this.state.secureTextEntry ? "eye-slash" : "eye";
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      iconName: iconName,
    });
  };

  getQRCode = () => {
    this.props.navigation.navigate("QRCode", {
      jsonQRCode:
        '{ "displayName": "' +
        this.state.fullname +
        '", "displayCampus": "' +
        this.state.campus +
        '", "phone": "' +
        this.state.phone +
        '", "email":"' +
        this.state.email +
        '", "password":"' +
        this.state.password +
        '", "mobileKey": "' +
        this.state.licensekey +
        '"}',
    });
    this.setState({
      fullname: "",
      campus: "",
      phone: "",
      email: "",
      password: "",
      checked: false,
    });
  };

  getLogin = () => {
    this.setState({ _loader: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword)
      .then(() => {
        this.setState({ _loader: false });
        this.props.navigation.dispatch(StackActions.replace("Home"));
      })
      .catch((error) => {
        this.setState({ _loader: false });
        this.setState({
          showAlert: true,
          onMessage: error.message,
        });
      });
  };

  getForgot = () => {
    this.setState({ modalVisible: true });
  };

  closeForgot = () => {
    this.setState({
      modalVisible: false,
      _checkMail: "",
      userEmailForgot: "",
    });
  };

  sendPasswordReset = () => {
    if (this.state.userEmailForgot != "") {
      Axios.post(`https://gizi-apps.herokuapp.com/reset`, {
        usergetEmail: this.state.userEmailForgot,
      }).then((res) => {
        this.setState({
          _checkMail: `Reset Password has been send to ${res.data.data}`,
        });
      });
    } else {
      this.setState({
        _checkMail: "Email do not Empty!",
      });
    }
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  render() {
    return (
      <View style={styles.stretcher}>
        <AnimatedLoader
          visible={this.state._loader}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../loading.json")}
          animationStyle={{ height: 200, width: 200 }}
          speed={1}
        />

        <StatusBar hidden />

        <Animatable.View
          animation="slideInDown"
          iterationCount={1}
          direction="alternate"
          style={styles.groupHeader}
        >
          <ImageBackground
            source={require("../icon/header-apps.png")}
            resizeMode="cover"
            style={styles.imageSize}
          >
            <Animatable.Text
              animation="slideInLeft"
              iterationCount={1}
              direction="alternate"
              style={[styles.titleHeader, { fontFamily: "Montserrat-Bold" }]}
            >
              Alter{"\n"}Ilmu Gizi
            </Animatable.Text>
          </ImageBackground>
        </Animatable.View>
        <Animatable.View
          animation="slideInUp"
          iterationCount={1}
          direction="alternate"
          style={styles.tabs}
        >
          <View style={styles.tabsRows}>
            <TouchableOpacity
              style={styles.touchTabs}
              onPress={() => this.setState({ active: 0 })}
            >
              <Text
                style={{
                  fontSize: hp("2.8%"),
                  textAlign: "center",
                  fontFamily: "Montserrat-Bold",
                  color: this.state.active === 0 ? "#00854A" : "black",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchTabs}
              onPress={() => this.setState({ active: 1 })}
            >
              <Text
                style={{
                  fontSize: hp("2.8%"),
                  textAlign: "center",
                  fontFamily: "Montserrat-Bold",
                  color: this.state.active === 1 ? "#00854A" : "black",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {this.state.active === 0 ? (
            <FormRegister
              FontAwesome={this.state.iconName}
              securePassword={this.state.secureTextEntry}
              onPressPassword={this.onShowPassword}
              checked={this.state.checked}
              onPressCheked={() =>
                this.setState({ checked: !this.state.checked })
              }
              onPressGetQR={() => {
                if (this.state.password.length < 6) {
                  this.setState({
                    onMessage: "Password to Short",
                    showAlert: true,
                  });
                } else {
                  if (this.state.checked === true) {
                    this.getQRCode();
                  } else {
                    this.setState({
                      onMessage:
                        "Please Agree to the Terms and Conditions PT SAHABAT ALTER INDONESIA",
                      showAlert: true,
                    });
                  }
                }
              }}
              //Props Input Text
              onChangeFullname={(text) => this.setState({ fullname: text })}
              valueFullname={this.state.fullname}
              onChangeCampus={(text) => this.setState({ campus: text })}
              valueCampus={this.state.campus}
              onChangeEmail={(text) => this.setState({ email: text })}
              valueEmail={this.state.email}
              onChangePhone={(text) => this.setState({ phone: text })}
              valuePhone={this.state.phone}
              onChangePassword={(text) => this.setState({ password: text })}
              valuePassword={this.state.password}
              //font
              fontFamily={"Montserrat-Light"}
              fontFamilyButton={"Montserrat-Bold"}
              checkedFamily={"Montserrat-Medium"}
            />
          ) : (
            <LoginFeature
              onChangeEmailUser={(text) => this.setState({ userEmail: text })}
              valueEmailUser={this.state.userEmail}
              onChangePasswordUser={(text) =>
                this.setState({ userPassword: text })
              }
              valuePasswordUser={this.state.userPassword}
              FontAwesome={this.state.iconName}
              securePassword={this.state.secureTextEntry}
              onPressPassword={this.onShowPassword}
              onPressLogin={this.getLogin}
              onPressForgot={this.getForgot}
              //font
              fontFamily={"Montserrat-Light"}
              fontFamilyButton={"Montserrat-Bold"}
            />
          )}
        </Animatable.View>

        <AlertCustom
          showAwesome={this.state.showAlert}
          messageAlert={this.state.onMessage}
          onConPressed={() => {
            this.hideAlert();
          }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <BlurView
            intensity={300}
            style={[
              StyleSheet.absoluteFill,
              styles.nonBlurredContent,
              { justifyContent: "center" },
            ]}
          >
            <View
              style={{
                marginVertical: hp("5%"),
                marginHorizontal: wp("1.5%"),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: hp("2.5%"),
                  fontFamily: "Montserrat-Bold",
                }}
              >
                Forgot Password?
              </Text>

              <View style={styles.textInputBorder}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Email Adress"
                  keyboardType="email-address"
                  returnKeyType="done"
                  onChangeText={(text) =>
                    this.setState({ userEmailForgot: text })
                  }
                  value={this.state.userEmailForgot}
                />
              </View>

              <Text
                style={{
                  margin: hp("1.5%"),
                  color: "red",
                  textAlign: "center",
                }}
              >
                {this.state._checkMail}
              </Text>

              <Button
                title="Send Reset Password"
                buttonStyle={{ backgroundColor: "#00854A" }}
                titleStyle={{
                  color: "white",
                  fontSize: hp("2%"),
                  fontFamily: "Montserrat-Regular",
                }}
                onPress={() => this.sendPasswordReset()}
                containerStyle={{
                  borderRadius: hp("50%"),
                  alignSelf: "center",
                }}
              />

              <Button
                title="Close"
                buttonStyle={{ backgroundColor: "#00854A" }}
                titleStyle={{
                  color: "white",
                  fontSize: hp("2%"),
                  fontFamily: "Montserrat-Regular",
                }}
                onPress={() => this.closeForgot()}
                containerStyle={{
                  borderRadius: hp("50%"),
                  width: wp("40%"),
                  alignSelf: "center",
                  marginTop: hp("2%"),
                }}
              />
            </View>
          </BlurView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stretcher: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  groupHeader: {
    height: 350,
  },
  imageSize: {
    flex: 1,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    overflow: "hidden",
    borderColor: "transparent",
  },
  titleHeader: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp("5%"),
    marginTop: 36,
    marginLeft: 36,
  },

  //===========TAB===========
  tabs: {
    flex: 1,
    marginTop: 10,
    marginStart: 30,
    marginEnd: 30,
  },
  tabsRows: {
    flexDirection: "row",
  },
  touchTabs: {
    flex: 1,
  },
  //===========END===========

  //===========TEXT INPUT===========
  textInputBorder: {
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
    margin: 10,
    width: wp("80%"),
  },
  inputText: {
    textAlign: "center",
    fontSize: hp("2%"),
    marginTop: 3,
    marginBottom: 3,
    height: hp("3%"),
  },
  //===========END===========
});
