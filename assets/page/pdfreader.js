import * as React from "react";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";

//API Responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class pdfreader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Access the postId and otherParam via Destructuring assignment
    let { urlPDF } = this.props.route.params;

    console.log(urlPDF);
    return (
      <View style={styles.stretcher}>
        <WebView
          style={{ flex: 1 }}
          source={{
            uri:
              "https://drive.google.com/viewerng/viewer?embedded=true&url=" +
              urlPDF,
          }}
          bounces={false}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //===========CONTAINER===========
  stretcher: {
    flex: 1,
  },

  //===========HEADER ACCOUNT===========
  bgHeader: {
    backgroundColor: "#4992D1",
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

  //===========TITLE HEADER===========
  titleStyle: {
    fontSize: hp("4.5%"),
    color: "#4992D1",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Montserrat-Bold",
  },
  //===========END===========

  //===========SUB HEADER ACCOUNT===========
  bgContent: { flex: 1, backgroundColor: "#EEEEEE", paddingVertical: 10 },
  //===========END===========

  //===========HTML STYLES===========
  htmlStyles: {
    flex: 1,
    paddingHorizontal: wp("1%"),
    marginVertical: 10,
  },
  //===========END===========

  //===========SCROLL HTML===========
  scrollHTML: {
    paddingHorizontal: wp("2%"),
    marginVertical: hp("1%"),
    height: hp("85%"),
  },
  //===========END===========

  //===========MODAL STYLE===========
  modalStyle: {
    flex: 1,
    borderRadius: hp("2%"),
    paddingHorizontal: wp("5.5%"),
    paddingVertical: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  //===========END===========

  //===========TITLE KAMUS===========
  titleKamus: {
    textAlign: "center",
    fontSize: hp("2.5%"),
    fontFamily: "Montserrat-Bold",
  },
  //===========END===========
  //===========BG SEARCH===========
  bgSearch: {
    backgroundColor: "white",
    marginHorizontal: wp("10%"),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: hp("50%"),
  },
  //===========END===========
  //===========BG BACK===========
  bgBack: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hp("4%"),
    backgroundColor: "#eeeeee",
  },
  //===========END===========
  //===========TITLE FLATLIST===========
  titleFlatlist: {
    fontSize: hp("1%"),
    color: "#4992D1",
    fontFamily: "Montserrat-Bold",
    marginHorizontal: 10,
  },

  titleYear: {
    fontSize: hp("1%"),
    color: "#4992D1",
    fontFamily: "Montserrat-Bold",
    marginHorizontal: 10,
  },
  //===========END===========
  //===========BG FLATLIST===========
  bgFlatlist: {
    backgroundColor: "white",
    borderRadius: 25,
    margin: 5,
    padding: 10,
    flexDirection: "row",
  },
});
