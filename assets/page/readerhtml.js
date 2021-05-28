import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { WebView } from "react-native-webview";

//API Responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class ReaderHtml extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Access the postId and otherParam via Destructuring assignment
    const { urlMateri } = this.props.route.params;

    return (
      <View style={styles.stretcher}>
        <StatusBar hidden />
        <WebView
          style={{ flex: 1 }}
          source={{ uri: urlMateri }}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //===========CONTAINER===========
  stretcher: {
    flex: 1,
    backgroundColor: "#4992D1",
  },

  //===========BG BACK===========
  bgBack: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hp("4%"),
    backgroundColor: "#eeeeee",
  },
  //===========END===========
});
