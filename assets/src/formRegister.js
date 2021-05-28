import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CheckBox, Button } from "react-native-elements";
import { TextInputMask } from "react-native-masked-text";
import * as Animatable from "react-native-animatable";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const RegisterFeature = (props) => {
  return (
    <View style={styles.containerTabs}>
      <View style={styles.containerTriangle}>
        <View style={styles.triangle} />
        <View />
      </View>
      <View style={styles.border}>
        <Animatable.View
          animation="slideInLeft"
          duration={800}
          iterationCount={1}
          direction="alternate"
          style={styles.textInputBorder}
        >
          <TextInput
            style={[styles.inputText, { fontFamily: props.fontFamily }]}
            placeholder="Full Name"
            keyboardType="default"
            returnKeyType="done"
            onChangeText={props.onChangeFullname}
            value={props.valueFullname}
          />
        </Animatable.View>
        <Animatable.View
          animation="slideInLeft"
          duration={700}
          iterationCount={1}
          direction="alternate"
          style={styles.textInputBorder}
        >
          <TextInput
            style={[styles.inputText, { fontFamily: props.fontFamily }]}
            placeholder="Campus"
            keyboardType="default"
            returnKeyType="done"
            onChangeText={props.onChangeCampus}
            value={props.valueCampus}
          />
        </Animatable.View>
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
            onChangeText={props.onChangeEmail}
            value={props.valueEmail}
          />
        </Animatable.View>
        <Animatable.View
          animation="slideInLeft"
          duration={600}
          iterationCount={1}
          direction="alternate"
          style={styles.textInputBorder}
        >
          <TextInputMask
            type={"cel-phone"}
            options={{
              dddMask: "+629999999999999",
            }}
            returnKeyType="done"
            placeholder="Phone Number"
            style={[styles.inputText, { fontFamily: props.fontFamily }]}
            onChangeText={props.onChangePhone}
            value={props.valuePhone}
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
              onChangeText={props.onChangePassword}
              value={props.valuePassword}
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
          animation="slideInUp"
          iterationCount={1}
          direction="alternate"
        >
          <Button
            title="GET QR-CODE"
            buttonStyle={{ backgroundColor: "#00854A" }}
            titleStyle={{
              color: "white",
              fontSize: hp("2%"),
              fontFamily: props.fontFamilyButton,
            }}
            containerStyle={{
              borderRadius: hp("50%"),
              position: "relative",
              top: 20,
              width: wp("40%"),
              alignSelf: "center",
            }}
            onPress={props.onPressGetQR}
          />
        </Animatable.View>
      </View>
      <Animatable.View
        animation="slideInUp"
        iterationCount={1}
        direction="alternate"
      >
        <CheckBox
          containerStyle={{
            backgroundColor: "transparent",
            borderWidth: 0,
            marginVertical: hp("2%"),
          }}
          textStyle={{ fontSize: hp("1.7%"), fontFamily: props.checkedFamily }}
          size={hp("2.5%")}
          title="I have read and agree to the terms of PT Sahabat Alter Indonesia"
          checked={props.checked}
          onPress={props.onPressCheked}
          checkedColor="red"
        />
      </Animatable.View>
    </View>
  );
};

export default RegisterFeature;

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
});
