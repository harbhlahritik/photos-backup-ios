import React from "react";
import { StyleSheet, View } from "react-native";
import CustomRegularText from "./components/CustomRegularText";
import FullSizeButton from "./components/FullSizeButton";
import StyledText from "./components/StyledText";

export default function OpeningScreen() {
  // StatusBar.setNetworkActivityIndicatorVisible(true);

  return (
    <>
      <View style={{ ...styles.background, flex: 3 }}>
        <StyledText size={40}>Photos Backup</StyledText>
        <CustomRegularText style={{ marginTop: 40 }}>Allowing you to self host your own Photos Backup server and sync your Gallery !</CustomRegularText>
      </View>
      <View style={{ ...styles.background, flexGrow: 0 }}>
        <FullSizeButton style={{ marginBottom: 20 }}>Next</FullSizeButton>
        <StyledText size={10}>Copyright Haskers Inc.</StyledText>
      </View>
    </>
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
    justifyContent: "center",
    // flexGrow: 0,
    // backgroundColor: "red"
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
