import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import CustomRegularText from "./src/components/CustomRegularText";
import OpeningScreen from "./src/OpeningScreen";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Formula1-Regular": require("./assets/fonts/Formula1-Regular.ttf"),
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient colors={["#000000", "#121212"]} style={styles.gradient}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.gradient}>
        <OpeningScreen />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    fontFamily: "Formula1-Regular",
  },
  gradient: {
    width: "100%",
    height: "100%",
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  background: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: "96%",
    height: 64,
    color: "#fff",
    backgroundColor: "#212121",
    padding: 16,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#5E5CE6",
  },
});
