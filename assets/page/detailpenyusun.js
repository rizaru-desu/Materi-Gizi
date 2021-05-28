import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import HTML from "react-native-render-html";
import { Avatar } from "react-native-elements";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class PenyusunDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Access the postId and otherParam via Destructuring assignment
    const { name, profileImage, desc } = this.props.route.params;

    return (
      <View
        animation="slideInDown"
        iterationCount={1}
        duration={3000}
        direction="alternate"
        style={styles.stretcher}
      >
        <StatusBar hidden />
        <View
          style={{
            backgroundColor: "white",
            height: hp("30%"),
            alignItems: "center",
          }}
        >
          <Avatar
            containerStyle={{
              position: "relative",
              top: hp("13%"),
              borderColor: "white",
              borderWidth: hp("1%"),
            }}
            margin={5}
            size={hp("30%")}
            rounded
            source={{
              uri: profileImage,
            }}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: "#0DB14B", zIndex: -1 }}>
          <View style={{ flexDirection: "row", height: hp("18%"), zIndex: -1 }}>
            <View style={{ flex: 1, backgroundColor: "#0DB14B" }}></View>
            <View style={{ backgroundColor: "white", width: wp("1%") }}></View>
            <View style={{ flex: 1, backgroundColor: "#0DB14B" }}></View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              width: wp("90%"),
              height: hp("40%"),
              borderRadius: 20,
              alignSelf: "center",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontSize: hp("2.5%"),
                fontFamily: "Montserrat-Bold",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {name}
            </Text>
            <HTML
              containerStyle={{
                flex: 1,
                paddingHorizontal: wp("1%"),
                marginVertical: 10,
              }}
              source={{ html: desc }}
              contentWidth={wp("70%")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //===========CONTAINER===========
  stretcher: {
    flex: 1,
  },
});
