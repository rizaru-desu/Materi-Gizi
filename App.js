import React from "react";
import { InteractionManager, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import Login from "./assets/page/login";
import QRCode from "./assets/page/qrcode";
import Home from "./assets/page/home";
import MateriKep from "./assets/page/materi";
import PenyusunUkep from "./assets/page/penyusun";
import PenyusunDetail from "./assets/page/detailpenyusun";
import KamusKes from "./assets/page/kamus";
import MediaVideo from "./assets/page/media";
import ProfileUser from "./assets/page/profile";
import ResetPassword from "./assets/page/reset";
import SplashScreen from "./assets/page/splashscreen";
import Jurnal from "./assets/page/jurnal";
import pdfreader from "./assets/page/pdfreader";

//API Firebase
import * as firebase from "firebase";
import { firebaseConfig } from "./assets/Api/ApiFirebase";
import ReaderHtml from "./assets/page/readerhtml";
import obat from "./assets/page/obat";
import sop from "./assets/page/sop";
import tips from "./assets/page/tips";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

//SETTING A TIMER FOR A LONG PERIOD OF TIME
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = "_lt_" + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = (id) => {
    if (typeof id === "string" && id.startWith("_lt_")) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

function App() {
  let [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          {/* Navigator for Panel*/}
          <Stack.Screen
            name="Panel"
            component={Login}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="QRCode"
            component={QRCode}
            options={{
              headerShown: true,
              title: null,
              headerTransparent: true,
              headerTintColor: "#fff",
              gestureEnabled: false,
            }}
          />

          {/* Navigator for Home*/}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name="MateriKeperawatan"
            component={MateriKep}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name="ReaderHtml"
            component={ReaderHtml}
            options={{
              headerShown: true,
              headerBackTitle: "Materi",
              headerTintColor: "#0DB14B",
              title: null,
              gestureEnabled: false,
            }}
          />

          {/* Navigator for Tim Penyusun */}
          <Stack.Screen
            name="PenyusunKeperawatan"
            component={PenyusunUkep}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="DetailPenyusun"
            component={PenyusunDetail}
            options={{
              headerShown: true,
              title: null,
              headerTransparent: true,
              headerTintColor: "#0DB14B",
              gestureEnabled: false,
            }}
          />

          {/* Navigator for Kamus Kesehatan */}
          <Stack.Screen
            name="KamusKesehatan"
            component={KamusKes}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          {/* Navigator for Obat */}
          <Stack.Screen
            name="ObatKeperawatan"
            component={obat}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          {/* Navigator for Jurnal */}
          <Stack.Screen
            name="JurnalKeperawatan"
            component={Jurnal}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name="pdfReader"
            component={pdfreader}
            options={{
              headerShown: true,
              headerBackTitle: "Jurnal",
              headerTintColor: "#0DB14B",
              title: null,
              gestureEnabled: false,
            }}
          />

          {/* Navigator for Playlist */}
          <Stack.Screen
            name="SOP"
            component={sop}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Tips"
            component={tips}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          {/* Navigator for MediaPlayer */}
          <Stack.Screen
            name="MediaPlayer"
            component={MediaVideo}
            options={{
              headerShown: true,
              title: null,
              headerTransparent: true,
              headerTintColor: "#0DB14B",
              gestureEnabled: false,
            }}
          />

          {/* Navigator for Profile */}
          <Stack.Screen
            name="ProfileUser"
            component={ProfileUser}
            options={{
              headerShown: true,
              title: null,
              headerTransparent: true,
              headerTintColor: "#0DB14B",
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="ResetUser"
            component={ResetPassword}
            options={{
              headerShown: true,
              title: null,
              headerTransparent: true,
              headerTintColor: "white",
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
