import React, { Component } from "react";
import { Text, StyleSheet, View, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import QR from "react-native-qrcode-svg";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default class QRCode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Access the postId and otherParam via Destructuring assignment
    const { jsonQRCode } = this.props.route.params;

    return (
      <View style={styles.stretcher}>
        <StatusBar hidden />
        <LinearGradient
          colors={["#1B9D35", "#94E955", "#2DB34A"]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animatable.View
            animation="fadeInDownBig"
            iterationCount={1}
            duration={3000}
            direction="alternate"
            style={{ flexDirection: "column", marginBottom: 30 }}
          >
            <Text style={[styles.titleText, { fontFamily: "Montserrat-Bold" }]}>
              Please Screenshoot!
            </Text>
            <Text
              style={[
                styles.subTitleText,
                { fontFamily: "Montserrat-Regular" },
              ]}
            >
              Please screenshoot your QR-Code first before you send to Admin via
              WhatsApp.
            </Text>
          </Animatable.View>

          <Animatable.View
            animation="fadeIn"
            iterationCount={1}
            duration={3000}
            direction="alternate"
            style={styles.qrCodeContainer}
          >
            <QR
              value={jsonQRCode}
              size={300}
              logo={require("../icon/logos.png")}
              logoSize={80}
            />
          </Animatable.View>

          <Animatable.View
            animation="fadeInUpBig"
            iterationCount={1}
            duration={3000}
            direction="alternate"
            style={{ marginTop: 30 }}
          >
            <Button
              buttonStyle={{ backgroundColor: "white" }}
              titleStyle={{
                color: "#00854A",
                marginHorizontal: 5,
                fontSize: hp("2%"),
                fontFamily: "Montserrat-Bold",
              }}
              containerStyle={{ borderRadius: 30, marginVertical: 10 }}
              icon={
                <FontAwesome
                  name="whatsapp"
                  size={35}
                  color="#00854A"
                  style={{ marginHorizontal: 5 }}
                />
              }
              title="Send with WhatApp"
              onPress={() =>
                Linking.openURL(
                  "http://api.whatsapp.com/send?phone=6281316002075"
                )
              }
            />
          </Animatable.View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //===========CONTAINER===========
  stretcher: {
    flex: 1,
  },

  //===========CONTAINER===========
  titleText: {
    fontSize: 40,
    marginHorizontal: 30,
    marginVertical: 10,
    textAlign: "center",
    color: "white",
  },
  subTitleText: {
    fontSize: 18,
    marginHorizontal: 30,
    marginVertical: 10,
    textAlign: "center",
    color: "white",
  },

  //===========CONTAINER===========
  qrCodeContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    padding: 10,
  },
});
