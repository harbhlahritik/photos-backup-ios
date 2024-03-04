import React, { useState } from 'react'
import CustomTextInput from '../src/components/CustomTextInput'
import { KeyboardAvoidingView, View, Keyboard, Alert } from 'react-native'
import FullSizeButton from '../src/components/FullSizeButton';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function server_config() {

  const [value, setValue] = useState("");
  const [port, setPort] = useState("");
  const [error, setError] = useState({ value: false, port: false });
  const [loading, setLoading] = useState(false);

  navigateToGallery = async () => {
    try {
      setLoading(true);
      if(!value || !port) {
        setError({ value: !value, port: !port });
        setLoading(false);
        return;
      }
      let { data } = await axios.get(`http://${value}:${port}/health`, {
        timeout: 5000
      });
      console.log("data -> ", data);
      if(data.status === "healthy") {
        AsyncStorage.setItem("server_ip", value);
        AsyncStorage.setItem("server_port", port);
        router.push('/select_first_asset');
      } else {
        setError("There was a problem connecting with the server, please ensure that the server is up and running and reachable");
        Alert.alert('Server Unreachable', 'There was a problem connecting with the server, please ensure that the server is up and running and reachable', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError("There was a problem connecting with the server, please ensure that the server is up and running and reachable");
      Alert.alert('Server Unreachable', 'There was a problem connecting with the server, please ensure that the server is up and running and reachable', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      setLoading(false);
    }
  }

  return (
    <>
      <KeyboardAvoidingView onPress={Keyboard.dismiss} style={{ width: "100%", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        <CustomTextInput onChangeText={setValue} value={value} placeholder="Server Address" keyboardType="numeric" error={error.value} />
        <CustomTextInput onChangeText={setPort} value={port} placeholder="Server Port" keyboardType="" error={error.port} />
      </View>
      <View style={{ width: "100%", alignItems: "center" }} >
        <FullSizeButton disabled={loading} onPress={!loading ? navigateToGallery : () => console.log("A network request is in progress")}>{loading ? "Trying to reach Server..." : "Test Connection"}</FullSizeButton>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
