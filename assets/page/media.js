import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import WebView from "react-native-webview";

export default class MediaVideo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Access the postId and otherParam via Destructuring assignment
    const { urlVideo } = this.props.route.params;

    return (
      <View style={styles.stretcher}>
        <StatusBar hidden />

        <WebView
          source={{
            html:
              '<html> <head> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> </head> <body> <div class="container-fluid"> <div class="row h-100"> <div class="col-sm-12 align-self-center"> <div class="embed-responsive embed-responsive-16by9"> <iframe class="embed-responsive-item" src="' +
              urlVideo +
              '" allowfullscreen></iframe> </div> </div> </div> </div> <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script> </body> </html>',
          }}
          javaScriptEnabled={true}
          allowsFullscreenVideo={true}
        />
        {/*<Video
          source={{
            uri: "https://www.mp4upload.com/lq036hx6aje2/Tips-1-1.mp4",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          isLooping
          useNativeControls={true}
          style={{ flex: 1 }}
        />*/}
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
});
