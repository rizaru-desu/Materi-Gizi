import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoginFeature = (props) => {
  return (
    <View style={styles.containerTabs}>
      <View style={styles.containerTriangle}>
        <View />
        <View style={styles.triangle} />
      </View>
      <View style={styles.border}>
        <Animatable.View
          animation="slideInLeft"
          duration={500}
          iterationCount={1}
          direction="alternate"
          style={styles.textInputBorder}
        >
          <TextInput
            style={[styles.inputText, { fontFamily: props.fontFamily }]}
            placeholder="Email Adress"
            keyboardType="email-address"
            returnKeyType="done"
            onChangeText={props.onChangeEmailUser}
            value={props.valueEmailUser}
          />
        </Animatable.View>
        <Animatable.View
          animation="slideInLeft"
          duration={300}
          iterationCount={1}
          direction="alternate"
          style={styles.textInputBorder}
        >
          <View style={styles.rowPassword}>
            <TextInput
              style={[styles.inputPassword, { fontFamily: props.fontFamily }]}
              placeholder="Password"
              keyboardType="default"
              returnKeyType="done"
              secureTextEntry={props.securePassword}
              onChangeText={props.onChangePasswordUser}
              value={props.valuePasswordUser}
            />
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
              onPress={props.onPressPassword}
            >
              <FontAwesome
                name={props.FontAwesome}
                size={hp("2.5%")}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <Animatable.View
          animation="fadeIn"
          iterationCount={1}
          direction="alternate"
        >
          <TouchableOpacity onPress={props.onPressForgot}>
            <Text style={[styles.textForgot, { fontFamily: props.fontFamily }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          animation="slideInUp"
          iterationCount={1}
          direction="alternate"
        >
          <Button
            title="SIGN IN"
            buttonStyle={{ backgroundColor: "#00854A" }}
            titleStyle={{
              color: "white",
              fontSize: hp("2%"),
              fontFamily: props.fontFamilyButton,
            }}
            onPress={props.onPressLogin}
            containerStyle={{
              borderRadius: hp("50%"),
              position: "relative",
              top: 20,
              width: wp("40%"),
              alignSelf: "center",
            }}
          />
        </Animatable.View>
      </View>
    </View>
  );
};

export default LoginFeature;

const styles = StyleSheet.create({
  //===========BORDER PANEL REGISTER DAN LOGIN===========
  border: {
    borderRadius: 10,
    backgroundColor: "white",
    position: "relative",
    top: -3,
  },
  containerTabs: {
    flexDirection: "column",
    marginTop: 10,
  },
  containerTriangle: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
  },
  //===========END===========

  //===========TEXT INPUT===========
  textInputBorder: {
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
    margin: hp("0.7%"),
  },
  inputText: {
    textAlign: "center",
    fontSize: hp("2%"),
    marginTop: 3,
    marginBottom: 3,
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
  },
  //===========END===========

  //===========Text Forgot===========
  textForgot: {
    fontSize: hp("2%"),
    textAlign: "center",
    color: "#465FB1",
    marginTop: 5,
    marginBottom: 5,
    textDecorationLine: "underline",
  },
});
