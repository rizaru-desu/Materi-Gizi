import React, { Component } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import MaskedView from "@react-native-community/masked-view";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";

//LOADING
import AnimatedLoader from "react-native-animated-loader";

//React Elemets
import { Avatar } from "react-native-elements";

//API Firebase
import * as firebase from "firebase";

//API Responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//API TouchableScale
import TouchableScale from "react-native-touchable-scale";

//API Axios
import axios from "axios";

export default class sop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //Profile
      displayName: null,
      displayCampus: null,
      displayUID: null,
      displayPhone: null,
      displayProfile: null,

      _loader: false,

      DATA: [],
    };
  }

  async componentDidMount() {
    let user = firebase.auth().currentUser;

    // Access the postId and otherParam via Destructuring assignment
    const { idcampus } = this.props.route.params;

    this._getMateri();

    if (user != null) {
      this.setState({
        displayName: user.displayName,
        displayCampus: idcampus,
        displayUID: user.uid,
        displayPhone: user.phoneNumber,
        displayProfile: user.photoURL,
      });
    }
  }

  _getMateri = () => {
    this.setState({ _loader: true });
    axios
      .post(`https://gizi-apps.herokuapp.com/API-MKEP`, {
        nameJSON: "sop.json",
      })
      .then((res) => {
        this.setState({ DATA: res.data, _loader: false });
      });
  };

  render() {
    // Access the postId and otherParam via Destructuring assignment

    const Item = ({ title, images, path }) => (
      <TouchableScale
        onPress={() =>
          this.props.navigation.navigate("MediaPlayer", {
            title: title,
            urlVideo: path,
          })
        }
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 25,
            margin: 10,
            flexDirection: "row",
          }}
        >
          <Avatar
            margin={5}
            size={hp("15%")}
            rounded
            source={{
              uri: images,
            }}
          />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: hp("2.3%"),
                color: "#0DB14B",
                fontFamily: "Montserrat-Bold",
              }}
            >
              {title}
            </Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={hp("5.5%")}
              color="#0DB14B"
            />
          </View>
        </View>
      </TouchableScale>
    );

    const renderItem = ({ item }) => (
      <Item title={item.title} images={item.images} path={item.path} />
    );

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
            <MaskedView
              style={styles.maskProfile}
              maskElement={
                <MaterialCommunityIcons
                  style={{ alignSelf: "center", justifyContent: "center" }}
                  name="hexagon"
                  size={hp("15%")}
                  color="#0DB14B"
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

        <View
          style={{ flex: 1, backgroundColor: "#EEEEEE", paddingVertical: 10 }}
        >
          <Text
            style={{
              fontSize: hp("4.5%"),
              color: "#0DB14B",
              textAlign: "center",
              marginBottom: 10,
              fontFamily: "Montserrat-Bold",
            }}
          >
            Video Tutorial
          </Text>
          <FlatList
            style={{ padding: 5 }}
            data={this.state.DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={styles.bgBack}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={hp("5%")}
            color="#0DB14B"
          />
          <Text
            style={{
              fontSize: hp("2%"),
              fontFamily: "Montserrat-Bold",
              color: "#0DB14B",
            }}
          >
            Back to Menu
          </Text>
        </TouchableOpacity>
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
  //===========BG BACK===========
  bgBack: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hp("4%"),
    backgroundColor: "#eeeeee",
  },
  //===========END===========
});
