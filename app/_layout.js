import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Slot, router, useRootNavigationState } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function _layout() {
  const [fontsLoaded, fontError] = useFonts({
    "Formula1-Regular": require("../assets/fonts/Formula1-Regular.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <LinearGradient colors={["#000000", "#212121"]} style={styles.gradient}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.gradient}>
        <Slot />
      </SafeAreaView>
    </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "100%",
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  }
});
