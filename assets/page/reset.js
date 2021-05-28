import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

//BUTTON REACT ELEMENT
import { Button } from "react-native-elements";

//ICON VECTOR
import { FontAwesome } from "@expo/vector-icons";

//RESPONSIVE
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//LINEAR GRADIENT
import { LinearGradient } from "expo-linear-gradient";

//IMPORT JS
import AlertCustom from "../src/alertCustom";

//API Firebase
import * as firebase from "firebase";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      retypePassword: "",

      //show Alert
      showAlert: false,
      onMessage: null,

      //Loading
      _loader: false,

      //Check Visible Password
      secureTextEntry: true,
      iconName: "eye",
    };
  }

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  _changePassword = () => {
    if (this.state.newPassword.length < 6) {
      this.setState({
        showAlert: true,
        onMessage: "Password to Short",
      });
    } else {
      if (this.state.newPassword != this.state.retypePassword) {
        this.setState({
          showAlert: true,
          onMessage: "Password not Match\nplease Re-type Password",
        });
      } else {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(this.state.newPassword)
          .then(function () {
            //Update successful.
            alert("Password Changed!");
          })
          .catch(function (error) {
            //An error happened.
            alert(error);
          });
      }
    }
  };

  onShowPassword = () => {
    let iconName = this.state.secureTextEntry ? "eye-slash" : "eye";
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      iconName: iconName,
    });
  };

  render() {
    return (
      <View style={styles.stretcher}>
        <StatusBar hidden />
        <LinearGradient
          colors={["#1B9D35", "#94E955", "#2DB34A"]}
          style={styles.linearGradient}
        >
          <Text style={styles.titleReset}>Reset Your Password</Text>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.titleTextInput}>New Password</Text>
            <View style={styles.textInputBorder}>
              <View style={styles.rowPassword}>
                <TextInput
                  style={styles.inputPassword}
                  keyboardType="default"
                  returnKeyType="done"
                  secureTextEntry={this.state.secureTextEntry}
                  onChangeText={(text) => {
                    this.setState({ newPassword: text });
                  }}
                  value={this.state.newPassword}
                />
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                  onPress={this.onShowPassword}
                >
                  <FontAwesome
                    name={this.state.iconName}
                    size={hp("2.5%")}
                    color="#0DB14B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.titleTextInput}>Re-type New Password</Text>
            <View style={styles.textInputBorder}>
              <View style={styles.rowPassword}>
                <TextInput
                  style={styles.inputPassword}
                  keyboardType="default"
                  returnKeyType="done"
                  secureTextEntry={this.state.secureTextEntry}
                  onChangeText={(text) => {
                    this.setState({ retypePassword: text });
                  }}
                  value={this.state.retypePassword}
                />
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                  onPress={this.onShowPassword}
                >
                  <FontAwesome
                    name={this.state.iconName}
                    size={hp("2.5%")}
                    color="#0DB14B"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Button
              title="Confirmation"
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
              disabled={this.state.newPassword.length < 6 ? true : false}
              onPress={() => this._changePassword()}
            />
          </View>

          <AlertCustom
            showAwesome={this.state.showAlert}
            messageAlert={this.state.onMessage}
            onConPressed={() => {
              this.hideAlert();
            }}
          />
        </LinearGradient>
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

  //===========TEXT INPUT===========
  textInputBorder: {
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
    margin: 10,
    width: wp("80%"),
  },
  rowPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputPassword: {
    flex: 1,
    textAlign: "center",
    fontSize: hp("2%"),
    marginTop: 3,
    marginBottom: 3,
    fontFamily: "Montserrat-Light",
  },
  //=========== END ===========

  //=========== LINEAR GRADIENT ===========
  linearGradient: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  //=========== END ===========

  //=========== TITLE RESET ===========
  titleReset: {
    fontSize: hp("3%"),
    color: "white",
    fontFamily: "Montserrat-Bold",
  },

  //=========== TITLE TEXT INPUT ===========
  titleTextInput: {
    fontSize: hp("2%"),
    color: "white",
    fontFamily: "Montserrat-Bold",
    marginHorizontal: 10,
  },
  //=========== END ===========
});
