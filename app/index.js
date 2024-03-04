import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import CustomRegularText from "../src/components/CustomRegularText";
import FullSizeButton from "../src/components/FullSizeButton";
import StyledText from "../src/components/StyledText";
import * as MediaLibrary from "expo-media-library";
import { Link, Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function index() {
  // StatusBar.setNetworkActivityIndicatorVisible(true);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [route, setRoute] = useState(null);

  getPermissionAndNext = () => {
    requestPermission();
    router.push("/server_config");
  };

  useEffect(() => {
    async function getRoute() {
      let first_asset = await AsyncStorage.getItem("first_asset");
      let server_ip = await AsyncStorage.getItem("server_ip");
      let server_port = await AsyncStorage.getItem("server_port");
      if(!server_ip || !server_port) {
        // setRoute('/server_config');
      } else if (!first_asset) {
        setRoute("/select_first_asset");
      } else {
        setRoute("/gallery");
      }
    }
    getRoute();
  }, []);

  return (
    <>
      {route ? (
        <Redirect href={route} />
      ) : (
        <>
          <View style={{ ...styles.background, flex: 3 }}>
            <StyledText size={40}>Photos Backup</StyledText>
            <CustomRegularText style={{ marginTop: 40 }}>Allowing you to self host your own Photos Backup server and sync your Gallery !</CustomRegularText>
          </View>
          <View style={{ ...styles.background }}>
            <FullSizeButton onPress={getPermissionAndNext} style={{ marginBottom: 20 }}>
              Next
            </FullSizeButton>
            <StyledText size={10}>Copyright Haskers Inc.</StyledText>
          </View>
        </>
      )}
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
